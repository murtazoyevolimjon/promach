import { fullAddress, site } from "@/data/site";
import type { Dict, Lang } from "@/i18n";
import Logo from "./Logo";
import { InstagramIcon, TelegramIcon } from "./Icons";

const links = ["catalog", "why", "process", "faq", "visit", "contact"] as const;

export default function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.07] bg-ink pb-28 pt-14 sm:pb-14">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">{t.footer.about}</p>
          <p className="mt-4 text-sm font-semibold text-zinc-200">{t.visit.hoursText}</p>
        </div>

        <nav aria-label={t.footer.links}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">{t.footer.links}</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            {links.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="hover:text-amber">
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">{t.footer.contacts}</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-zinc-400">
            <p>{fullAddress(lang)}</p>
            {site.phones.map((p) => (
              <p key={p.tel}>
                <a href={`tel:${p.tel}`} className="font-semibold text-zinc-200 hover:text-amber">
                  {p.display}
                </a>
              </p>
            ))}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">{t.footer.follow}</h2>
          <ul className="mt-4 flex gap-3">
            <li>
              <a href={site.telegram.manager.url} target="_blank" rel="noopener" aria-label="Telegram" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 hover:border-amber hover:text-amber">
                <TelegramIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={site.telegram.channel.url} target="_blank" rel="noopener" aria-label={t.contact.telegramChannel} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 hover:border-amber hover:text-amber">
                <TelegramIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 hover:border-amber hover:text-amber">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-white/[0.07] pt-6 text-xs text-zinc-500">
        © {year} PROMACH · {site.domain}. {t.footer.rights}
      </div>
    </footer>
  );
}
