import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  componentsPath,
  componentsSource,
  documentaryComponents,
} from "@/lib/documentario";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return documentaryComponents.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = documentaryComponents.find((item) => item.slug === params.slug);
  return entry
    ? { title: `${entry.name} — Componentes`, description: entry.description }
    : {};
}

export default function ComponentPage({ params }: Props) {
  const entry = documentaryComponents.find((item) => item.slug === params.slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-3xl py-14">
      <Link
        href={componentsPath}
        className="text-sm text-sonic-cyan hover:underline"
      >
        ← Todos os componentes
      </Link>
      <header className="mb-8 mt-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-sonic-cyan">
          Primeiro documentário · Componentes
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {entry.name}
        </h1>
      </header>
      <p className="text-lg leading-relaxed text-dark-muted">
        {entry.description}
      </p>
      <footer className="mt-12 border-t border-dark-border pt-6 text-sm text-dark-muted">
        <h2 className="mb-3 font-semibold text-dark-text">Referências</h2>
        <a href={componentsSource} className="text-sonic-cyan underline">
          Documentação do shadcn/ui — Componentes
        </a>
      </footer>
    </article>
  );
}
