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
 * "Hozir ochiq / yopiq" belgisi (real vaqtda, har daqiqada yangilanadi).
 * Server tomonda neytral holat ("Har kuni 10:00–19:00") chiqadi — hydration xatosi va CLS bo'lmaydi.
 * compact — header uchun qisqa variant ("Ochiq" / "Yopiq").
 */
export default function OpenStatus({
  t,
  compact = false,
  className = "",
}: {
  t: Dict["status"];
  compact?: boolean;
  className?: string;
}) {
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

  const dot = open === null ? "bg-subtle" : open ? "bg-emerald-500" : "bg-red-500";
  const text =
    open === null
      ? compact
        ? `${site.hours.open}–${site.hours.close}`
        : t.hours
      : compact
        ? open
          ? t.openShort
          : t.closedShort
        : open
          ? `${t.open} · ${t.until}`
          : `${t.closed} · ${t.opensAt}`;

  return (
    <span
      className={`glass inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-fg ${className}`}
      aria-live="polite"
      title={t.hours}
    >
      <span className="relative flex h-2 w-2">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {text}
    </span>
  );
}
