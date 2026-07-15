import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zu Zu Xia electric blue — sampled from the leaping-athlete logo disc
        brand: {
          50: "#E8F5FF",
          100: "#CDE9FF",
          200: "#9CD3FF",
          300: "#5FB6FF",
          400: "#2AA0FF",
          light: "#2AA0FF",
          DEFAULT: "#0A8EF0",
          500: "#0A8EF0",
          dark: "#0A6BC4",
          600: "#0A6BC4",
          700: "#0A5399",
          900: "#0A3767",
        },
        ink: "#080A0F",
        paper: "#F4F5F2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(8,20,40,0.16)",
        glow: "0 0 0 1px rgba(10,142,240,0.35), 0 14px 42px -10px rgba(10,142,240,0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
