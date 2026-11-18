import type { Dict } from "@/i18n";
import FacadeImage from "../FacadeImage";
import SectionHeading from "../SectionHeading";
import SmartImage from "../SmartImage";

/**
 * Galereya rasmlari. Fayllarni /public/images/gallery/ ga qo'yib, yo'llarini shu yerga yozing.
 * Birinchi element — do'kon fasadi (site.images.facade dan olinadi).
 */
const galleryImages: (string | null)[] = [
  null, // fasad — FacadeImage komponenti
  null, // "/images/gallery/zal-konveksion.webp"
  null, // "/images/gallery/rotatsion.webp"
  null, // "/images/gallery/mikserlar.webp"
  null, // "/images/gallery/ornatilgan.webp"
];

export default function Gallery({ t }: { t: Dict }) {
  const g = t.gallery;
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-surface">
      <div className="container-x">
        <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {g.items.map((caption, i) => {
            const big = i === 0;
            return (
              <li
                key={caption}
                className={`reveal group relative overflow-hidden rounded-2xl border border-line shadow-soft ${
                  big ? "col-span-2 row-span-2" : ""
                }`}
              >
                <figure className="h-full">
                  {i === 0 ? (
                    <FacadeImage alt={caption} aspect="aspect-square" sizes="(min-width:1024px) 50vw, 100vw" className="h-full" />
                  ) : (
                    <SmartImage src={galleryImages[i]} alt={caption} aspect="aspect-square" sizes="(min-width:1024px) 25vw, 50vw" />
                  )}
                  {/* Rasm ustidagi yozuv — har doim to'q fon + oq matn (o'qilishi uchun) */}
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 text-xs font-semibold text-white sm:text-sm">
                    {caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
