import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { hreflang } from "@/i18n";

/** /sitemap.xml avtomatik yaratiladi (hreflang alternativlari bilan) */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    [hreflang.uz]: `${site.url}/uz`,
    [hreflang.ru]: `${site.url}/ru`,
  };
  const lastModified = new Date();
  return [
    { url: `${site.url}/uz`, lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: `${site.url}/ru`, lastModified, changeFrequency: "weekly", priority: 0.9, alternates: { languages } },
  ];
}
