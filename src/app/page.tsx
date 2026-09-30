import { CATEGORIES } from "@/lib/site";

// Home provisória da Peça 1: a listagem de posts chega na Peça 2.
export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Bem-vindo ao <span className="text-sonic-cyan">blog do Metal</span>
      </h1>
      <p className="text-dark-muted">
        Aqui eu registro tudo que aprendo no dia a dia como dev: código, dicas,
        erros, projetos e reflexões. Tudo feito com ajuda de IA: eu descrevo e
        reviso.
      </p>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Categorias</h2>
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <li
              key={category}
              className="rounded-full border border-dark-border bg-dark-card px-3 py-1 text-sm text-sonic-blue"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
