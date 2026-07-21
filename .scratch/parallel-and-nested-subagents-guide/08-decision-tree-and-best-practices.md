# Migrate "Karar Ağacı" and "Best Practices"

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Add source doc §13 and §14 to the guide page:

- "Karar Ağacı" (§13) — the 3-question yes/no decision tree via `DecisionTree`/`DecisionQuestion`, reused as-is from the Workshop 02 migration (no new component work needed)
- "Best Practices" (§14) — the 5-item checklist via `NumberedGrid`/`NumberedItem`

## Acceptance criteria

- [x] Both sections render on `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` with correct locale content
- [x] Decision tree renders all 3 questions with correct yes/no branches, using `DecisionTree` unmodified
- [x] Best practices checklist renders all 5 items via `NumberedGrid`
- [x] TOC anchors for `tree` and `best` are no longer placeholders
- [x] No inline `<style>` or bespoke CSS classes carried over
- [x] Page-level integration test asserts both sections' content for both locales
- [x] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/07-nested-howto-and-model-resolution.md`
