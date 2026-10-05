import Link from "next/link";
import { Github } from "lucide-react";

import { REPO_URL } from "@/lib/site";

export function Header() {
  return (
    <header>
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-5 px-5 py-6 sm:px-8"
      >
        <Link
          href="/"
          aria-label="Metal — início"
          className="flex items-center gap-3"
        >
          <span className="text-[17px] font-medium tracking-tight">
            Metal&apos;s Blog
          </span>
        </Link>
        <div className="flex gap-6 text-sm text-dark-muted">
          <Link href="/#diario" className="hover:text-sonic-cyan">
            Diário
          </Link>
          <Link href="/projetos/" className="hover:text-sonic-cyan">
            Projetos
          </Link>
          <Link href="/sobre/" className="hover:text-sonic-cyan">
            Sobre
          </Link>
          <a
            href={REPO_URL}
            aria-label="GitHub"
            className="hover:text-sonic-blue"
          >
            <Github size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}
