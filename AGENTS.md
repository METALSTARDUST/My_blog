# Regras para contribuir no My_blog

Leia também `CLAUDE.md` antes de alterar o projeto.

## Primeiro documentário — regra editorial obrigatória

Antes de adicionar ou alterar conteúdo do documentário, confira o material enviado
por Caio na issue/PR ou na conversa que originou a tarefa e o catálogo existente em
`content/documentario/componentes.json`.

- Inclua somente os componentes e conteúdos que Caio enviou ou autorizou. Não
  complete o catálogo automaticamente com itens encontrados em sites externos.
- Corrija o português e esclareça termos sem inventar experiências, estudos,
  exemplos ou opiniões em nome do autor. Escreva para ajudar outros iniciantes.
- Cada componente enviado deve aparecer em “Todos os componentes” e ter seu nome
  como link discreto para a página de conteúdo correspondente. O nome fica sempre
  visível; o sublinhado aparece no hover e no foco pelo teclado. O link deve
  funcionar também por toque, sem depender do mouse para ser descoberto.
- A descrição fica na página do componente. Acrescente novos textos ao componente
  correspondente conforme Caio os enviar. Não substitua conteúdo anterior sem motivo.
- Use o catálogo como fonte única para nomes, descrições e geração das páginas.
  “Novos componentes” destaca os itens marcados com `isNew`; não duplique o cadastro.
- Preserve a introdução como primeira página e Componentes como segunda, com
  navegação entre elas. Mantenha fontes no final e a identidade visual do blog.
- Antes de concluir, confira todos os itens enviados, os links e a navegação por
  teclado e em tela pequena. Execute lint, formatação dos arquivos alterados e build.

Essas regras devem ser verificadas em toda PR que altere o documentário.
