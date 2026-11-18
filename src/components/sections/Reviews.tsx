import type { Dict } from "@/i18n";
import SectionHeading from "../SectionHeading";
import { QuoteIcon } from "../Icons";

/** Mijozlar fikri (B2B). Matnlar i18n/uz.ts va ru.ts da — haqiqiy fikrlarga almashtiring. */
export default function Reviews({ t }: { t: Dict }) {
  const r = t.reviews;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="container-x">
        <SectionHeading id="reviews-title" eyebrow={r.eyebrow} title={r.title} />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {r.items.map((it, i) => (
            <li key={it.name} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <figure className="card flex h-full flex-col p-6">
                <QuoteIcon className="h-8 w-8 text-accent" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg">{it.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-bold text-brand">
                    {it.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{it.name}</span>
                    <span className="block text-xs text-subtle">{it.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
