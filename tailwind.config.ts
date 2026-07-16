import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // MACH design language: sharp corners everywhere (circles still allowed).
    borderRadius: {
      none: "0",
      sm: "0",
      DEFAULT: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "9999px",
    },
    extend: {
      colors: {
        // Volt accent from the MACH store design
        brand: {
          50: "#FAFFE0",
          100: "#F2FFB8",
          200: "#E8FF80",
          300: "#DDFF42",
          400: "#D4FF1A",
          light: "#DDFF42",
          DEFAULT: "#CCFF00",
          500: "#CCFF00",
          dark: "#A8D400",
          600: "#A8D400",
          700: "#7EA000",
          900: "#3F5000",
        },
        ink: "#0A0A0A",
        panel: "#121212",
        line: "#1F1F1F",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(204,255,0,0.4), 0 12px 40px -10px rgba(204,255,0,0.35)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
