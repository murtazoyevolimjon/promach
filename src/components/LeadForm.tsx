"use client";

import { useEffect, useId, useRef, useState } from "react";
import { categories } from "@/data/products";
import type { Dict, Lang } from "@/i18n";
import { ASK_EVENT } from "./sections/Catalog";

type Status = "idle" | "sending" | "success" | "demo" | "error";

/**
 * So'rov formasi -> /api/lead -> Telegram bot.
 * Bot token kiritilmagan bo'lsa server DEMO javob qaytaradi.
 */
export default function LeadForm({ lang, t }: { lang: Lang; t: Dict["contact"]["form"] }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Katalogdagi "Narxni so'rash" tugmasidan kelgan jihoz nomini izohga yozish
  useEffect(() => {
    const onAsk = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (commentRef.current) commentRef.current.value = `${t.askPrefix} ${name}`;
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    };
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, [t.askPrefix]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();

    const errs: typeof errors = {};
    if (name.length < 2) errs.name = t.nameRequired;
    if (phone.replace(/\D/g, "").length < 9) errs.phone = t.phoneInvalid;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          product: fd.get("product"),
          comment: fd.get("comment"),
          website: fd.get("website"), // honeypot (spam botlar uchun)
          lang,
          page: window.location.href,
        }),
      });
      const data = (await res.json()) as { ok: boolean; demo?: boolean };
      if (!res.ok || !data.ok) throw new Error("failed");
      setStatus(data.demo ? "demo" : "success");
      form.reset();
      // Analitika maqsadi (GA4 / Yandex Metrika ulangan bo'lsa)
      const w = window as unknown as { gtag?: (...a: unknown[]) => void; ym?: (...a: unknown[]) => void };
      w.gtag?.("event", "generate_lead");
      const ymId = process.env.NEXT_PUBLIC_YM_ID;
      if (ymId) w.ym?.(Number(ymId), "reachGoal", "lead");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 block w-full rounded-xl border border-line bg-page px-4 py-3 text-base text-fg placeholder:text-subtle/80 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <form onSubmit={onSubmit} noValidate className="card relative space-y-5 p-5 backdrop-blur-md sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="text-sm font-semibold">
            {t.name} *
          </label>
          <input
            ref={nameRef}
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            placeholder={t.namePh}
            maxLength={80}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={field}
          />
          {errors.name && (
            <p id={`${uid}-name-err`} className="mt-1.5 text-sm text-red-700 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="text-sm font-semibold">
            {t.phone} *
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue="+998 "
            maxLength={20}
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            className={field}
          />
          {errors.phone && (
            <p id={`${uid}-phone-err`} className="mt-1.5 text-sm text-red-700 dark:text-red-400">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-product`} className="text-sm font-semibold">
          {t.product}
        </label>
        <select id={`${uid}-product`} name="product" defaultValue="" className={field}>
          <option value="" disabled>
            {t.productPh}
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.name[lang]}>
              {c.name[lang]}
            </option>
          ))}
          <option value={t.productOther}>{t.productOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${uid}-comment`} className="text-sm font-semibold">
          {t.comment}
        </label>
        <textarea
          ref={commentRef}
          id={`${uid}-comment`}
          name="comment"
          rows={4}
          maxLength={1000}
          placeholder={t.commentPh}
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot: odamlarga ko'rinmaydi, botlar to'ldiradi */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? t.sending : t.submit}
      </button>

      <div aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "success" && <p className="font-semibold text-emerald-700 dark:text-emerald-400">{t.success}</p>}
        {status === "demo" && (
          <p className="font-semibold text-brand">
            {t.success} <span className="block font-normal text-subtle">({t.demo})</span>
          </p>
        )}
        {status === "error" && <p className="font-semibold text-red-700 dark:text-red-400">{t.error}</p>}
      </div>
      <p className="text-xs text-subtle">{t.privacy}</p>
    </form>
  );
}
