import entries from "../../content/documentario/componentes.json";

export const documentaryIntroduction =
  "/posts/shadcn/2026-10-02-primeiro-documentario/";
export const componentsPath = "/documentario/componentes/";
export const componentsSource = "https://ui.shadcn.com/docs/components";
export const installationPath = "/documentario/instalacao/";
export const createUrl = "https://ui.shadcn.com/create";
export const installationDocs = "https://ui.shadcn.com/docs/installation";

// `guide` é o final da URL do guia em ui.shadcn.com/docs/installation/.
export const installFrameworks = [
  { name: "Next.js", icon: "siNextdotjs", guide: "next" },
  { name: "Vite", icon: "siVite", guide: "vite" },
  { name: "TanStack Start", icon: "siTanstack", guide: "tanstack" },
  { name: "Laravel", icon: "siLaravel", guide: "laravel" },
  { name: "React Router", icon: "siReactrouter", guide: "react-router" },
  { name: "Astro", icon: "siAstro", guide: "astro" },
  { name: "Manual", icon: "siReact", guide: "manual" },
] as const;

export const documentaryComponents = entries.map((entry) => ({
  ...entry,
  slug: entry.name.toLowerCase().replaceAll(" ", "-"),
}));
