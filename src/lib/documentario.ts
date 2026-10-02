import entries from "../../content/documentario/componentes.json";

export const documentaryIntroduction =
  "/posts/pessoal/2026-10-02-primeiro-documentario/";
export const componentsPath = "/documentario/componentes/";
export const componentsSource = "https://ui.shadcn.com/docs/components";

export const documentaryComponents = entries.map((entry) => ({
  ...entry,
  slug: entry.name.toLowerCase().replaceAll(" ", "-"),
}));
