# Build the Checklist module and migrate both source usages

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

New deep `Checklist` module in `src/components/doc/` for the source doc's `.checklist`/`.check` pattern: a responsive grid of small labeled items, each with a leading marker (a number like `01`, `02`... or a mark like `✓`) and a short label/description. The marker style is a prop (`variant="numbered" | "check"`), not two separate components — the source HTML uses the same underlying grid/card shape in both places, only the marker glyph differs.

Interface: `Checklist` takes `variant` and `children`; each `ChecklistItem` takes a `marker` (or auto-numbers when `variant="numbered"` and no marker is given) and `children` for the label/description.

Migrate both existing usages from the source HTML as part of this same issue, since there are only two and they prove the two variants directly:
- "System Prompt Design" section (`variant="numbered"`, 6 items: Scope, Focus, Stop condition, Structured output, Obstacle reporting, Boundaries)
- "Best Practices" section (`variant="check"`, 8 items: Narrow scope, Limited tools, Structured output, Report obstacles, Custom system prompt, Concise summaries, Explicit stop condition, Evidence-based findings)

These migrations land as MDX fragments for now (the page they belong to doesn't exist yet — see `03-page-scaffold-and-mental-model.md`); write them as isolated snippets or a temporary preview route so `Checklist` can be verified in isolation, and reuse the same MDX when the real sections are assembled in issues 03 and 09.

## Acceptance criteria

- [ ] `Checklist`/`ChecklistItem` module exists in `src/components/doc/` supporting both `numbered` and `check` variants
- [ ] Component renders correctly under both themes ([[0002-theme-as-client-state-not-route]]) and both locales
- [ ] A component-level test covers both variants rendering their items and markers correctly
- [ ] Both source usages (System Prompt Design checklist, Best Practices checklist) are drafted as MDX using `Checklist` and verified to render correctly (via isolated preview or test), ready to drop into issues 03 and 09
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

None - can start immediately
