/**
 * Yengil inline SVG ikonkalar (tashqi kutubxonasiz — sayt tez yuklanishi uchun).
 */
import type React from "react";
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...p,
});

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const TelegramIcon = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M21.9 4.3 18.7 19.4c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13.1l-4.8-1.5c-1-.3-1.1-1 .2-1.5L20.6 2.9c.9-.3 1.6.2 1.3 1.4z" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M1 4h14v11H1zM15 8h4l3 3v4h-7" />
    <circle cx="5.5" cy="18" r="2" />
    <circle cx="18.5" cy="18" r="2" />
  </svg>
);

export const WrenchIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
  </svg>
);

export const ChatIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z" />
    <path d="M8 10h8M8 14h5" />
  </svg>
);

export const TagIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7" cy="7" r="1.5" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const NavigationIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 11 22 2l-9 19-2-8z" />
  </svg>
);

export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SunIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const QuoteIcon = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M9.6 6C6.5 7.4 4.5 10 4.5 13.6V18h5.4v-5.4H7.4c.2-2 1.3-3.4 3.1-4.3zm9 0c-3.1 1.4-5.1 4-5.1 7.6V18h5.4v-5.4h-2.5c.2-2 1.3-3.4 3.1-4.3z" />
  </svg>
);

/** PROMACH logotipidagi shesternya (gear) belgisi */
export const GearIcon = (p: P) => (
  <svg {...base({ ...p, viewBox: "0 0 32 32", strokeWidth: 0, fill: "currentColor", stroke: "none" })}>
    <path d="M13.6 1.5h4.8l.7 3.6c.9.3 1.8.6 2.6 1.1l3-2.1 3.4 3.4-2.1 3c.5.8.8 1.7 1.1 2.6l3.6.7v4.8l-3.6.7c-.3.9-.6 1.8-1.1 2.6l2.1 3-3.4 3.4-3-2.1c-.8.5-1.7.8-2.6 1.1l-.7 3.6h-4.8l-.7-3.6c-.9-.3-1.8-.6-2.6-1.1l-3 2.1-3.4-3.4 2.1-3c-.5-.8-.8-1.7-1.1-2.6l-3.6-.7v-4.8l3.6-.7c.3-.9.6-1.8 1.1-2.6l-2.1-3 3.4-3.4 3 2.1c.8-.5 1.7-.8 2.6-1.1zM16 10.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" />
  </svg>
);

export const ZapIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 22c4 0 7-2.7 7-6.6 0-3.5-2.4-5.6-4-7.4-.4 1.9-1.5 3-2.6 3.3C13 8 12 4.7 9.5 2 9.6 5.5 5 8.3 5 15.4 5 19.3 8 22 12 22z" />
  </svg>
);

/** Afzalliklar va "Nega PROMACH" ro'yxatlari uchun ikonka kalitlari (uz.ts / ru.ts dagi `icon` maydoni) */
export const advantageIcons: Record<string, (p: P) => React.JSX.Element> = {
  tag: TagIcon,
  truck: TruckIcon,
  wrench: WrenchIcon,
  chat: ChatIcon,
  shield: ShieldIcon,
  zap: ZapIcon,
  flame: FlameIcon,
  gear: GearIcon,
  check: CheckIcon,
};
