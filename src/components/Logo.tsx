import { GearIcon } from "./Icons";

/** PROMACH logotipi: shesternya + so'z belgisi (matn HTML'da — SEO va aniqlik uchun) */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-2 font-extrabold tracking-[0.08em] ${className}`}>
      <GearIcon className="h-7 w-7 text-accent transition-transform duration-700 group-hover:rotate-90" />
      <span className="text-lg sm:text-xl">PROMACH</span>
    </span>
  );
}
