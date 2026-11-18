import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Analytics from "@/components/Analytics";
import { site } from "@/data/site";
import { getDict, hreflang, htmlLang, isLang, langs } from "@/i18n";

// Manrope: lotin va kirill yozuvlarini qo'llab-quvvatlaydi. next/font o'zi hostlaydi (tashqi so'rovsiz, CLS yo'q).
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

export const dynamicParams = false;
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  const url = `${site.url}/${lang}`;

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: "PROMACH",
    alternates: {
      canonical: url,
      languages: {
        [hreflang.uz]: `${site.url}/uz`,
        [hreflang.ru]: `${site.url}/ru`,
        "x-default": `${site.url}/uz`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "PROMACH",
      title: t.meta.title,
      description: t.meta.description,
      locale: t.meta.ogLocale,
      alternateLocale: lang === "uz" ? "ru_RU" : "uz_UZ",
      // og:image — app/[lang]/opengraph-image.tsx avtomatik yaratadi
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    // Google Search Console va Yandex Webmaster tasdiqlash meta teglari (.env orqali)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
    formatDetection: { telephone: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Scroll-reveal animatsiyasi faqat JS ishlaganda yoqiladi */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
