---
name: to-spec
description: Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---

This skill takes the current conversation context and codebase understanding and produces a spec (you may know this document as a PRD). Do NOT interview the user — just synthesize what you already know.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if not.

Language guardrail for this repo: when publishing to GitHub, write the spec title, body, headings, user stories, implementation decisions, testing decisions, and comments in pt-BR. Keep only labels, commands, APIs, library names, code identifiers, paths, and external contract values in their original language.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the spec, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better - the ideal number is one.

Check with the user that these seams match their expectations.

3. Write the spec using the template below, then publish it to the project issue tracker. Apply the `ready-for-agent` triage label - no need for additional triage.

<spec-template>

## Contexto do problema

O problema que o usuário enfrenta, pela perspectiva do usuário.

## Solução

A solução para o problema, pela perspectiva do usuário.

## Histórias de usuário

Uma lista numerada e extensa de histórias de usuário. Cada história deve seguir o formato:

1. Como <ator>, quero <recurso>, para <benefício>

<user-story-example>
1. Como cliente de banco pelo celular, quero ver o saldo das minhas contas, para tomar decisões melhores sobre meus gastos
</user-story-example>

Esta lista deve ser bem abrangente e cobrir os aspectos relevantes da funcionalidade.

## Decisões de implementação

Uma lista das decisões de implementação tomadas. Pode incluir:

- Os módulos que serão criados ou modificados
- As interfaces desses módulos que serão alteradas
- Esclarecimentos técnicos do desenvolvedor
- Decisões de arquitetura
- Mudanças de schema
- Contratos de API
- Interações específicas

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it within the relevant decision and note briefly that it came from a prototype. Trim to the decision-rich parts — not a working demo, just the important bits.

## Decisões de teste

Uma lista das decisões de teste tomadas. Inclua:

- Uma descrição do que torna o teste bom, priorizando comportamento externo em vez de detalhes de implementação
- Quais módulos serão testados
- Referências de testes similares já existentes no codebase

## Fora de escopo

Uma descrição do que fica fora do escopo desta spec.

## Notas adicionais

Qualquer nota adicional sobre a funcionalidade.

</spec-template>
