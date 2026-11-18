import { ImageResponse } from "next/og";

/**
 * Open Graph rasmi (Telegram/Instagram/Facebook'da havola ulashilganda ko'rinadi).
 * Avtomatik yaratiladi. Xohlasangiz o'rniga public/og.jpg (1200×630) qo'yib,
 * layout.tsx dagi openGraph.images ga yo'lini yozing.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PROMACH — professional pechlar va oshxona jihozlari";

export function generateStaticParams() {
  return [{ lang: "uz" }, { lang: "ru" }];
}

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 80% 10%, #3a2a00 0%, #0A0A0B 55%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              border: "14px solid #F5B301",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: 8 }}>PROMACH</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 44, color: "#F5B301", fontWeight: 700 }}>
          Bakery · Pastry · Restaurant equipment
        </div>
        <div style={{ marginTop: 20, fontSize: 34, color: "#d4d4d8" }}>Samarqand · promach.uz · 10:00–19:00</div>
      </div>
    ),
    size
  );
}
