"use client";

import { useMemo, useState } from "react";
import { categories, products, type CategoryId } from "@/data/products";
import { telegramMain } from "@/data/site";
import type { Dict, Lang } from "@/i18n";
import SectionHeading from "../SectionHeading";
import SmartImage from "../SmartImage";
import { ArrowRightIcon, CheckIcon, TelegramIcon } from "../Icons";

/** "Narxni so'rash" -> forma tomon scroll qiladi va jihoz nomini formaga yozadi */
export const ASK_EVENT = "promach:ask";
const INITIAL = 6;

export default function Catalog({ lang, t }: { lang: Lang; t: Dict }) {
  const c = t.catalog;
  const [active, setActive] = useState<CategoryId | "all">("all");
  const [expanded, setExpanded] = useState(false);

  const list = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active]
  );
  // "Hammasi" tanlanganda dastlab 6 ta ko'rinadi. Qolganlari HTML'da bor (SEO), faqat yashirilgan.
  const collapsed = active === "all" && !expanded && list.length > INITIAL;

  const ask = (name: string) => {
    window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: name }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const filters: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: c.all },
    ...categories.map((cat) => ({ id: cat.id, label: cat.name[lang] })),
  ];

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="section">
      <div className="container-x">
        <SectionHeading id="catalog-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        {/* Filtr: mobilda gorizontal scroll */}
        <div
          role="toolbar"
          aria-label={c.filterLabel}
          className="reveal -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {filters.map((f) => {
            const on = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f.id)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  on
                    ? "border-amber bg-amber text-ink"
                    : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {list.map((p, i) => {
            const cat = categories.find((x) => x.id === p.category)!;
            return (
              <li key={p.id} hidden={collapsed && i >= INITIAL}>
                <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-amber/30">
                  <SmartImage src={p.image} alt={`${p.name[lang]} — ${c.imageAlt}`} aspect="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber/90">{cat.name[lang]}</p>
                    <h3 className="mt-2 text-lg font-bold leading-snug">{p.name[lang]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.desc[lang]}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
                      {p.specs[lang].map((s) => (
                        <li key={s} className="flex gap-2">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className="text-sm font-semibold text-zinc-200">{c.price}</span>
                      <button type="button" onClick={() => ask(p.name[lang])} className="btn-primary !min-h-[44px] !px-4 !py-2 !text-sm">
                        {c.ask}
                        <ArrowRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {collapsed && (
          <div className="mt-8 text-center">
            <button type="button" onClick={() => setExpanded(true)} className="btn-ghost">
              {c.showAll} ({list.length})
            </button>
          </div>
        )}

        <div className="reveal card mt-8 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold">{c.notFoundTitle}</h3>
            <p className="mt-1 text-sm text-zinc-400">{c.notFoundText}</p>
          </div>
          <a href={telegramMain} target="_blank" rel="noopener" className="btn-ghost shrink-0">
            <TelegramIcon className="h-5 w-5" />
            {t.hero.telegram}
          </a>
        </div>
      </div>
    </section>
  );
}
