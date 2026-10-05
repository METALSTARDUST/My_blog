import assert from "node:assert/strict";
import { test } from "node:test";
import { journalFilters, matchesPost } from "../src/lib/journal-search.ts";

const post = {
  slug: "pessoal/2026-10-05-listas",
  title: "Listas em Python",
  summary: "Meu aprendizado sobre listas",
  content: "Aprendi a acessar elementos de uma lista.",
  date: "2026-10-05",
  category: "pessoal",
  topics: ["python"],
  tags: ["listas"],
  source: { name: "Site de estudo", url: "https://example.com/python" },
  readingMinutes: 1,
};

test("o mesmo registro aparece por origem, assunto, pasta e Todos", () => {
  for (const filter of ["todos", "python", "site de estudo", "pessoal"]) {
    assert.equal(
      [post].filter((item) => matchesPost(item, "", filter)).length,
      1,
    );
  }
  assert.equal(matchesPost(post, "", "react"), false);
  assert.equal(matchesPost(post, "setembro", "python"), false);
});

test("fonte nova gera um filtro sem duplicar assuntos ou cadastrar tags", () => {
  const filters = journalFilters(
    [
      post,
      { ...post, topics: ["Python"], source: { name: " SITE DE ESTUDO " } },
    ],
    ["python", "pessoal"],
  );
  assert.deepEqual(filters, [
    { value: "python", label: "python" },
    { value: "pessoal", label: "pessoal" },
    { value: "site de estudo", label: "Site de estudo" },
  ]);
});

test("busca combina data, texto, origem e categoria", () => {
  for (const query of [
    "05/10/2026",
    "10/2026",
    "2026-10-05",
    "outubro python",
    "site de estudo listas",
  ]) {
    assert.equal(matchesPost(post, query, "python"), true, query);
  }
  assert.equal(matchesPost(post, "31/12/2099", "todos"), false);
});

test("origem de faculdade não exige URL; registros antigos continuam pesquisáveis", () => {
  const lesson = { ...post, source: { name: "Faculdade — Algoritmos" } };
  assert.equal(
    matchesPost(lesson, "faculdade", "faculdade — algoritmos"),
    true,
  );
  const legacy = { ...post, topics: [], source: undefined };
  assert.equal(matchesPost(legacy, "listas", "pessoal"), true);
  assert.deepEqual(journalFilters([legacy], ["pessoal"]), [
    { value: "pessoal", label: "pessoal" },
  ]);
});

test("dois aprendizados do mesmo dia e fonte continuam sendo dois registros", () => {
  const second = {
    ...post,
    slug: "pessoal/2026-10-05-listas-2",
    title: "Outro aprendizado",
  };
  assert.equal(
    [post, second].filter((item) =>
      matchesPost(item, "05/10/2026", "site de estudo"),
    ).length,
    2,
  );
  assert.equal(journalFilters([post, second], ["pessoal", "python"]).length, 3);
});
