import { notFound } from "next/navigation";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Advantages from "@/components/sections/Advantages";
import Catalog from "@/components/sections/Catalog";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Reviews from "@/components/sections/Reviews";
import Visit from "@/components/sections/Visit";
import WhyUs from "@/components/sections/WhyUs";
import { getDict, isLang } from "@/i18n";
import { buildJsonLd } from "@/lib/jsonld";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const jsonLd = buildJsonLd(lang, t);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header lang={lang} t={t} />
      <main>
        <Hero t={t} />
        <Advantages t={t} />
        <Catalog lang={lang} t={t} />
        <WhyUs t={t} />
        <Process t={t} />
        <Gallery t={t} />
        <Reviews t={t} />
        <Faq t={t} />
        <Visit lang={lang} t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <Footer lang={lang} t={t} />
      <FloatingButtons t={t.floating} />
      <RevealObserver />
    </>
  );
}
