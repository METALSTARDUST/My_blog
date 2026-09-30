---
name: domain-enums
description: Models finite domain value sets as enum-like objects that own their metadata and behavior, while eliminating loose strings from callers. Use when creating or changing statuses, roles, permissions, regions, categories, types, workflow stages, payment states, or any other closed set of values; when mapping internal values to database or external wire formats; when reviewing repeated literal comparisons, `||` chains, ternaries, or `switch` statements; or when refactoring AI-generated JavaScript or TypeScript that may invent magic strings.
---

# Domain Enums

Apply one principle:

> Behavior belongs on the entry, not in the caller.

Before creating, changing, or reviewing a finite domain set, read and follow [rules/domain-enums.md](rules/domain-enums.md).

## Workflow

1. Identify whether the values form a finite domain set.
2. Find its literals, types, option arrays, maps, and caller conditionals.
3. Create or reuse one canonical enum-like object.
4. Separate the code identity (`name`) from an external representation (`value`) when necessary.
5. Replace every loose domain string with a reference to an entry.
6. Move stable metadata and behavior from callers onto the entries.
7. Derive types and collections from the canonical definition.
8. Validate external strings before mapping them to entries.
9. Search again for missed literals and repeated branching.

Do not add a dependency for this pattern. A small local factory is sufficient.
