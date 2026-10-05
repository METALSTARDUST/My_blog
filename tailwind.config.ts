import type { Config } from "tailwindcss";

const config: Config = {
  // O <html> sempre tem a classe "dark" (veja layout.tsx); não existe toggle.
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: { site: "1040px" },
      colors: {
        dark: {
          bg: "#000000",
          card: "#14101C",
          border: "#352840",
          text: "#F2EDF7",
          muted: "#BEB3CA",
        },
        sonic: { blue: "#B56BFF", cyan: "#B56BFF" },
        accent: {
          soft: "#D9B4FF",
          deep: "#280D43",
          selected: "#6D28B5",
        },
        sand: "#CDCB9E",
        mist: "#B9A0D0",
      },
    },
  },
  plugins: [],
};

export default config;
