---
name: dry-code-review
description: Reviews code duplication and DRY opportunities in this monorepo. Use when the user asks for a DRY audit, duplication reduction, copy-paste detection, reuse-oriented refactoring, repeated boilerplate review, or God component/module investigation.
---

# DRY Code Review

Use this skill to produce a duplication-focused review without automatically implementing refactors. The default output is a report in `.context/dry-review-<scope>.md`, kept outside the versioned tree.

## AgroPilot Guardrails

- Read `AGENTS.md` before the analysis.
- Use `origin/main` as the reference when comparing a branch or diff.
- Preserve monorepo boundaries: frontend, backend, domain, Dexie, sync, and contracts can contain intentional repetition.
- Do not apply DRY blindly across frontend and backend when duplication exists for separate deployment, API contract clarity, or bounded context isolation.
- Do not recommend an abstraction that hides offline-first flow, authorization, persistence, Zod validation, or domain rules.
- If a recommendation becomes implementation work, read `.claude/skills/implementacao-com-guardrails/SKILL.md` before editing.

## Workflow

1. Define the scope: whole repo, `apps/frontend`, `apps/backend`, or one feature.
2. Create the report in `.context/dry-review-<scope>.md`.
3. Run the automated scan:

```bash
bash .claude/skills/dry-code-review/scripts/find_duplicates.sh <scope> "ts,tsx,js,jsx,json,sql,md"
```

4. Manually read the flagged files. The scan surfaces suspects, not conclusions.
5. Classify real findings and discard false positives with a short rationale.
6. Prioritize small, safe actions before broad refactors.

## What To Look For

- **Literal duplication**: copied blocks, repeated literals, magic numbers, and repeated configuration.
- **Structural duplication**: functions, components, routes, schemas, or tests with the same shape and small variations.
- **Logical duplication**: the same business rule, validation, normalization, or transformation expressed in different ways.
- **Cross-cutting duplication**: repeated error handling, loading, empty state, authorization, parsing, HTTP calls, or test setup.
- **God components/modules**: files that concentrate screen UI, state, effects, data, and sub-UI, or services that mix responsibilities.

## Judgment Criteria

- Repetition in tests can be acceptable when it improves readability.
- Repetition in shared contracts can be acceptable when it protects independent deployment.
- Small, stable repetition can be less urgent than duplication in high-churn code.
- A new abstraction is better only when it reduces real complexity and preserves clarity.
- Prefer reusing existing primitives, helpers, hooks, schemas, enums, and services in the repo.

## Report Format

```markdown
# DRY Code Review: <scope>

## Metadata
- Date: YYYY-MM-DD
- Scope: <paths>
- Base: origin/main
- Files analyzed: <number>
- Lines analyzed: <number>

## Status
- [ ] Discovery
- [ ] Automated scan
- [ ] Manual analysis
- [ ] Findings
- [ ] Prioritization

## Findings

### DRY-001: <title>
- Category: literal | structural | logical | cross-cutting | god component/module
- Severity: high | medium | low
- Locations:
  - `path/to/file.ts:10`
  - `path/to/other.ts:42`
- Why it matters: <real risk or cost>
- Recommendation: <objective change>
- Effort: S | M | L
- Risk: <contract, sync, UI, tests, data, none>

## Relevant False Positives
- <discarded item and reason>

## Prioritized Plan
1. <verifiable quick win>
2. <higher-impact refactor>

## Validations For Implementation
- <commands and scenarios that would prove a future fix>
```

## Handoff

Finish with finding counts by severity, the first 3 next steps, and risks that need care before refactoring.
