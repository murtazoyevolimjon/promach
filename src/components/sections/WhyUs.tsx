import type { Dict } from "@/i18n";
import FacadeImage from "../FacadeImage";
import SectionHeading from "../SectionHeading";

export default function WhyUs({ t }: { t: Dict }) {
  const w = t.why;
  return (
    <section id="why" aria-labelledby="why-title" className="section bg-graphite">
      <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="reveal relative">
          <FacadeImage alt={w.facadeAlt} aspect="aspect-[4/3] lg:aspect-[4/5]" className="rounded-2xl border border-white/[0.07] shadow-soft" />
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-ink/90 p-4 backdrop-blur sm:left-auto sm:w-72">
            <p className="text-sm font-bold">PROMACH · {t.visit.hoursText}</p>
          </div>
        </div>

        <div>
          <SectionHeading id="why-title" eyebrow={w.eyebrow} title={w.title} lead={w.lead} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {w.items.map((it, i) => (
              <li key={it.title} className="reveal card p-5" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <span className="text-sm font-extrabold text-amber">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-base font-bold">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
