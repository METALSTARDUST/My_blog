// Na Cloudflare o site mora na raiz, então o caminho base fica vazio.
// Só defina NEXT_PUBLIC_BASE_PATH se um dia hospedar em um subcaminho.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera HTML estático na pasta `out/`, que a Cloudflare serve como assets estáticos.
  output: "export",
  basePath,
  // O otimizador de imagens precisa de servidor, que a hospedagem estática não tem.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
