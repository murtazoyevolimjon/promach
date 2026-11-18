import { fullAddress, mapLinks, site } from "@/data/site";
import type { Dict, Lang } from "@/i18n";
import FacadeImage from "../FacadeImage";
import SectionHeading from "../SectionHeading";
import { ClockIcon, NavigationIcon, PhoneIcon, PinIcon } from "../Icons";

/** "Do'konimizga tashrif buyuring": fasad + manzil/ish vaqti + Google xarita yonma-yon */
export default function Visit({ lang, t }: { lang: Lang; t: Dict }) {
  const v = t.visit;
  const rows = "flex gap-4";
  const iconBox = "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-brand";
  return (
    <section id="visit" aria-labelledby="visit-title" className="section">
      <div className="container-x">
        <SectionHeading id="visit-title" eyebrow={v.eyebrow} title={v.title} lead={v.lead} />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <FacadeImage
            alt={t.why.facadeAlt}
            aspect="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]"
            className="reveal rounded-2xl border border-line shadow-soft"
          />

          {/* address — Schema-ga mos semantik manzil bloki */}
          <address className="reveal card flex flex-col gap-6 p-6 not-italic">
            <div className={rows}>
              <span className={iconBox}>
                <PinIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-subtle">{v.address}</h3>
                <p className="mt-1 font-bold">{fullAddress(lang)}</p>
              </div>
            </div>
            <div className={rows}>
              <span className={iconBox}>
                <ClockIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-subtle">{v.hours}</h3>
                <p className="mt-1 font-bold">{v.hoursText}</p>
              </div>
            </div>
            <div className={rows}>
              <span className={iconBox}>
                <PhoneIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-subtle">{v.phones}</h3>
                <ul className="mt-1 space-y-1">
                  {site.phones.map((p) => (
                    <li key={p.tel}>
                      <a href={`tel:${p.tel}`} className="font-bold hover:text-brand">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto">
              <p className="mb-3 text-sm font-semibold text-muted">{v.directions}:</p>
              <div className="grid grid-cols-2 gap-3">
                <a href={mapLinks.googleDirections} target="_blank" rel="noopener" className="btn-primary !px-3">
                  <NavigationIcon className="h-4 w-4" />
                  {v.google}
                </a>
                <a href={mapLinks.yandexDirections} target="_blank" rel="noopener" className="btn-ghost !px-3">
                  <NavigationIcon className="h-4 w-4" />
                  {v.yandex}
                </a>
              </div>
            </div>
          </address>

          {/* Xarita: loading="lazy" — sahifa tezligiga ta'sir qilmaydi */}
          <div className="reveal overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
            <iframe
              title={v.mapTitle}
              src={mapLinks.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0 lg:h-full lg:min-h-[420px]"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
