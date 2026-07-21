# Integrate the Parallel & Nested Subagents guide into the doc site's design system

Label: ready-for-agent

## What to build

Parent tracking issue for bringing `docs/requirements/parallel-and-nested-subagents-guide.html` into the site as a real Doc page — "Workshop 03," the follow-up to `subagents-companion-guide` ("Workshop 02", see `.scratch/subagents-companion-guide/subagents-companion-guide.md`).

The source file is the same shape as Workshop 02's source doc: a standalone, self-contained HTML reference (15 sections, TR/EN via a client-side `data-lang` toggle, its own inline `<style>` block and bespoke CSS classes like `.dosdont`, `.tbl`, `.checklist`, `.tree`/`.q`/`.branches`/`.branch`, `.decision`, `.cb`, `.note`, `.tldr`). This site instead uses per-locale MDX (`content/en/*.mdx` + `content/tr/*.mdx`, no client-side language toggle — see [[0003-two-layer-i18n-json-plus-mdx]]) rendered through the shared component library in `src/components/doc/`.

Almost every bespoke UI pattern in this source doc already has an equivalent component, built during the Workshop 02 migration:

| Source pattern | Existing component |
|---|---|
| `.dosdont` | `DoDontList` / `DoItem` / `DontItem` |
| `.decision` (yes/no split) | `TwoBoxGrid` / `Box` |
| `.grid`/`.card` | `CardGrid` / `InfoCard` |
| `.cb` (code block) | `CodeBlock` |
| `.tbl` | `DataTable` / `TableBox` |
| `.note` / `.note.ok` / `.note.danger` | `Callout` |
| `.checklist`/`.check` | `NumberedGrid` / `NumberedItem` (with `marker` prop) |
| `.tree`/`.q`/`.branches`/`.branch` (decision tree) | `DecisionTree` / `DecisionQuestion` |
| `.tldr` (2-up takeaway grid) | `CardGrid` / `InfoCard` |

Two inline SVG diagrams in the source doc have no existing equivalent and need new deep modules first (prefactoring, per the "make the change easy, then make the easy change" rule already applied for Workshop 02's `Checklist`/`DecisionTree` components):

- A **fan-out diagram** (main thread branching to 3 parallel subagents, used in "Paralel: Mental Model" / §02)
- A **nested-tree diagram** (main thread → team-lead → developer chain, used in "Nested: Mental Model" / §07)

Both follow the exact pattern already established by `MentalModelDiagram` and `SequentialPipelineDiagram`: inline SVG, hardcoded to this doc's content (no configurable props), styled entirely with theme CSS custom properties (`var(--accent)`, `var(--surface)`, etc.) instead of hardcoded hex, each with its own `.module.css` and unit test.

**Children (in dependency order):**
1. `.scratch/parallel-and-nested-subagents-guide/01-diagram-components-and-prefactor.md`
2. `.scratch/parallel-and-nested-subagents-guide/02-page-scaffold-and-intro.md`
3. `.scratch/parallel-and-nested-subagents-guide/03-parallel-benefit-and-trigger.md`
4. `.scratch/parallel-and-nested-subagents-guide/04-parallel-usecases-and-caution.md`
5. `.scratch/parallel-and-nested-subagents-guide/05-nested-mental-model-and-mechanism.md`
6. `.scratch/parallel-and-nested-subagents-guide/06-nested-pros-and-cons.md`
7. `.scratch/parallel-and-nested-subagents-guide/07-nested-howto-and-model-resolution.md`
8. `.scratch/parallel-and-nested-subagents-guide/08-decision-tree-and-best-practices.md`
9. `.scratch/parallel-and-nested-subagents-guide/09-tldr-and-close-out.md`

## Acceptance criteria

- [x] All 9 child issues completed
- [x] `FanOutDiagram` and `NestedTreeDiagram` are new deep modules in `src/components/doc/`, each proven against its one real call site, matching the `MentalModelDiagram`/`SequentialPipelineDiagram` pattern
- [x] No new `Checklist`/`DecisionTree`-style component work was needed — both were reused as-is from the Workshop 02 migration
- [x] The guide is reachable at `/[locale]/parallel-and-nested-subagents-guide` in both locales, linked from the homepage index (7th card, `c7` variant)
- [x] No inline `<style>` blocks or bespoke CSS classes remain in the migrated MDX — all styling comes from existing site components and design tokens
- [x] All 15 sections of the source HTML are represented in the MDX content, in both locales, with no remaining TOC placeholder anchors
- [x] `npm run lint` and `npm run build` (static export) pass — reverified at the end of every issue, including this one
- [x] Full automated test suite passes with no regressions in any shared component (`NumberedGrid`, `DoDontList`, `CardGrid`/`InfoCard`, `DecisionTree`, `CodeBlock`, `DataTable`, `Callout`, `TwoBoxGrid`) — final count: 193/193 tests passing

## Blocked by

None - can start immediately
