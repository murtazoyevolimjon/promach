/**
 * ============================================================
 *  PROMACH — ASOSIY MA'LUMOTLAR (kontaktlar, manzil, ish vaqti)
 *  Shu faylni tahrirlab, butun saytdagi ma'lumotlarni o'zgartirasiz.
 * ============================================================
 */

export const site = {
  name: "PROMACH",
  domain: "promach.uz",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://promach.uz").replace(/\/$/, ""),

  phones: [
    { display: "+998 94 539 06 00", tel: "+998945390600" },
    { display: "+998 91 318 40 40", tel: "+998913184040" },
    { display: "+998 95 399 56 99", tel: "+998953995699" },
  ],

  telegram: {
    manager: { handle: "@PROMACHorg", url: "https://t.me/PROMACHorg" },
    channel: { handle: "PromachUZ", url: "https://t.me/PromachUZ" },
    extra: { handle: "@Promach_1", url: "https://t.me/Promach_1" },
  },

  instagram: { handle: "promachtexnika", url: "https://instagram.com/promachtexnika" },

  // TODO: aniq manzilni kiriting (ko'cha, uy raqami, mo'ljal)
  address: {
    street: { uz: "[MANZIL SHU YERGA]", ru: "[АДРЕС ЗДЕСЬ]" },
    city: { uz: "Samarqand", ru: "Самарканд" },
    region: { uz: "Samarqand viloyati", ru: "Самаркандская область" },
    country: { uz: "O'zbekiston", ru: "Узбекистан" },
    postalCode: "140100",
    countryCode: "UZ",
  },

  // TODO: do'konning aniq koordinatalari (Google Maps'da nuqtani bosib, nusxalang)
  geo: { lat: 39.6542, lng: 66.9597 },

  // Xarita uchun qidiruv so'zi (koordinata yoki "PROMACH Samarqand")
  mapQuery: "39.6542,66.9597",

  hours: {
    open: "10:00",
    close: "19:00",
    openHour: 10,
    closeHour: 19,
    timeZone: "Asia/Tashkent", // UTC+5 (Samarqand ham shu vaqt zonasida)
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },

  /**
   * Rasmlar. Faylni /public/images/ papkasiga qo'ying (WebP tavsiya etiladi)
   * va yo'lini yozing, masalan: "/images/promach-facade.webp".
   * null bo'lsa — chiroyli placeholder ko'rsatiladi.
   */
  images: {
    facade: null as string | null, // do'kon fasadi (Biz haqimizda, Tashrif, Galereya)
    hero: null as string | null, // hero fonidagi mahsulot rasmi
  },
} as const;

export const telegramMain = site.telegram.manager.url;
export const phoneMain = site.phones[0];

export function fullAddress(lang: "uz" | "ru") {
  const a = site.address;
  return `${a.street[lang]}, ${a.city[lang]}, ${a.country[lang]}`;
}

export const mapLinks = {
  embed: `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=16&output=embed`,
  googleDirections: `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`,
  yandexDirections: `https://yandex.uz/maps/?rtext=~${site.geo.lat},${site.geo.lng}&rtt=auto`,
};
