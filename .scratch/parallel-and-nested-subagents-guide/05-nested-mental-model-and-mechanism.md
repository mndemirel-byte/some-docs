# Migrate "Nested: Mental Model" and "Nested: Mekanizma"

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Add source doc §07 and §08 to the guide page:

- "Nested Subagents — Mental Model" (§07), using the `NestedTreeDiagram` built in `01-diagram-components-and-prefactor.md`
- "Nested: Mekanizma" (§08) — the 3-item checklist (Derinlik limiti: 5 / Sadece üst özet döner / Devam eden agent derinliği korur) via `NumberedGrid`/`NumberedItem`, plus the source-citation `Callout`

## Acceptance criteria

- [x] Both sections render on `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` with correct locale content
- [x] "Mental Model" section renders `NestedTreeDiagram` correctly — no browser/screenshot tooling available in this environment, so not visually verified; covered instead by the component's own theme-token unit test
- [x] "Mekanizma" checklist renders all 3 items via `NumberedGrid`, reusing the component as-is (no new variant needed)
- [x] TOC anchors for `nmodel` and `nmech` are no longer placeholders
- [x] No inline `<style>` or bespoke CSS classes carried over
- [x] Page-level integration test asserts both sections' content for both locales
- [x] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/04-parallel-usecases-and-caution.md`
- `.scratch/parallel-and-nested-subagents-guide/01-diagram-components-and-prefactor.md`
