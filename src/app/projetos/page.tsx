import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Projetos" };
const projects = [
  {
    name: "AgroPilot / Dusty",
    description:
      "SaaS agrícola. Um espaço no diário para registrar os aprendizados de desenvolvimento do projeto.",
  },
  {
    name: "QRChamada",
    description:
      "Um dos meus projetos. Vou documentar por aqui as decisões, os desafios e a evolução.",
  },
  {
    name: "MetalBot",
    description:
      "Meu lado Metal também nos projetos. Os registros de construção vão ganhar espaço neste diário.",
  },
  {
    name: "Automações VGR",
    description:
      "Aprendizados com Python e automações no dia a dia de desenvolvimento na VGR Gestão Contábil.",
  },
];
export default function ProjectsPage() {
  return (
    <section className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-sonic-cyan">
        {"// Laboratório do Metal"}
      </p>
      <h1 className="mt-4 text-4xl font-bold">Ideias em construção.</h1>
      <p className="mb-10 mt-4 text-dark-muted">
        Os projetos que fazem parte da minha jornada. Os bastidores vão para o
        diário.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="rounded-xl border border-dark-border bg-dark-card p-7"
          >
            <p className="mb-6 font-mono text-xs text-sonic-cyan">
              PROJETO / 0{index + 1}
            </p>
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-dark-muted">
              {project.description}
            </p>
          </article>
        ))}
      </div>
      <Link
        href="/#diario"
        className="mt-10 inline-block text-sm text-sonic-cyan"
      >
        Explorar o diário →
      </Link>
    </section>
  );
}
