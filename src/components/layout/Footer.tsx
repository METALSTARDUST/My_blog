import { Github } from "lucide-react";
import { REPO_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-card">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4 py-6 text-sm text-dark-muted sm:flex-row sm:items-center sm:justify-between">
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
