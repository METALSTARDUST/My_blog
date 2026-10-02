import type { Metadata } from "next";
import Link from "next/link";
import {
  componentsPath,
  componentsSource,
  documentaryComponents,
  documentaryIntroduction,
  installationPath,
} from "@/lib/documentario";

export const metadata: Metadata = {
  title: "Componentes — Primeiro documentário",
  description:
    "Conheça os componentes reunidos no primeiro documentário do Metal.",
};

export default function ComponentsPage() {
  const sections = [
    {
      id: "novos-componentes",
      title: "Novos componentes",
      entries: documentaryComponents.filter((entry) => entry.isNew),
    },
    {
      id: "todos-os-componentes",
      title: "Todos os componentes",
      entries: documentaryComponents,
    },
  ];

  return (
    <article className="mx-auto max-w-5xl py-14">
      <Link
        href={documentaryIntroduction}
        className="text-sm text-sonic-cyan hover:underline"
      >
        ← Introdução do documentário
      </Link>
      <header className="mb-10 mt-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-sonic-cyan">
          Primeiro documentário · Página 2
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Componentes
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-muted">
          Aqui você encontra todos os componentes disponíveis na biblioteca.
          Estamos trabalhando para adicionar mais componentes.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-dark-muted">
          Este é o catálogo de estudos do meu documentário, com os componentes
          do shadcn/ui que reuni até aqui. Selecione um nome para ler sua
          descrição.
        </p>
      </header>
      <nav
        aria-label="Nesta página"
        className="mb-10 flex flex-wrap gap-6 text-sm text-sonic-cyan"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="hover:underline"
          >
            {section.title}
          </a>
        ))}
      </nav>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-titulo`}
          className="mb-12 scroll-mt-8"
        >
          <h2
            id={`${section.id}-titulo`}
            className="mb-6 text-2xl font-semibold"
          >
            {section.title}
          </h2>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {section.entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`${componentsPath}${entry.slug}/`}
                  className="inline-block py-3 font-medium text-dark-text underline-offset-4 hover:text-sonic-cyan hover:underline focus-visible:text-sonic-cyan focus-visible:underline"
                >
                  {entry.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mb-10">
        <Link
          href={installationPath}
          className="text-sonic-cyan hover:underline"
        >
          Próxima página: Instalação →
        </Link>
      </p>
      <footer className="border-t border-dark-border pt-6 text-sm text-dark-muted">
        <h2 className="mb-3 font-semibold text-dark-text">Referências</h2>
        <a href={componentsSource} className="text-sonic-cyan underline">
          Documentação do shadcn/ui — Componentes
        </a>
      </footer>
    </article>
  );
}
