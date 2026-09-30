import type { Metadata } from "next";
export const metadata: Metadata = { title: "Sobre o Metal" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-sonic-cyan">
        {"// Conheça o player"}
      </p>
      <h1 className="mb-10 mt-4 text-5xl font-bold">
        Caio no nome.
        <br />
        <span className="text-sonic-cyan">Metal na essência.</span>
      </h1>
      <div className="prose">
        <p>
          Sou Caio Lima da Silva, o Metal. Trabalho como developer na VGR Gestão
          Contábil e estudo Análise e Desenvolvimento de Sistemas na Uniderp, em
          Campo Grande-MS.
        </p>
        <h2>Meu save point na internet</h2>
        <p>
          Este blog é um diário do que aprendo e construo: código, automações,
          erros, projetos e reflexões pessoais. Um lugar para organizar o
          conhecimento e voltar quando precisar.
        </p>
        <h2>Por que Metal Sonic?</h2>
        <p>
          Sonic e cultura pop fazem parte de quem eu sou. Metal Sonic é meu
          personagem favorito, e essa identidade aparece no azul, no ciano e nas
          pequenas referências pelo site. Cada aprendizado é mais uma fase.
        </p>
        <h2>Construindo com IA, aprendendo no processo</h2>
        <p>
          Sou vibe coder: descrevo o que quero, uso IA para ajudar a implementar
          e reviso o resultado. Este blog também documenta essa forma de
          trabalhar, incluindo as dúvidas e os ajustes pelo caminho.
        </p>
        <h2>O que passa pelo meu editor</h2>
        <p>
          Python, JavaScript, TypeScript, React, PostgreSQL, FastAPI e Fastify.
          Entre os projetos estão AgroPilot/Dusty, QRChamada, MetalBot e
          automações da VGR.
        </p>
      </div>
    </article>
  );
}
