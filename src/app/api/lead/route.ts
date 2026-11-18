import { NextResponse } from "next/server";

/**
 * POST /api/lead — forma so'rovini Telegram botga yuboradi.
 *
 * Sozlash:
 *  1) @BotFather -> /newbot -> token oling  => TELEGRAM_BOT_TOKEN
 *  2) Botni guruhga qo'shing (yoki botga /start yozing), so'ng
 *     https://api.telegram.org/bot<TOKEN>/getUpdates dan "chat":{"id": ...} ni oling => TELEGRAM_CHAT_ID
 *  3) Ikkala qiymatni .env.local yoki Vercel/Netlify Environment Variables ga yozing.
 *
 * Token server tomonda qoladi — brauzerga hech qachon chiqmaydi.
 * Token bo'lmasa: DEMO rejim (so'rov server logiga yoziladi, foydalanuvchiga muvaffaqiyat ko'rsatiladi).
 */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot to'ldirilgan bo'lsa — bot. Jim-jit "muvaffaqiyat" qaytaramiz.
  if (clip(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clip(body.name, 80);
  const phone = clip(body.phone, 20);
  const product = clip(body.product, 120);
  const comment = clip(body.comment, 1000);
  const lang = clip(body.lang, 2) === "ru" ? "RU" : "UZ";
  const page = clip(body.page, 300);

  if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const text = [
    "🆕 <b>Yangi so'rov — PROMACH.uz</b>",
    "",
    `👤 <b>Ism:</b> ${esc(name)}`,
    `📞 <b>Telefon:</b> ${esc(phone)}`,
    product && `🔧 <b>Jihoz:</b> ${esc(product)}`,
    comment && `💬 <b>Izoh:</b> ${esc(comment)}`,
    `🌐 <b>Til:</b> ${lang}`,
    page && `🔗 ${esc(page)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("[lead][DEMO] Telegram sozlanmagan. So'rov:\n" + text);
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (!tg.ok) {
      console.error("[lead] Telegram xatosi:", tg.status, await tg.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] Tarmoq xatosi:", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
