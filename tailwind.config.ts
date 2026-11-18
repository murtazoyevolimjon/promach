import type { Config } from "tailwindcss";

/**
 * Ranglar CSS o'zgaruvchilari orqali beriladi (src/app/globals.css):
 *   :root  — kunduzgi (iliq qaymoqrang) rejim
 *   .dark  — tungi (to'q industrial) rejim
 * Shu sababli komponentlarda `bg-page`, `text-fg` kabi semantik klasslar ishlatiladi
 * va ikkala rejimda ham avtomatik to'g'ri rang chiqadi.
 */
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: v("page"), // sahifa foni
        surface: v("surface"), // navbatma-navbat keladigan bo'lim foni
        card: v("card"), // kartochkalar (glass effekt uchun /70 bilan)
        fg: v("fg"), // asosiy matn
        muted: v("muted"), // ikkinchi darajali matn
        subtle: v("subtle"), // izoh, kichik matn
        line: v("line"), // chegaralar
        brand: v("brand"), // aksent rangdagi MATN va ikonkalar (kontrast uchun)
        accent: {
          DEFAULT: v("accent"), // #F59E0B — tugmalar, belgilar
          hover: v("accent-hover"),
          fg: v("accent-fg"), // aksent fon ustidagi matn
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
