import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Metal's Blog",
    template: "%s | Metal's Blog",
  },
  description:
    "Diário de aprendizados do Metal: código, dicas, erros, projetos e reflexões.",
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // A classe "dark" fica fixa no <html>: o blog não tem toggle de tema.
    <html lang="pt-BR" className="dark">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
