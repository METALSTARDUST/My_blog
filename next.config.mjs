// No GitHub Pages o site mora em /My_blog (nome do repositório).
// O workflow define NEXT_PUBLIC_BASE_PATH; localmente fica vazio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera HTML estático na pasta `out/`, que é o que o GitHub Pages serve.
  output: "export",
  basePath,
  // O otimizador de imagens precisa de servidor, que o Pages não tem.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
