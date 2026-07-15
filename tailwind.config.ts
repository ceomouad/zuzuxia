import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zu Zu Xia electric blue (from the leaping-athlete logo)
        brand: {
          50: "#EAF6FE",
          100: "#D0EBFD",
          200: "#A6D8FB",
          300: "#6FBEF8",
          400: "#3BA4F4",
          light: "#3BA4F4",
          DEFAULT: "#0E90EC",
          500: "#0E90EC",
          dark: "#0A6FBE",
          600: "#0A6FBE",
          700: "#0A5896",
          900: "#0A3A63",
        },
        ink: "#0A0A0B",
        cloud: "#F5F7FA",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(10,20,40,0.18)",
        glow: "0 0 0 1px rgba(14,144,236,0.35), 0 14px 42px -10px rgba(14,144,236,0.55)",
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
