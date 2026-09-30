---
name: implementacao-com-guardrails
description: Implementa mudanças de software com guardrails de escopo, reutilização de padrões locais, Design System, backend, contratos de dados e evidências. Use ao implementar ou alterar features, componentes React, APIs, schemas, sincronização, formulários ou contratos entre frontend e backend.
---

# Implementação com Guardrails

Implemente somente após transformar o pedido em uma mudança verificável e localizar os padrões canônicos do repositório. Esta skill complementa, não substitui, as skills técnicas aplicáveis.

## 1. Preflight obrigatório

Antes de editar:

1. Leia o `AGENTS.md`, a documentação canônica da área e as skills exigidas pelo recorte.
2. Declare o objetivo, os não-objetivos, os invariantes afetados e as validações que provarão a mudança.
3. Localize duas implementações semelhantes. Reutilize seus imports, composição, contratos, tratamento de erro e testes quando couber.
4. Monte um mapa de reutilização: primitive, hook, helper, enum, schema, serviço ou rota existente que será usado. Procure antes em `components/ui`, `lib`, `shared` e na feature.
5. Se o formato de produto, domínio ou contrato não estiver definido nas fontes locais, pare e peça a decisão. Não invente campos, endpoints, regras de negócio ou estados.

Mantenha o patch limitado ao recorte solicitado. Não crie abstrações, dependências ou wrappers por antecipação.

## 2. Frontend e Design System

Em `pages/` e `features/`, componha a interface com os primitives canônicos e com componentes da feature. Não implemente manualmente um controle interativo, card, diálogo, toast, máscara ou layout operacional quando já houver equivalente.

- Use `Button` para ações; `Badge` comunica somente estado.
- Use os primitives de formulário, seleção, diálogo, seção, superfície, loading e empty state definidos no `AGENTS.md`.
- Use Sonner via `showToast` para notificações e `lucide-react` pelo barrel de ícones para ícones novos.
- Use tokens semânticos e os padrões `classeLabelCampoOperacional` e `classeTextoControleOperacional`; não introduza valores visuais arbitrários se houver token ou classe compartilhada.
- `<div>`, `<ul>` e demais elementos nativos são permitidos para estrutura e semântica. Eles não podem substituir um primitive, criar uma ação interativa ou virar um componente visual reutilizável improvisado.
- Mantenha páginas como composição fina. Estado, efeitos, dados e sub-UI de uma feature ficam em componentes, hooks e serviços da própria feature.
- Ao alterar primitive, variante, padrão reutilizável ou formulário operacional, atualize também a referência viva do Design System e valide mobile e desktop.

## 3. Backend, domínio e contratos

- Leia as skills específicas da stack. Reutilize a rota, schema, lib e padrão de teste equivalentes.
- Valide toda entrada externa no limite do sistema. Use o módulo `env`; nunca acesse variáveis de ambiente diretamente.
- Modele valores fechados no enum-like canônico e valide valores externos antes de convertê-los.
- Use contratos tipados nas fronteiras de API, cache local e fila. Não oculte incerteza com `any`, casts ou payloads genéricos.
- Para mudanças de contrato, mapeie e atualize juntos os produtores, consumidores, persistência, sincronização e testes. Preserve o fluxo de escrita e recuperação definido pelo produto.
- Preserve autenticação, autorização, isolamento de dados e semântica de erros. Não exponha segredos ou dados fora da autorização aplicável.

## 4. Evidências de conclusão

Antes de declarar a mudança concluída, confirme e reporte:

- [ ] Objetivo e não-objetivos continuam atendidos.
- [ ] Duas referências locais e a reutilização escolhida foram identificadas.
- [ ] Nenhuma primitive, helper, contrato ou dependência foi inventado sem necessidade comprovada.
- [ ] Os invariantes aplicáveis - domínio, datas, env, autorização, persistência, sincronização e Design System - foram preservados.
- [ ] Os testes do comportamento alterado cobrem sucesso, erro e caso de risco relevante.
- [ ] Foram executados os comandos do app afetado e os cenários manuais/E2E exigidos pelas instruções do repositório.

No handoff, informe: padrões reutilizados, arquivos modificados, impacto de contrato, comandos executados com resultado e limites reais de validação. Evidência fresca é obrigatória; não conclua com base em suposição ou somente em lint/typecheck.
