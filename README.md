<!-- REGRA: ao editar este README, mantenha a imagem do céu NO COMEÇO e a do Metal Sonic NO FINAL. Veja CLAUDE.md. -->

![Sonic olhando para o planeta](docs/images/readme-top.jpeg)

# 🤘 My_blog — Metal's Learning Journey

> _"Mais rápido que o Sonic, mais sólido que o aço."_ — Metal, aprendendo uma coisa nova por dia.

Blog pessoal onde eu, **Caio Lima da Silva (Metal)**, registro tudo que aprendo no dia a dia: código, dicas, erros, projetos e reflexões. É ao mesmo tempo minha referência pessoal e um lugar para ajudar outros devs em jornada parecida.

Trabalho como developer na **VGR Gestão Contábil**, curso **ADS (Análise e Desenvolvimento de Sistemas)** na Uniderp e moro em Campo Grande-MS. 🇧🇷

## 🦔 Por que tanta referência a Sonic?

Se você esbarrar em alguma referência a Sonic, Metal Sonic ou cultura pop por aqui: **é proposital**. Sou grande fã da franquia, e meu personagem favorito é o **Metal Sonic** — o rival que copia, evolui e nunca para de se atualizar. Combina bastante com quem vive estudando tecnologia.

Então não estranhe: imagens, legendas e analogias (tipo "Sonic roubando velocidade do compilador") fazem parte da identidade do blog. Dark mode sempre ativo, com aquela vibe azul/ciano de fase noturna. 🌙

## 🤖 Feito com ajuda de IA

Sou **vibe coder** e amo automatização. **Tudo aqui é feito com a ajuda de IA**: eu só digito (descrevo o que quero) e **reviso o código**. Nada de esconder — esse repositório também serve como diário de como aprender e construir junto com IA.

## 🛠️ Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Posts**: Markdown com frontmatter YAML (title, date, tags, category, summary)
- **Qualidade**: ESLint + Prettier
- **Deploy**: GitHub Pages (automático a cada push na `main`)
- **Busca**: índice gerado em build time
- **Dark mode**: sempre ativo, sem toggle

## 📁 Estrutura de posts

Posts ficam em `content/posts/`, organizados por categoria:

```
content/posts/
├── typescript/   # tipos, generics, decorators
├── python/       # scripts, pandas, async
├── react/        # hooks, patterns
├── sql/          # queries, performance
├── agropilot/    # aprendizados do AgroPilot/Dusty
└── pessoal/      # reflexões e lessons learned
```

## 🚀 Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em out/
npm run lint
npm run format
```

O deploy é automático: todo push na `main` roda o GitHub Actions e publica no GitHub Pages em https://metalstardust.github.io/My_blog/

## 🗺️ Roadmap

- [x] Peça 1 — Projeto Next.js, layout dark, pastas de posts e deploy no GitHub Pages
- [ ] Peça 2 — Render dos posts em Markdown
- [ ] Peça 3 — Busca full-text
- [ ] Peça 4 — Tags e categorias
- [ ] Peça 5 — Script CLI para novos posts (`npm run new:post`)
- [ ] Peça 6 — Imagens e personagens
- [ ] Peça 7 — Otimização e docs finais

## 📄 Licença

MIT — use os aprendizados à vontade, só cite a fonte. 🤘

---

**Mantido por Metal** 🎸 (com uma ajudinha da IA)

![Metal Sonic](docs/images/readme-bottom.jpeg)
