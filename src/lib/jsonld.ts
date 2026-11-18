/**
 * JSON-LD structured data: LocalBusiness (Store), Product katalogi (ItemList), FAQPage.
 * Tekshirish: https://search.google.com/test/rich-results va https://validator.schema.org
 */
import { categories, products } from "@/data/products";
import { site } from "@/data/site";
import type { Dict, Lang } from "@/i18n";

export function buildJsonLd(lang: Lang, t: Dict) {
  const pageUrl = `${site.url}/${lang}`;
  const businessId = `${site.url}/#business`;

  const business = {
    "@type": "Store",
    "@id": businessId,
    name: "PROMACH",
    alternateName: "PROMACH.uz",
    description: t.meta.description,
    url: pageUrl,
    image: `${site.url}/${lang}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    telephone: site.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street[lang],
      addressLocality: site.address.city[lang],
      addressRegion: site.address.region[lang],
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days.map((d) => `https://schema.org/${d}`),
        opens: site.hours.open,
        closes: site.hours.close,
      },
    ],
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: "sales",
      availableLanguage: ["uz", "ru"],
    })),
    sameAs: [site.instagram.url, site.telegram.manager.url, site.telegram.channel.url, site.telegram.extra.url],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: "PROMACH",
    inLanguage: lang === "uz" ? "uz" : "ru",
    publisher: { "@id": businessId },
  };

  // Eslatma: narx ko'rsatilmagani uchun Google Product rich snippet bermasligi mumkin.
  // Haqiqiy narxlar qo'shilganda har bir mahsulotga "offers" (price, priceCurrency: "UZS") qo'shing.
  const catalog = {
    "@type": "ItemList",
    name: t.catalog.title,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name[lang],
        description: p.desc[lang],
        category: categories.find((c) => c.id === p.category)?.name[lang],
        ...(p.image ? { image: `${site.url}${p.image}` } : {}),
        seller: { "@id": businessId },
      },
    })),
  };

  const faq = {
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [business, website, catalog, faq],
  };
}
