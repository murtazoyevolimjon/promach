import Image from "next/image";
import { phoneMain, site, telegramMain } from "@/data/site";
import type { Dict } from "@/i18n";
import OpenStatus from "../OpenStatus";
import OvenIllustration from "../OvenIllustration";
import { CheckIcon, PhoneIcon, TelegramIcon } from "../Icons";

export default function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-14 pt-24 sm:pt-28 lg:pb-24 lg:pt-36">
      {/* Fon: pech taftini eslatuvchi iliq yorug'lik va nozik to'r — rasmsiz, juda yengil */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-accent/20 blur-[120px] dark:bg-accent/10" />
        <div className="absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-orange-400/10 blur-[110px] dark:bg-orange-500/5" />
        <div className="bg-grid absolute inset-0 opacity-[0.05] [background-size:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
      </div>

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <OpenStatus t={t.status} />
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-brand">
              {h.badge}
            </span>
          </div>

          {/* Sahifadagi yagona H1 */}
          <h1
            id="hero-title"
            className="mt-6 text-[2.2rem] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {h.h1Lead}{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-700 to-orange-700 bg-clip-text text-transparent dark:from-amber-300 dark:via-amber-500 dark:to-orange-400">
              {h.h1Accent}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{h.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={telegramMain} target="_blank" rel="noopener" className="btn-primary">
              <TelegramIcon className="h-5 w-5" />
              {h.telegram}
            </a>
            <a href={`tel:${phoneMain.tel}`} className="btn-ghost">
              <PhoneIcon className="h-5 w-5" />
              {h.call}
            </a>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-muted sm:flex sm:flex-wrap sm:gap-x-6">
            {h.points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-brand" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Mahsulot rasmi (LCP uchun priority) yoki SVG illyustratsiya */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none">
          {site.images.hero ? (
            <div className="relative aspect-[420/460]">
              <Image
                src={site.images.hero}
                alt={h.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,.35)]"
              />
            </div>
          ) : (
            <OvenIllustration title={h.imageAlt} />
          )}
        </div>
      </div>
    </section>
  );
}
