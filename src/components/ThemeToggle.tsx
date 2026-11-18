"use client";

import { useEffect, useState } from "react";
import { THEME_COLORS, THEME_STORAGE_KEY } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./Icons";

function setMetaThemeColor(dark: boolean) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
}

/**
 * Kunduzgi ☀️ / tungi 🌙 rejim almashtirgich.
 * - Standart: kunduzgi (iliq) rejim. Tanlov localStorage'da saqlanadi.
 * - Ikkala ikonka ham serverda chiziladi, ko'rinishi CSS (`dark:`) bilan boshqariladi —
 *   shuning uchun hydration xatosi ham, sakrash ham bo'lmaydi.
 */
export default function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    setMetaThemeColor(isDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* private rejimda localStorage yopiq bo'lishi mumkin — e'tiborsiz qoldiramiz */
    }
    setMetaThemeColor(next);
    setDark(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark ?? undefined}
      title={label}
      className="icon-btn !h-10 !w-10 relative overflow-hidden"
    >
      {/* Kunduzgi rejimda oy (tunga o'tish), tungi rejimda quyosh (kunduzga o'tish) ko'rinadi */}
      <MoonIcon className="h-5 w-5 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
      <SunIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
