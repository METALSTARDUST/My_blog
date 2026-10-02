"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/site";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/date";

// Dicas que aparecem ao passar o mouse (ou focar) no filtro da categoria.
const CATEGORY_HINTS: Record<string, string> = {
  shadcn: "shadcn traduzido para pt-BR",
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function Journal({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todos");
  const words = normalize(query).trim().split(/\s+/);
  const visible = posts.filter(
    (post) =>
      (category === "todos" || post.category === category) &&
      words.every((word) =>
        normalize(
          [post.title, post.summary, post.content, ...post.tags].join(" "),
        ).includes(word),
      ),
  );

  return (
    <section id="diario" className="scroll-mt-8 py-16">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-sonic-cyan">
            {"// Diário de bordo"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Uma fase de cada vez.
          </h2>
          <p className="mt-3 text-sm text-dark-muted">
            Aprendizados, experimentos e notas para o meu eu do futuro.
          </p>
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-dark-border bg-dark-card px-3 py-3 focus-within:border-sonic-cyan">
          <Search size={16} className="text-dark-muted" />
          <span className="sr-only">Buscar no diário</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Buscar um aprendizado..."
            className="w-full bg-transparent text-sm sm:w-52"
          />
        </label>
      </div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Filtrar por categoria"
      >
        {["todos", ...CATEGORIES].map((item) => {
          const hint = CATEGORY_HINTS[item];
          return (
            <div key={item} className="group relative">
              <button
                type="button"
                aria-pressed={category === item}
                aria-describedby={hint ? `dica-${item}` : undefined}
                onClick={() => setCategory(item)}
                className={`rounded-md border px-3 py-2 text-xs capitalize transition-colors ${category === item ? "border-sonic-cyan/40 bg-sonic-cyan/10 text-sonic-cyan" : "border-dark-border text-dark-muted hover:border-sonic-cyan/40 hover:text-dark-text"}`}
              >
                {item}
              </button>
              {hint ? (
                <span
                  id={`dica-${item}`}
                  role="tooltip"
                  className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden whitespace-nowrap rounded-md border border-dark-border bg-dark-card px-3 py-2 text-xs text-dark-text group-focus-within:block group-hover:block"
                >
                  {hint}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <p role="status" className="mb-4 font-mono text-xs text-dark-muted">
        {visible.length}{" "}
        {visible.length === 1 ? "registro encontrado" : "registros encontrados"}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}/`}
            className="group rounded-xl border border-dark-border bg-dark-card/60 p-6 transition-colors hover:border-sonic-cyan/50"
          >
            <article>
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-sonic-cyan">
                  {post.category}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-dark-muted group-hover:text-sonic-cyan"
                />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">
                {post.title}
              </h3>
              <p className="mb-6 mt-3 text-sm leading-relaxed text-dark-muted">
                {post.summary}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-dark-muted">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 border-t border-dark-border pt-4 font-mono text-xs text-dark-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>· {post.readingMinutes} min de leitura</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-dark-border p-10 text-center">
          <h3 className="font-semibold">Nenhum registro por aqui ainda.</h3>
          <p className="mt-2 text-sm text-dark-muted">
            Tente outra busca ou categoria. A próxima fase ainda vai chegar.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("todos");
            }}
            className="mt-5 text-sm text-sonic-cyan"
          >
            Limpar filtros
          </button>
        </div>
      ) : null}
    </section>
  );
}
