"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { phoneMain } from "@/data/site";
import type { Dict, Lang } from "@/i18n";
import Logo from "./Logo";
import OpenStatus from "./OpenStatus";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

const navOrder = ["catalog", "why", "process", "faq", "visit", "contact"] as const;

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

  const other: Lang = lang === "uz" ? "ru" : "uz";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/[0.07] bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href={`/${lang}`} aria-label={t.header.home} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-semibold text-zinc-300 xl:gap-7">
            {navOrder.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="whitespace-nowrap transition-colors hover:text-amber">
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <OpenStatus t={t.status} className="hidden 2xl:inline-flex" />
          <a
            href={`tel:${phoneMain.tel}`}
            className="hidden whitespace-nowrap text-sm font-bold text-white transition-colors hover:text-amber md:block lg:hidden xl:block"
          >
            {phoneMain.display}
          </a>

          {/* Til almashtirgich */}
          <div role="group" aria-label={t.header.langLabel} className="flex rounded-lg border border-white/10 p-0.5 text-xs font-bold">
            {(["uz", "ru"] as const).map((l) =>
              l === lang ? (
                <span key={l} aria-current="true" className="rounded-md bg-white/10 px-2 py-1.5 text-white">
                  {l === "uz" ? "UZ" : "RU"}
                </span>
              ) : (
                <Link
                  key={l}
                  href={`/${other}`}
                  hrefLang={l}
                  lang={l}
                  className="rounded-md px-2 py-1.5 text-zinc-400 transition-colors hover:text-white"
                  aria-label={l === "uz" ? "O'zbekcha" : "Русский"}
                >
                  {l === "uz" ? "UZ" : "RU"}
                </Link>
              )
            )}
          </div>

          <a href={`tel:${phoneMain.tel}`} className="btn-primary hidden !min-h-[40px] whitespace-nowrap !px-4 !py-2 !text-sm sm:inline-flex">
            <PhoneIcon className="h-4 w-4" />
            {t.header.call}
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 lg:hidden"
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
      <div id="mobile-menu" hidden={!open} className="border-t border-white/[0.07] bg-ink lg:hidden">
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="grid gap-1 text-base font-semibold">
            {navOrder.map((k) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-zinc-200 hover:bg-white/5 hover:text-amber"
                >
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.07] pt-4">
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
