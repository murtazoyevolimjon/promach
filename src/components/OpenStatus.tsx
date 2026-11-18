"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import type { Dict } from "@/i18n";

/** Toshkent vaqti (UTC+5) bo'yicha hozirgi soatni qaytaradi */
function tashkentHour(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.hours.timeZone,
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  return Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
}

/**
 * "Hozir ochiq / yopiq" belgisi.
 * Server tomonda neytral holat ("Har kuni 10:00–19:00") chiqadi — hydration xatosi va CLS bo'lmaydi.
 */
export default function OpenStatus({ t, className = "" }: { t: Dict["status"]; className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const h = tashkentHour();
      setOpen(h >= site.hours.openHour && h < site.hours.closeHour);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  const dot = open === null ? "bg-zinc-500" : open ? "bg-emerald-400" : "bg-red-400";
  const text = open === null ? t.hours : open ? `${t.open} · ${t.until}` : `${t.closed} · ${t.opensAt}`;

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-200 ${className}`}
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {text}
    </span>
  );
}
