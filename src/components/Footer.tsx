import { fullAddress, site } from "@/data/site";
import type { Dict, Lang } from "@/i18n";
import Logo from "./Logo";
import { InstagramIcon, TelegramIcon } from "./Icons";

const links = ["catalog", "why", "process", "faq", "visit", "contact"] as const;

export default function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  const year = new Date().getFullYear();
  const social = "icon-btn";
  return (
    <footer className="border-t border-line bg-page pb-28 pt-14 sm:pb-14">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-subtle">{t.footer.about}</p>
          <p className="mt-4 text-sm font-semibold text-fg">{t.visit.hoursText}</p>
        </div>

        <nav aria-label={t.footer.links}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-fg">{t.footer.links}</h2>
          <ul className="mt-4 space-y-2 text-sm text-subtle">
            {links.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="hover:text-brand">
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-fg">{t.footer.contacts}</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-subtle">
            <p>{fullAddress(lang)}</p>
            {site.phones.map((p) => (
              <p key={p.tel}>
                <a href={`tel:${p.tel}`} className="font-semibold text-fg hover:text-brand">
                  {p.display}
                </a>
              </p>
            ))}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-fg">{t.footer.follow}</h2>
          <ul className="mt-4 flex gap-3">
            <li>
              <a href={site.telegram.manager.url} target="_blank" rel="noopener" aria-label="Telegram" className={social}>
                <TelegramIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={site.telegram.channel.url} target="_blank" rel="noopener" aria-label={t.contact.telegramChannel} className={social}>
                <TelegramIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener" aria-label="Instagram" className={social}>
                <InstagramIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-line pt-6 text-xs text-subtle">
        © {year} PROMACH · {site.domain}. {t.footer.rights}
      </div>
    </footer>
  );
}
