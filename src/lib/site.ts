// Constantes do site usadas em mais de um lugar.

export const SITE_NAME = "Metal's Blog";

export const REPO_URL = "https://github.com/METALSTARDUST/My_blog";

// Mesmas pastas de `content/posts/`.
export const CATEGORIES = [
  "typescript",
  "python",
  "react",
  "sql",
  "agropilot",
  "pessoal",
  "shadcn",
] as const;

export type Category = (typeof CATEGORIES)[number];
