import { GearIcon } from "./Icons";

/** PROMACH logotipi: shesternya + so'z belgisi (matn HTML'da — SEO va aniqlik uchun) */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-[0.08em] ${className}`}>
      <GearIcon className="h-7 w-7 text-amber" />
      <span className="text-lg sm:text-xl">PROMACH</span>
    </span>
  );
}
