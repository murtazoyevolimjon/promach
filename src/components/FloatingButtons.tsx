import { phoneMain, telegramMain } from "@/data/site";
import type { Dict } from "@/i18n";
import { PhoneIcon, TelegramIcon } from "./Icons";

/** Pastki o'ng burchakdagi suzuvchi tugmalar (JS'siz, faqat havolalar) */
export default function FloatingButtons({ t }: { t: Dict["floating"] }) {
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col gap-3">
      <a
        href={telegramMain}
        target="_blank"
        rel="noopener"
        aria-label={t.telegram}
        title={t.telegram}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-soft transition-transform hover:scale-105"
      >
        <TelegramIcon className="h-7 w-7" />
      </a>
      <a
        href={`tel:${phoneMain.tel}`}
        aria-label={t.call}
        title={t.call}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber text-ink shadow-glow transition-transform hover:scale-105"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-amber/40 [animation-duration:2.4s] motion-reduce:hidden" />
        <PhoneIcon className="relative h-6 w-6" />
      </a>
    </div>
  );
}
