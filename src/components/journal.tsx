"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/site";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import { journalFilters, matchesPost } from "@/lib/journal-search";

// Dicas que aparecem ao passar o mouse (ou focar) no filtro da categoria.
const CATEGORY_HINTS: Record<string, string> = {
  shadcn: "shadcn traduzido para pt-BR",
};

export function Journal({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todos");
  const visible = posts.filter((post) => matchesPost(post, query, category));
  const filters = journalFilters(posts, CATEGORIES);

  const groups = new Map<string, Post[]>();
  for (const post of visible) {
    const month = post.date.slice(0, 7);
    const group = groups.get(month);
    if (group) group.push(post);
    else groups.set(month, [post]);
  }

  return (
    <section id="diario" className="scroll-mt-8 pb-16 pt-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-sonic-cyan">
            {"// Diário de bordo"}
          </p>
          <h2 className="text-[26px] font-medium tracking-tight">
            Uma fase de cada vez.
          </h2>
          <p className="mt-3 text-sm text-dark-muted">
            Aprendizados, experimentos e notas para o meu eu do futuro.
          </p>
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-dark-border bg-dark-card px-3 py-2 focus-within:border-sonic-cyan">
          <Search size={16} className="text-dark-muted" />
          <span className="sr-only">Buscar por aprendizado ou data</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Buscar por texto ou data..."
            className="w-full bg-transparent text-sm sm:w-56"
          />
        </label>
      </div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Filtrar por assunto ou origem"
      >
        {[{ value: "todos", label: "Todos" }, ...filters].map(
          ({ value: item, label }) => {
            const hint = CATEGORY_HINTS[item];
            return (
              <div key={item} className="group relative">
                <button
                  type="button"
                  aria-pressed={category === item}
                  aria-describedby={hint ? `dica-${item}` : undefined}
                  onClick={() => setCategory(item)}
                  className={`rounded-md border px-3 py-2 text-xs capitalize transition-colors ${category === item ? "border-sonic-blue bg-accent-selected text-dark-text" : "border-dark-border text-dark-muted hover:border-sonic-cyan/40 hover:text-dark-text"}`}
                >
                  {label}
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
          },
        )}
      </div>
      <p role="status" className="mb-4 font-mono text-xs text-dark-muted">
        {visible.length}{" "}
        {visible.length === 1 ? "registro encontrado" : "registros encontrados"}
      </p>
      <div className="space-y-8">
        {Array.from(groups, ([month, monthPosts]) => (
          <section key={month} aria-labelledby={`month-${month}`}>
            <h3
              id={`month-${month}`}
              className="mb-3 flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-mist"
            >
              {new Intl.DateTimeFormat("pt-BR", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(month + "-01T00:00:00Z"))}
              <span
                className="h-px flex-1 bg-gradient-to-r from-dark-border to-transparent"
                aria-hidden
              />
            </h3>
            {monthPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}/`}
                className="group -mx-2 grid grid-cols-[40px_minmax(0,1fr)_16px] gap-3 rounded-lg px-2 py-5 transition-colors hover:bg-dark-text/5 sm:-mx-4 sm:grid-cols-[64px_minmax(0,1fr)_16px] sm:gap-6 sm:px-4"
              >
                <time
                  dateTime={post.date}
                  aria-label={formatDate(post.date)}
                  className="flex flex-col gap-1 font-mono"
                >
                  <span className="text-2xl leading-none text-sand">
                    {post.date.slice(8)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-mist">
                    {new Intl.DateTimeFormat("pt-BR", {
                      weekday: "short",
                      timeZone: "UTC",
                    }).format(new Date(post.date + "T00:00:00Z"))}
                  </span>
                </time>
                <article className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-[11px]">
                    <span className="text-sonic-blue">{post.category}</span>
                    <span className="text-mist">
                      · {post.readingMinutes} min
                    </span>
                  </div>
                  <h4 className="text-[19px] font-medium leading-tight tracking-tight group-hover:text-accent-soft">
                    {post.title}
                  </h4>
                  <p className="mb-3 mt-2 max-w-2xl text-sm leading-relaxed text-dark-muted">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-mist">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </article>
                <ArrowUpRight
                  size={16}
                  className="text-mist group-hover:text-sonic-blue"
                  aria-hidden
                />
              </Link>
            ))}
          </section>
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
