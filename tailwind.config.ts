import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors – replace with D36 palette
        brand: {
          primary: "#f5f5f5",
          accent: "#f97316"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        univers: ["var(--font-univers)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

