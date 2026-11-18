import type { Dict } from "@/i18n";
import { advantageIcons } from "../Icons";

export default function Advantages({ t }: { t: Dict }) {
  return (
    <section aria-labelledby="adv-title" className="relative border-y border-line bg-surface py-10 sm:py-14">
      <div className="container-x">
        <h2 id="adv-title" className="sr-only">
          {t.advantages.title}
        </h2>
        <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {t.advantages.items.map((a, i) => {
            const Icon = advantageIcons[a.icon];
            return (
              <li
                key={a.title}
                className="reveal card flex items-start gap-4 p-5 transition-colors hover:border-accent/50"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-bold">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-subtle">{a.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
