import { Github } from "lucide-react";
import { REPO_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-dark-border/40">
      <div className="mx-auto flex w-full max-w-site flex-col gap-4 px-5 py-8 font-mono text-xs text-dark-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          Feito por <span className="text-sonic-cyan">Metal</span> (Caio Lima da
          Silva) com ajuda de IA.
        </p>
        <a
          href={REPO_URL}
          className="inline-flex items-center gap-1 hover:text-sonic-blue"
        >
          <Github size={16} aria-hidden /> Código no GitHub
        </a>
      </div>
    </footer>
  );
}
