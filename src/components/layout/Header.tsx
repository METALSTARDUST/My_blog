import Link from "next/link";
import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-dark-border">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-6 sm:px-8"
      >
        <Link
          href="/"
          aria-label="Metal — início"
          className="flex items-center gap-3"
        >
          <span className="rounded-lg border border-sonic-cyan/30 bg-sonic-cyan/10 p-2 text-sonic-cyan">
            <Zap size={21} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            metal<span className="text-sonic-cyan">.log</span>
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
        </div>
      </nav>
    </header>
  );
}
