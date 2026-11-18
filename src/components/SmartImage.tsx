import Image from "next/image";
import { GearIcon } from "./Icons";

/**
 * Rasm bo'lsa — next/image (lazy loading, WebP/AVIF, o'lcham optimallashtirish).
 * Rasm bo'lmasa — bir xil o'lchamdagi placeholder (CLS bo'lmasligi uchun aspect-ratio saqlanadi).
 */
export default function SmartImage({
  src,
  alt,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  label,
  className = "",
}: {
  src?: string | null;
  alt: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_90%_at_50%_0%,#2a2b30_0%,#15161a_60%,#0e0e10_100%)]"
        >
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <GearIcon className="relative h-10 w-10 text-amber/80 transition-transform duration-700 group-hover:rotate-90" />
          {label && <span className="relative px-4 text-center text-xs font-semibold text-zinc-400">{label}</span>}
        </div>
      )}
    </div>
  );
}
