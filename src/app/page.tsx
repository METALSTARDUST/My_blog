import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { Journal } from "@/components/journal";

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <>
      <section className="grid items-center gap-8 py-12 md:grid-cols-[1.3fr_1fr] md:py-14">
        <div>
          <h1 className="text-4xl font-medium leading-[1.06] tracking-tight sm:text-[56px]">
            Código, café.
            <br />E mais uma <span className="text-sonic-blue">fase.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-dark-muted">
            Eu sou o Metal. Este é meu save point: o que aprendo, o que construo
            e os bugs que encontro pelo caminho.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-wide text-mist">
            DEV NA VGR / ADS NA UNIDERP / CAMPO GRANDE, MS
          </p>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/metal-sonic.jpeg`}
          alt="Metal Sonic em tons de ciano, personagem favorito do Metal"
          width={736}
          height={413}
          priority
          className="hero-mascot mx-auto aspect-[4/3] w-full max-w-sm rounded-xl object-cover object-[40%_30%]"
        />
      </section>
      <Journal posts={posts} />
      <section className="mb-10 flex flex-col justify-between gap-6 rounded-lg bg-accent-deep px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 font-mono text-[11px] tracking-widest text-accent-soft">
            BUILD IN PUBLIC
          </p>
          <h2 className="text-[22px] font-medium">
            Aprender também é mostrar o processo.
          </h2>
          <p className="mt-2 text-sm text-dark-text/75">
            AgroPilot, automações e ideias que saem do papel.
          </p>
        </div>
        <Link
          href="/projetos/"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-accent-soft px-4 py-2 text-sm text-accent-soft hover:bg-sonic-blue/10 sm:self-auto"
        >
          Ver projetos <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
