---
name: extract-design-system
description: Extracts or audits tokens, components, and visual patterns from a URL, localhost app, or AgroPilot screen. Use when the user asks to extract a design system, analyze a page visually, compare screens with the local Design System, inventory colors/typography/spacing/states, or capture visual evidence with Playwright.
---

# Extract Design System

Use this skill to extract visual evidence and turn it into a token/component inventory. In this project, it must support the existing Design System, not replace it.

## AgroPilot Guardrails

- Read `AGENTS.md` and follow the "Design System e UI" section.
- Do not use the `impeccable` skill in this project.
- Before suggesting a new component, search `apps/frontend/src/components/ui/`, `apps/frontend/src/lib/`, `apps/frontend/src/shared/`, and the affected feature.
- Canonical primitives, semantic tokens, React Aria, local shadcn/ui, and `lucide-react` through the project barrel take precedence over any extracted pattern.
- If the audit becomes UI implementation work, read `.claude/skills/implementacao-com-guardrails/SKILL.md`, the `playwright` skill, and the applicable technical skills before editing.
- When changing a primitive, variant, or reusable pattern, update the Administration > Design System route in the same scope.

## When To Use

- Extract tokens from a public URL or `localhost`.
- Audit whether a screen follows the AgroPilot Design System.
- Compare mobile and desktop for a feature.
- Document observed components, states, colors, typography, spacing, radius, and shadows.
- Create a gap report before implementing visual polish.

## Workflow

1. Define target and scope: URL, routes, viewports, and authenticated/offline state if applicable.
2. Read `.claude/skills/playwright/SKILL.md` before using a browser.
3. Start the app when needed:

```bash
pnpm dev:frontend
```

4. Capture evidence in at least mobile and desktop. For PWA/offline work, use build and preview when the task involves the Service Worker:

```bash
pnpm --filter vgr-agropilot-frontend build
pnpm --filter vgr-agropilot-frontend preview
```

5. Extract computed data and screenshots. Save temporary output in `.context/design-system-extract/<scope>/`.
6. Organize findings into local tokens and components, always mapping them to existing primitives.
7. List divergences between the analyzed screen and the living Design System.

## Minimum Inventory

Report in `.context/design-system-extract/<scope>/report.md`:

```markdown
# Extract Design System: <scope>

## Target
- URL/routes:
- Date:
- Viewports:
- Tested state:

## Evidence
- Screenshots:
- Browser/tooling:

## Observed Tokens
- Colors:
- Typography:
- Spacing:
- Radius:
- Shadows:
- Borders:

## Observed Components
- Buttons:
- Fields:
- Selects/autocomplete:
- Dialogs:
- Cards/surfaces:
- Badges/status:
- Empty/loading/error states:

## Project Mapping
- Existing primitive:
- Existing helper or token:
- Real gap:

## Divergences
- <path/screen>: <problem, evidence, recommendation>

## Recommendations
1. <small, verifiable action>
2. <later action if any>
```

## Heuristics

- A button communicates action, a badge communicates state.
- Editable text must keep a mobile-safe size.
- Avoid arbitrary values when a semantic token exists.
- Check focus, hover, disabled, loading, error, and empty states, not just the happy path.
- A good-looking screenshot is not enough: confirm content fits its container on mobile and desktop.
- If an external URL has a divergent look, translate the inspiration into the AgroPilot vocabulary instead of importing the style directly.
