import uz, { type Dict } from "./uz";
import ru from "./ru";

export const langs = ["uz", "ru"] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = "uz";

export const htmlLang: Record<Lang, string> = { uz: "uz-Latn", ru: "ru" };
export const hreflang: Record<Lang, string> = { uz: "uz-UZ", ru: "ru-UZ" };

export function isLang(v: string): v is Lang {
  return (langs as readonly string[]).includes(v);
}

export function getDict(lang: Lang): Dict {
  return lang === "ru" ? ru : uz;
}

export type { Dict };
