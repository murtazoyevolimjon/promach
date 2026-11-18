/**
 * Hero uchun yengil SVG konveksion pech illyustratsiyasi (rasm yuklanmaguncha / rasm bo'lmasa).
 * Haqiqiy mahsulot rasmi qo'shilsa (site.images.hero) — u ishlatiladi.
 */
export default function OvenIllustration({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 420 460" role="img" aria-label={title} className="h-auto w-full">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3b40" />
          <stop offset=".5" stopColor="#24252a" />
          <stop offset="1" stopColor="#131316" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5B301" stopOpacity=".55" />
          <stop offset="1" stopColor="#7a3d00" stopOpacity=".35" />
        </linearGradient>
        <radialGradient id="glow" cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#F5B301" stopOpacity=".35" />
          <stop offset="1" stopColor="#F5B301" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="210" cy="250" rx="210" ry="210" fill="url(#glow)" />
      {/* Korpus */}
      <rect x="40" y="40" width="340" height="360" rx="22" fill="url(#body)" stroke="#ffffff1a" />
      {/* Eshik */}
      <rect x="62" y="64" width="232" height="312" rx="14" fill="#0c0c0e" stroke="#ffffff14" />
      <rect x="78" y="80" width="200" height="280" rx="10" fill="url(#glass)" />
      {/* Listlar va mahsulot */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 112 + i * 52;
        return (
          <g key={i}>
            <rect x="88" y={y} width="180" height="4" rx="2" fill="#d4d4d8" opacity=".55" />
            {[0, 1, 2, 3].map((j) => (
              <ellipse key={j} cx={110 + j * 45} cy={y - 9} rx="17" ry="9" fill="#e3a44a" opacity=".92" />
            ))}
          </g>
        );
      })}
      <rect x="78" y="80" width="70" height="280" rx="10" fill="url(#shine)" />
      {/* Dastak */}
      <rect x="282" y="150" width="8" height="140" rx="4" fill="#a1a1aa" />
      {/* Boshqaruv paneli */}
      <rect x="306" y="64" width="54" height="312" rx="12" fill="#0f0f11" stroke="#ffffff14" />
      <rect x="314" y="80" width="38" height="22" rx="5" fill="#111" stroke="#F5B30155" />
      <text x="333" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#F5B301" fontFamily="monospace">
        180°
      </text>
      {[136, 186, 236].map((cy) => (
        <g key={cy}>
          <circle cx="333" cy={cy} r="15" fill="#1d1e22" stroke="#ffffff22" />
          <rect x="331.5" y={cy - 12} width="3" height="9" rx="1.5" fill="#F5B301" />
        </g>
      ))}
      <circle cx="333" cy="290" r="5" fill="#34d399" />
      {/* Oyoqlar */}
      <rect x="64" y="400" width="18" height="26" rx="4" fill="#27272a" />
      <rect x="338" y="400" width="18" height="26" rx="4" fill="#27272a" />
      <ellipse cx="210" cy="430" rx="180" ry="9" fill="#000" opacity=".18" />
    </svg>
  );
}
