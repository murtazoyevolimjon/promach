import type { Dict } from "@/i18n";
import SectionHeading from "../SectionHeading";
import { PlusIcon } from "../Icons";

/** FAQ akkordeon — <details>/<summary> asosida: JS kerak emas, matn HTML'da (SEO + FAQPage JSON-LD bilan mos) */
export default function Faq({ t }: { t: Dict }) {
  const f = t.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-surface">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHeading id="faq-title" eyebrow={f.eyebrow} title={f.title} />
        <div className="reveal space-y-3">
          {f.items.map((it, i) => (
            <details key={it.q} className="group card overflow-hidden open:border-accent/50" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-bold [&::-webkit-details-marker]:hidden">
                <h3 className="text-base">{it.q}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-brand">
                  <PlusIcon className="h-5 w-5 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
