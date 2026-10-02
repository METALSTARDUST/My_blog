"use client";

import { useState } from "react";

const MANAGERS = [
  { name: "pnpm", prefix: "pnpm dlx" },
  { name: "npm", prefix: "npx" },
  { name: "yarn", prefix: "yarn dlx" },
  { name: "bun", prefix: "bunx --bun" },
] as const;

export function CommandTabs({ args }: { args: string }) {
  const [active, setActive] = useState(0);
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
    <div className="overflow-hidden rounded-lg border border-dark-border bg-dark-card">
      <div
        role="tablist"
        aria-label="Gerenciador de pacotes"
        className="flex items-center gap-1 border-b border-dark-border px-2 pt-2"
      >
        {MANAGERS.map((manager, index) => (
          <button
            key={manager.name}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`rounded-t-md px-3 py-2 font-mono text-xs ${
              index === active
                ? "bg-dark-bg text-sonic-cyan"
                : "text-dark-muted hover:text-dark-text"
            }`}
          >
            {manager.name}
          </button>
        ))}
        <button
          type="button"
          onClick={copy}
          className="ml-auto px-3 py-2 text-xs text-dark-muted hover:text-sonic-cyan"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm text-dark-text">
        <code>{command}</code>
      </pre>
    </div>
  );
}
