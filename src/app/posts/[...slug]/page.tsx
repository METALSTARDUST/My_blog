import type { Metadata } from "next";
import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import { CommandTabs } from "@/components/CommandTabs";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";

// Blocos ```pm viram abas pnpm/npm/yarn/bun: o conteúdo é só o que vem depois
// do prefixo (ex.: `shadcn@latest init`). Os demais blocos seguem normais.
function CodeBlock({ children }: { children?: ReactNode }) {
  const code = isValidElement<{ className?: string; children?: ReactNode }>(
    children,
  )
    ? children
    : null;
  if (code?.props.className?.includes("language-pm")) {
    return <CommandTabs args={String(code.props.children).trim()} />;
  }
  return <pre>{children}</pre>;
}

interface Props {
  params: { slug: string[] };
}

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = (await getPosts()).find(
    (item) => item.slug === params.slug.join("/"),
  );
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: Props) {
  const post = (await getPosts()).find(
    (item) => item.slug === params.slug.join("/"),
  );
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-3xl py-14">
      <Link href="/#diario" className="text-sm text-sonic-cyan">
        ← Voltar ao diário
      </Link>
      <header className="mb-10 mt-10 border-b border-dark-border pb-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-sonic-cyan">
          {post.category}
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-dark-muted">
          {post.summary}
        </p>
        <p className="mt-6 text-sm text-dark-muted">
          Metal · <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {post.readingMinutes} min de leitura
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-sonic-cyan">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </header>
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]} components={{ pre: CodeBlock }}>
          {post.content}
        </Markdown>
      </div>
      {post.source ? (
        <section
          aria-label="Origem do aprendizado"
          className="mt-10 text-sm text-dark-muted"
        >
          <h2 className="mb-2 font-semibold text-dark-text">
            Origem do aprendizado
          </h2>
          {post.source.url ? (
            <a
              href={post.source.url}
              className="text-sonic-cyan underline underline-offset-4"
            >
              {post.source.name}
            </a>
          ) : (
            <p>{post.source.name}</p>
          )}
        </section>
      ) : null}
      <footer className="mt-12 border-t border-dark-border pt-6 font-mono text-sm text-dark-muted">
        Save point registrado. Até a próxima fase.
      </footer>
    </article>
  );
}
