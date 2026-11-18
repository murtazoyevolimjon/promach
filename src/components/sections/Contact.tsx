import { site } from "@/data/site";
import type { Dict, Lang } from "@/i18n";
import LeadForm from "../LeadForm";
import SectionHeading from "../SectionHeading";
import { ClockIcon, InstagramIcon, PhoneIcon, TelegramIcon } from "../Icons";

export default function Contact({ lang, t }: { lang: Lang; t: Dict }) {
  const c = t.contact;
  const socials = [
    { href: site.telegram.manager.url, label: c.telegramManager, handle: site.telegram.manager.handle, Icon: TelegramIcon },
    { href: site.telegram.channel.url, label: c.telegramChannel, handle: site.telegram.channel.handle, Icon: TelegramIcon },
    { href: site.telegram.extra.url, label: "Telegram", handle: site.telegram.extra.handle, Icon: TelegramIcon },
    { href: site.instagram.url, label: c.instagram, handle: site.instagram.handle, Icon: InstagramIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-graphite">
      <div className="container-x grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
          <div className="reveal mt-8">
            <LeadForm lang={lang} t={c.form} />
          </div>
        </div>

        <aside className="reveal space-y-4 lg:pt-28">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
              <ClockIcon className="h-5 w-5 text-amber" />
              {t.visit.hours}
            </h3>
            <p className="mt-2 text-lg font-bold">{t.visit.hoursText}</p>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-zinc-400">{t.visit.phones}</h3>
            <ul className="mt-3 space-y-2">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="flex items-center gap-3 rounded-xl px-1 py-1.5 text-lg font-bold hover:text-amber">
                    <PhoneIcon className="h-5 w-5 text-amber" />
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-zinc-400">{c.direct}</h3>
            <ul className="mt-3 grid gap-2">
              {socials.map(({ href, label, handle, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 transition-colors hover:border-amber/40"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{label}</span>
                      <span className="block text-xs text-zinc-400">{handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
