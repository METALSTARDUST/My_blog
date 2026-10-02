"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Terminal } from "lucide-react";

const MANAGERS = [
  { name: "pnpm", prefix: "pnpm dlx" },
  { name: "npm", prefix: "npx" },
  { name: "yarn", prefix: "yarn dlx" },
  { name: "bun", prefix: "bunx --bun" },
] as const;

const STORAGE_KEY = "gerenciador-de-pacotes";

// A escolha vale para todos os blocos da página (e das próximas visitas),
// para quem lê não se perder ao trocar de gerenciador em um deles.
const listeners = new Set<() => void>();
let selected = 0;
let loaded = false;

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(saved) && saved >= 0 && saved < MANAGERS.length) {
      selected = saved;
    }
  } catch {
    // Sem localStorage: a escolha vale só até recarregar a página.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function select(index: number) {
  selected = index;
  try {
    localStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    // Ver `load`.
  }
  listeners.forEach((listener) => listener());
}

function useSelected() {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return selected;
    },
    () => 0,
  );
}

export function CommandTabs({ args }: { args: string }) {
  const active = useSelected();
  const [copied, setCopied] = useState(false);
  const command = `${MANAGERS[active].prefix} ${args}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Sem permissão de clipboard: o comando continua selecionável na tela.
    }
  }

  return (
    <div className="command-tabs overflow-hidden rounded-xl border border-dark-border bg-dark-card">
      <div className="flex items-center gap-2 px-4 pt-3">
        <span className="rounded-md bg-dark-border p-1.5 text-dark-muted">
          <Terminal size={14} aria-hidden="true" />
        </span>
        <div
          role="tablist"
          aria-label="Gerenciador de pacotes"
          className="flex items-center gap-1"
        >
          {MANAGERS.map((manager, index) => (
            <button
              key={manager.name}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => select(index)}
              className={`rounded-md border px-3 py-1.5 font-mono text-sm ${
                index === active
                  ? "border-dark-border bg-dark-bg text-dark-text"
                  : "border-transparent text-dark-muted hover:text-dark-text"
              }`}
            >
              {manager.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Comando copiado" : "Copiar comando"}
          className="ml-auto p-2 text-dark-muted hover:text-sonic-cyan"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 pb-5 pt-4 font-mono text-sm text-dark-text">
        <code>{command}</code>
      </pre>
    </div>
  );
}
