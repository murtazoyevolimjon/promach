"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { phoneMain } from "@/data/site";
import type { Dict, Lang } from "@/i18n";
import Logo from "./Logo";
import OpenStatus from "./OpenStatus";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

const navOrder = ["catalog", "why", "process", "faq", "visit", "contact"] as const;

/**
 * Sticky header (glassmorphism).
 *  mobil:      logo · rejim · til · menyu
 *  sm–lg:      + ochiq/yopiq · "Qo'ng'iroq qilish"
 *  lg:         + menyu havolalari (qo'ng'iroq tugmasi ixcham)
 *  xl+:        + ochiq/yopiq · telefon raqami tugmada
 */
export default function Header({ lang, t }: { lang: Lang; t: Dict }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menyu ochiq bo'lganda Esc bilan yopish
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open ? "border-b border-line/80 bg-page/75 shadow-soft backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link href={`/${lang}`} aria-label={t.header.home} className="shrink-0 text-fg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-semibold text-muted xl:gap-6">
            {navOrder.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="whitespace-nowrap transition-colors hover:text-brand">
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <OpenStatus t={t.status} compact className="hidden sm:inline-flex lg:hidden xl:inline-flex" />

          <ThemeToggle label={t.header.theme} />

          {/* Til almashtirgich */}
          <div role="group" aria-label={t.header.langLabel} className="glass flex h-10 items-center rounded-xl p-0.5 text-xs font-bold">
            {(["uz", "ru"] as const).map((l) =>
              l === lang ? (
                <span key={l} aria-current="true" className="rounded-lg bg-accent px-2.5 py-1.5 text-accent-fg">
                  {l === "uz" ? "O'Z" : "RU"}
                </span>
              ) : (
                <Link
                  key={l}
                  href={`/${l}`}
                  hrefLang={l}
                  lang={l}
                  className="rounded-lg px-2.5 py-1.5 text-subtle transition-colors hover:text-fg"
                  aria-label={l === "uz" ? "O'zbekcha" : "Русский"}
                >
                  {l === "uz" ? "O'Z" : "RU"}
                </Link>
              )
            )}
          </div>

          {/* Qo'ng'iroq: sm–lg matnli, lg ixcham, xl+ telefon raqami bilan */}
          <a
            href={`tel:${phoneMain.tel}`}
            aria-label={`${t.header.call}: ${phoneMain.display}`}
            className="btn-primary hidden !min-h-[40px] whitespace-nowrap !px-4 !py-2 !text-sm sm:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="lg:hidden">{t.header.call}</span>
            <span className="hidden xl:inline">{phoneMain.display}</span>
          </a>

          <button
            type="button"
            className="icon-btn !h-10 !w-10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-page/95 backdrop-blur-xl lg:hidden">
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="grid gap-1 text-base font-semibold">
            {navOrder.map((k) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-fg hover:bg-surface hover:text-brand"
                >
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
            <OpenStatus t={t.status} className="self-start" />
            <a href={`tel:${phoneMain.tel}`} className="btn-primary w-full">
              <PhoneIcon className="h-5 w-5" />
              {phoneMain.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
