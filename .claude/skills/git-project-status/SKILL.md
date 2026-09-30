---
name: git-project-status
description: Generates a Git status report for this repository, including branch state, comparison with origin/main, local changes, commits, GitHub PRs/issues/checks, code structure, TODO/FIXME markers, dependencies, and pnpm verification. Use when the user asks for project status, repo overview, branch health, progress, context before choosing work, or a summary of what is happening.
---

# Git Project Status

Use this skill to produce an operational status report for AgroPilot. The report can be delivered in the response or saved to `.context/git-project-status.md` when it is long.

## AgroPilot Guardrails

- Work from the repository root.
- Use `origin/main` as the comparison base.
- Always use `pnpm`; never use `npm`, `yarn`, `npx`, or alternate lockfiles.
- Do not install dependencies or run migrations only to generate status unless the user asks.
- Do not rename the branch.
- Do not merge, commit, push, or run destructive checkout commands.
- When querying GitHub, follow `docs/agents/issue-tracker.md`; GitHub comments and artifacts created by agents must still be written in pt-BR per the repo rules.

## Base Commands

```bash
git rev-parse --is-inside-work-tree
git status --short --branch
git branch --show-current
git diff --stat origin/main...
git log --oneline --decorate -n 8
git log --oneline origin/main..HEAD
git remote -v
```

Also read:

```bash
sed -n '1,220p' docs/tarefas/_prioridades.md
sed -n '1,180p' docs/agents/issue-tracker.md
```

If `gh` is available and authenticated:

```bash
gh pr list --state open --json number,title,headRefName,author,reviewDecision,mergeable,statusCheckRollup,updatedAt --limit 20
gh issue list --state open --json number,title,labels,assignees,updatedAt --limit 20
gh run list --limit 8 --json databaseId,displayTitle,status,conclusion,headBranch,createdAt
```

## Report Structure

Include, in this order:

1. **Summary**: project name, current branch, base, clean/dirty state, and main risk.
2. **Branch and Diff**: commits ahead of `origin/main`, changed files, diff size, and type of change.
3. **Local Changes**: staged, unstaged, and untracked changes, if any.
4. **GitHub**: open PRs, `mergeable`, review state, checks, relevant issues, and recent runs if `gh` allows it.
5. **Local Priorities**: read `docs/tarefas/_prioridades.md` and highlight items that affect task choice.
6. **Codebase**: compact file and line count by area (`apps/frontend`, `apps/backend`, `docs`, `.claude/skills`).
7. **Dependencies**: summarize `package.json`, `pnpm-lock.yaml`, and, if requested, `pnpm outdated -r`.
8. **Debt Markers**: TODO, FIXME, HACK, XXX, WORKAROUND, and TEMP in source files and relevant docs.
9. **Verification**: executed `pnpm` commands and real results. If not run, explain why.
10. **Next Steps**: 3 to 5 concrete actions based on the findings.

## Verification

By default, run only lightweight checks:

```bash
pnpm check:env
pnpm lint
```

Run full verification when the user asks for complete status, local CI, or PR preparation:

```bash
pnpm check:env
pnpm lint
pnpm test
pnpm build
```

For documentation-only changes, validate the diff and relative links instead of running the full suite.

## Code Counting

Use `rg --files` when possible and exclude `node_modules`, `.git`, `dist`, `build`, `coverage`, `playwright-report`, `test-results`, `.vercel`, `.data`, `.map`, `.min.*`, and `.d.ts` files.

Example:

```bash
rg --files apps docs .claude/skills \
  -g '!**/node_modules/**' \
  -g '!**/dist/**' \
  -g '!**/build/**' \
  -g '!**/coverage/**' \
  -g '!**/*.map' \
  -g '!**/*.d.ts'
```

## Debt Markers

```bash
rg -n "(TODO|FIXME|HACK|XXX|WORKAROUND|TEMP)(\\(|:| )" apps docs .claude/skills
```

Group by marker and prioritize occurrences in product code over examples, docs, and skills.

## Handoff

Finish with:

- branch state;
- main risk;
- checks executed with results;
- PRs/issues that need attention;
- objective next steps.
