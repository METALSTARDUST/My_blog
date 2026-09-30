import type { Config } from "tailwindcss";

const config: Config = {
  // O <html> sempre tem a classe "dark" (veja layout.tsx); não existe toggle.
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Paleta do Metal: fundo escuro + azul/ciano do Sonic e do Metal Sonic.
        dark: {
          bg: "#0a0e14", // fundo principal (preto azulado)
          card: "#111822", // cards e header
          border: "#1c2736", // bordas
          text: "#e5edf5", // texto principal
          muted: "#8b9bb0", // texto secundário
        },
        sonic: {
          blue: "#2f6bff", // azul do Sonic
          cyan: "#22e5d4", // ciano do Metal Sonic
        },
      },
    },
  },
  plugins: [],
};

export default config;
