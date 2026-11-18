import type { Dict } from "@/i18n";
import SectionHeading from "../SectionHeading";
import { PlusIcon } from "../Icons";

/** FAQ — <details>/<summary> asosida: JS kerak emas, matn HTML'da (SEO + FAQPage JSON-LD bilan mos) */
export default function Faq({ t }: { t: Dict }) {
  const f = t.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-graphite">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHeading id="faq-title" eyebrow={f.eyebrow} title={f.title} />
        <div className="reveal space-y-3">
          {f.items.map((it, i) => (
            <details key={it.q} className="group card overflow-hidden" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-bold [&::-webkit-details-marker]:hidden">
                <h3 className="text-base">{it.q}</h3>
                <PlusIcon className="h-5 w-5 shrink-0 text-amber transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-300">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
