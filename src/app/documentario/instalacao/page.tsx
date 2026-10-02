import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import * as simpleIcons from "simple-icons";
import { CommandTabs } from "@/components/CommandTabs";
import {
  componentsPath,
  createUrl,
  installationDocs,
  installFrameworks,
} from "@/lib/documentario";

export const metadata: Metadata = {
  title: "Instalação — Primeiro documentário",
  description:
    "Como instalar as dependências e estruturar o seu aplicativo com shadcn/ui.",
};

const icons = simpleIcons as unknown as Record<string, { path: string }>;

const hiddenButton =
  "inline-block cursor-pointer list-none select-none py-2 text-xs text-dark-muted/70 underline-offset-4 hover:text-sonic-cyan hover:underline focus-visible:text-sonic-cyan";

const setupCards = [
  {
    id: "shadcn-create",
    title: "Use o shadcn/create",
    text: "Monte seu preset visualmente e gere um comando de configuração.",
  },
  {
    id: "cli",
    title: "Use a CLI",
    text: "Crie a estrutura de um template compatível direto pelo terminal.",
  },
  {
    id: "projeto-existente",
    title: "Projeto existente",
    text: "Adicione o shadcn/ui a um app que você já criou.",
  },
];

export default function InstallationPage() {
  return (
    <article className="relative mx-auto max-w-5xl pb-32 pt-14">
      <Link
        href={componentsPath}
        className="text-sm text-sonic-cyan hover:underline"
      >
        ← Componentes
      </Link>
      <header className="mb-10 mt-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-sonic-cyan">
          Primeiro documentário · Página 3
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Instalação
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-muted">
          Como instalar as dependências e estruturar o seu aplicativo.
        </p>
      </header>

      <section aria-labelledby="escolha-comeco" className="mb-12">
        <p id="escolha-comeco" className="mb-5 text-dark-muted">
          Escolha o caminho que combina com o seu ponto de partida.
        </p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {setupCards.map((card) => (
            <li key={card.id}>
              <a
                href={`#${card.id}`}
                className="block h-full rounded-2xl border border-dark-border bg-dark-card p-6 transition-colors hover:border-sonic-cyan/50 focus-visible:border-sonic-cyan/50"
              >
                <span className="block font-medium text-dark-text">
                  {card.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-dark-muted">
                  {card.text}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="como-comecar" className="mb-12 space-y-8">
        <h2 id="como-comecar" className="text-2xl font-semibold">
          Como começar
        </h2>

        <div id="shadcn-create" className="scroll-mt-8 space-y-3">
          <h3 className="text-lg font-semibold">
            Use o shadcn/create{" "}
            <span className="text-sm font-normal text-dark-muted">
              (recomendado para novos projetos)
            </span>
          </h3>
          <p className="max-w-2xl leading-relaxed text-dark-muted">
            Monte sua configuração visualmente e gere o comando de configuração
            correto para o seu framework.
          </p>
          <details>
            <summary className={hiddenButton}>
              Mas o que o shadcn/create faz de verdade?
            </summary>
            <div className="mt-2 max-w-2xl space-y-3 rounded-lg border border-dark-border bg-dark-card p-5 text-sm leading-relaxed text-dark-muted">
              <p>
                O{" "}
                <a href={createUrl} className="text-sonic-cyan underline">
                  shadcn/create
                </a>{" "}
                é só uma interface: você escolhe as opções, vê o resultado na
                prévia e ele monta, para o framework selecionado, o comando que
                roda a CLI do shadcn. Quem cria os arquivos no seu computador é
                essa CLI, não o site.
              </p>
              <p>
                Como usar: abra a página, monte a configuração, copie o comando
                gerado e cole no terminal, na pasta onde o projeto deve nascer.
                O formato é o mesmo da CLI abaixo:
              </p>
              <CommandTabs args="shadcn@latest init -t [framework]" />
            </div>
          </details>
        </div>

        <div id="cli" className="scroll-mt-8 space-y-3">
          <h3 className="text-lg font-semibold">Use a CLI</h3>
          <p className="max-w-2xl leading-relaxed text-dark-muted">
            Crie a estrutura inicial de um template compatível diretamente pelo
            terminal. Troque{" "}
            <code className="font-mono text-dark-text">[framework]</code> por{" "}
            <code className="font-mono text-dark-text">next</code>,{" "}
            <code className="font-mono text-dark-text">vite</code>,{" "}
            <code className="font-mono text-dark-text">start</code> (TanStack
            Start),{" "}
            <code className="font-mono text-dark-text">react-router</code> ou{" "}
            <code className="font-mono text-dark-text">astro</code>.
          </p>
          <CommandTabs args="shadcn@latest init -t [framework]" />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Laravel</h3>
          <p className="max-w-2xl leading-relaxed text-dark-muted">
            Primeiro crie o aplicativo com{" "}
            <code className="font-mono text-dark-text">laravel new</code> e
            depois execute o init dentro dele:
          </p>
          <CommandTabs args="shadcn@latest init" />
        </div>

        <div id="projeto-existente" className="scroll-mt-8 space-y-3">
          <h3 className="text-lg font-semibold">Projeto existente</h3>
          <p className="max-w-2xl leading-relaxed text-dark-muted">
            Cada guia de framework tem uma seção <em>existing project</em> com
            as etapas de configuração manual para aquele framework. Se o seu
            projeto ainda não tem shadcn, eu recomendo colocar. Se não tiver,
            joga no lixo também kakakaka.
          </p>
          <details>
            <summary className={hiddenButton}>
              Onde eu pego gráficos, ícones e afins?
            </summary>
            <p className="mt-2 max-w-2xl rounded-lg border border-dark-border bg-dark-card p-5 text-sm leading-relaxed text-dark-muted">
              No{" "}
              <a href={createUrl} className="text-sonic-cyan underline">
                ui.shadcn.com/create
              </a>{" "}
              é onde eu pego os gráficos, os ícones e as demais opções visuais
              para montar a configuração do projeto.
            </p>
          </details>
        </div>
      </section>

      <section aria-labelledby="escolha-framework" className="mb-12">
        <h2 id="escolha-framework" className="mb-2 text-2xl font-semibold">
          Escolha seu framework
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-dark-muted">
          Disponível para Next.js, Vite, Laravel, React Router, Astro e TanStack
          Start. Para o Laravel, comece com{" "}
          <code className="font-mono text-dark-text">laravel new</code>.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {installFrameworks.map((framework) => (
            <li key={framework.name}>
              <a
                href={`${installationDocs}/${framework.guide}`}
                className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dark-border bg-dark-card px-6 py-9 text-dark-muted transition-colors hover:border-sonic-cyan/50 hover:text-sonic-cyan focus-visible:border-sonic-cyan/50 focus-visible:text-sonic-cyan"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="44"
                  height="44"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={icons[framework.icon].path} />
                </svg>
                <span className="font-medium">{framework.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-dark-border pt-6 text-sm text-dark-muted">
        <h2 className="mb-3 font-semibold text-dark-text">Referências</h2>
        <a href={installationDocs} className="text-sonic-cyan underline">
          Documentação do shadcn/ui — Instalação
        </a>
      </footer>

      <Image
        src="/images/metal-sonic-chibi.png"
        alt=""
        width={463}
        height={546}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-0 h-auto w-20 sm:w-28"
      />
    </article>
  );
}
