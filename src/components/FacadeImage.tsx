import Image from "next/image";
import { site } from "@/data/site";
import { GearIcon } from "./Icons";

/**
 * Do'kon fasadi. site.images.facade to'ldirilsa — haqiqiy rasm ko'rsatiladi.
 * Hozircha: haqiqiy tabelaga o'xshash HTML/CSS versiya (qora yorug' tabela, oq harflar, shesternya).
 */
export default function FacadeImage({
  alt,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
}: {
  alt: string;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const src = site.images.facade;
  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col justify-start bg-gradient-to-b from-[#26272b] via-[#1b1c1f] to-[#0c0c0d]"
        >
          {/* Tabela */}
          <div className="mx-[6%] mt-[9%] flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-black px-4 py-[5%] shadow-[0_0_40px_-6px_rgba(255,255,255,.18),inset_0_0_24px_rgba(255,255,255,.05)]">
            <GearIcon className="h-[clamp(1.5rem,5vw,2.5rem)] w-[clamp(1.5rem,5vw,2.5rem)] text-white" />
            <span className="text-[clamp(1.4rem,5.5vw,2.6rem)] font-extrabold tracking-[0.12em] text-white [text-shadow:0_0_14px_rgba(255,255,255,.45)]">
              PROMACH
            </span>
          </div>
          {/* Vitrina oynalari */}
          <div className="mx-[6%] mt-[6%] grid flex-1 grid-cols-3 gap-2 pb-[6%]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-md border border-white/10 bg-[linear-gradient(160deg,rgba(245,179,1,.16),rgba(255,255,255,.03)_45%,rgba(0,0,0,.4))]"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
