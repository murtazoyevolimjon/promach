import type { Dict } from "@/i18n";
import SectionHeading from "../SectionHeading";

export default function Process({ t }: { t: Dict }) {
  const p = t.process;
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <div className="container-x">
        <SectionHeading id="process-title" eyebrow={p.eyebrow} title={p.title} center />
        <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Qadamlar orasidagi chiziq (faqat katta ekranda) */}
          <span aria-hidden className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-amber/0 via-amber/40 to-amber/0 lg:block" />
          {p.steps.map((s, i) => (
            <li key={s.title} className="reveal relative text-center" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber/40 bg-ink text-xl font-extrabold text-amber shadow-glow">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-zinc-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
