import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B", // asosiy fon (qora)
        graphite: "#121214", // ikkinchi darajali fon
        steel: "#1A1B1E", // kartochkalar
        amber: {
          DEFAULT: "#F5B301", // aksent
          300: "#FFC933",
          600: "#D99A00",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 32px -14px rgba(0,0,0,.65)",
        glow: "0 10px 30px -10px rgba(245,179,1,.45)",
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
