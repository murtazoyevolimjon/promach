import { NextResponse } from "next/server";

/**
 * POST /api/lead — forma so'rovini qabul qiladi va:
 *   1) Telegram botga yuboradi   (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID bo'lsa)
 *   2) Supabase "leads" jadvaliga yozadi (SUPABASE_URL + SUPABASE_SECRET_KEY bo'lsa)
 * Ikkalasi ham ixtiyoriy va bir-biridan mustaqil: bittasi ishlamay qolsa ham so'rov yo'qolmaydi.
 * Hech biri sozlanmagan bo'lsa — DEMO rejim (so'rov server logiga yoziladi).
 *
 * XAVFSIZLIK:
 *  - Barcha kalitlar faqat serverda (NEXT_PUBLIC_ prefiksisiz) — brauzerga hech qachon chiqmaydi.
 *  - Supabase jadvalida RLS yoqilgan va ochiq (anon) ruxsat yo'q — yozish faqat shu server orqali.
 *  - Boshqa saytlardan yuborilgan so'rovlar (Origin tekshiruvi) va spam-botlar (honeypot) rad etiladi.
 *  - Barcha maydonlar uzunligi cheklanadi, Telegram uchun HTML ekranlanadi.
 *
 * Telegram sozlash: README.md → "Telegram bot". Supabase sozlash: README.md → "Supabase".
 */

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

type Lead = { name: string; phone: string; product: string; comment: string; lang: "uz" | "ru"; page: string };

/** So'rov o'z saytimizdan kelganini tekshirish (boshqa domendan forma yuborishni bloklaydi) */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // ba'zi brauzerlar/so'rovlar Origin yubormaydi — bunday holatda o'tkazamiz
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function sendTelegram(lead: Lead): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("not-configured");

  const text = [
    "🆕 <b>Yangi so'rov — PROMACH.uz</b>",
    "",
    `👤 <b>Ism:</b> ${esc(lead.name)}`,
    `📞 <b>Telefon:</b> ${esc(lead.phone)}`,
    lead.product && `🔧 <b>Jihoz:</b> ${esc(lead.product)}`,
    lead.comment && `💬 <b>Izoh:</b> ${esc(lead.comment)}`,
    `🌐 <b>Til:</b> ${lead.lang.toUpperCase()}`,
    lead.page && `🔗 ${esc(lead.page)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    // Javob matnida token bo'lmaydi, lekin baribir faqat status va qisqa tavsifni loglaymiz
    console.error("[lead] Telegram xatosi:", res.status, (await res.text()).slice(0, 200));
    return false;
  }
  return true;
}

/**
 * Supabase REST (PostgREST) orqali yozish — qo'shimcha kutubxona kerak emas.
 * SUPABASE_SECRET_KEY: yangi "sb_secret_..." kaliti yoki eski "service_role" (JWT) kaliti.
 */
async function saveToSupabase(lead: Lead): Promise<boolean> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("not-configured");

  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
  // Eski JWT kalitlar Authorization sarlavhasini ham talab qiladi; yangi sb_secret_ kalitlar — faqat apikey.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    console.error("[lead] Supabase xatosi:", res.status, (await res.text()).slice(0, 200));
    return false;
  }
  return true;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot to'ldirilgan bo'lsa — bot. Jim-jit "muvaffaqiyat" qaytaramiz.
  if (clip(body.website, 200)) return NextResponse.json({ ok: true });

  const lead: Lead = {
    name: clip(body.name, 80),
    phone: clip(body.phone, 20),
    product: clip(body.product, 120),
    comment: clip(body.comment, 1000),
    lang: clip(body.lang, 2) === "ru" ? "ru" : "uz",
    page: clip(body.page, 300),
  };

  if (lead.name.length < 2 || lead.phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // Ikkala kanal parallel ishlaydi; sozlanmaganlari "not-configured" bilan o'tkazib yuboriladi
  const results = await Promise.allSettled([sendTelegram(lead), saveToSupabase(lead)]);
  const configured = results.filter((r) => !(r.status === "rejected" && (r.reason as Error)?.message === "not-configured"));
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  if (configured.length === 0) {
    console.log("[lead][DEMO] Telegram/Supabase sozlanmagan. So'rov:", JSON.stringify(lead));
    return NextResponse.json({ ok: true, demo: true });
  }

  for (const r of configured) {
    if (r.status === "rejected") console.error("[lead] Tarmoq xatosi:", (r.reason as Error)?.message);
  }

  return delivered ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false }, { status: 502 });
}
