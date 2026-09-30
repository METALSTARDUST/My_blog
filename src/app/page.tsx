import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Code2, Terminal } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { Journal } from "@/components/journal";

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <>
      <section className="hero-grid grid items-center gap-12 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
        <div>
          <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-sonic-cyan">
            <span className="h-2 w-2 rounded-full bg-sonic-cyan" /> Player 01 ·
            sempre aprendendo
          </p>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
            Código, café.
            <br />E mais uma <span className="text-sonic-cyan">fase.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-dark-muted">
            Eu sou o Metal. Este é meu save point: o que aprendo, o que construo
            e os bugs que encontro pelo caminho.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#diario"
              className="inline-flex items-center gap-3 rounded-lg bg-sonic-cyan px-5 py-3 text-sm font-semibold text-dark-bg"
            >
              Explorar o diário <ArrowDown size={16} />
            </Link>
            <Link
              href="/sobre/"
              className="inline-flex items-center gap-3 rounded-lg border border-dark-border px-5 py-3 text-sm hover:border-sonic-cyan"
            >
              Conheça o player <ArrowUpRight size={16} />
            </Link>
          </div>
          <p className="mt-8 font-mono text-xs text-dark-muted">
            DEV NA VGR / ADS NA UNIDERP / CAMPO GRANDE, MS
          </p>
        </div>
        <div
          className="relative mx-auto w-full max-w-sm"
          aria-label="Terminal decorativo inspirado no Metal Sonic"
        >
          <div
            className="absolute inset-8 rounded-full bg-sonic-blue/20 blur-3xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl border border-dark-border bg-dark-card/90 shadow-2xl">
            <div className="flex items-center justify-between border-b border-dark-border px-5 py-4 font-mono text-xs text-dark-muted">
              <span className="flex items-center gap-2">
                <Terminal size={14} /> metal@stardust
              </span>
              <span>● ● ●</span>
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/metal-sonic.jpeg`}
              alt="Metal Sonic em tons de ciano, personagem favorito do Metal"
              width={736}
              height={413}
              priority
              className="h-56 w-full object-cover"
            />
            <div className="space-y-3 border-t border-dark-border p-6 font-mono text-xs">
              <p>
                <span className="text-sonic-cyan">$</span> iniciar jornada
              </p>
              <p className="text-dark-muted">
                identidade{" "}
                <span className="float-right text-dark-text">METAL</span>
              </p>
              <p className="text-dark-muted">
                missão{" "}
                <span className="float-right text-dark-text">
                  aprender → construir
                </span>
              </p>
              <p className="text-sonic-cyan">▸ próximo nível em construção_</p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-dark-border py-5 font-mono text-xs text-dark-muted">
        <Code2 size={16} className="text-sonic-cyan" />
        <span>TypeScript</span>
        <span>Python</span>
        <span>React</span>
        <span>PostgreSQL</span>
        <span>FastAPI</span>
        <span>Fastify</span>
      </div>
      <Journal posts={posts} />
      <section className="mb-16 flex flex-col justify-between gap-6 rounded-xl border border-dark-border bg-dark-card p-7 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 font-mono text-xs text-sonic-cyan">
            BUILD IN PUBLIC
          </p>
          <h2 className="text-xl font-semibold">
            Aprender também é mostrar o processo.
          </h2>
          <p className="mt-2 text-sm text-dark-muted">
            AgroPilot, automações e ideias que saem do papel.
          </p>
        </div>
        <Link
          href="/projetos/"
          className="inline-flex shrink-0 items-center gap-2 text-sm text-sonic-cyan"
        >
          Ver projetos <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
