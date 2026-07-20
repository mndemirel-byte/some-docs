# Integrate the Subagents Companion Guide into the doc site's design system

Label: ready-for-agent

## What to build

Parent tracking issue for bringing `docs/requirements/claude-code-subagents-companion-guide--v2.html` into the site as a real Doc page, matching the existing MDX component and design-token system instead of its own self-contained inline `<style>` block and bespoke CSS classes.

The source file is a standalone, self-contained HTML reference (14 sections, TR/EN via a client-side `data-lang` toggle, its own color palette and class names like `.dosdont`, `.tbl`, `.timeline`, `.checklist`, `.tree`, `.decision`, `.cb`, `.note`). This site instead uses per-locale MDX (`content/en/*.mdx` + `content/tr/*.mdx`, no client-side language toggle — see [[0003-two-layer-i18n-json-plus-mdx]]) rendered through a shared component library in `src/components/doc/`.

Two of the source doc's bespoke UI patterns have no existing equivalent component and need new deep modules first (prefactoring, per the "make the change easy, then make the easy change" rule already applied in `.scratch/component-consolidation/`):

- `.checklist`/`.check` (a grid of small check items — used twice, in "System Prompt Design" and "Best Practices")
- `.tree`/`.q`/`.branches`/`.branch` (a yes/no branching decision tree — used once, in "Should I Use a Subagent?")

Everything else in the source doc maps onto components that already exist:

| Source pattern | Existing component |
|---|---|
| `.dosdont` | `DoDontList` / `DoItem` / `DontItem` |
| `.decision` (yes/no split) | `TwoBoxGrid` / `Box` |
| `.grid`/`.card` | `CardGrid` / `InfoCard` |
| `.timeline`/`.trow` | `FlowSteps` / `GroupedFlowPhase` |
| `.cb` (code block) | `CodeBlock` |
| `.tbl` | `DataTable` / `TableBox` |
| `.note` / `.note.ok` / `.note.danger` | `Callout` |
| `<details>` workshop checklist | `Disclosure` |

The two bespoke inline SVG diagrams (mental-model diagram in "Mental Model", sequential-pipeline diagram in "Anti-patterns") stay as inline SVG but get restyled to use the site's theme CSS custom properties instead of hardcoded hex, so they respect both themes ([[0002-theme-as-client-state-not-route]]).

**Children (in dependency order):**
1. `.scratch/subagents-companion-guide/01-checklist-module-and-migrations.md`
2. `.scratch/subagents-companion-guide/02-decision-tree-module-and-migration.md`
3. `.scratch/subagents-companion-guide/03-page-scaffold-and-mental-model.md`
4. `.scratch/subagents-companion-guide/04-compare-and-lifecycle.md`
5. `.scratch/subagents-companion-guide/05-anatomy-and-descriptions.md`
6. `.scratch/subagents-companion-guide/06-output-and-tools.md`
7. `.scratch/subagents-companion-guide/07-models-and-usecases.md`
8. `.scratch/subagents-companion-guide/08-anti-patterns.md`
9. `.scratch/subagents-companion-guide/09-best-practices-and-tldr.md`

## Acceptance criteria

- [x] All 9 child issues completed
- [x] `DecisionTree`/`DecisionQuestion` is a new deep module in `src/components/doc/`, proven against its one real call site. `Checklist` was not built as a separate component — issue 01 found `NumberedGrid`/`NumberedItem` already covered the checklist pattern almost exactly, so it was generalized (added an optional `marker` prop) instead of adding a parallel component. Two new theme-token-restyled diagram components (`MentalModelDiagram`, `SequentialPipelineDiagram`) were also added, matching the "keep as inline SVG, restyle with tokens" decision from issue 03.
- [x] The guide is reachable at `/[locale]/subagents-companion-guide` in both locales, linked from the homepage index
- [x] No inline `<style>` blocks or bespoke CSS classes remain in the migrated MDX — all styling comes from existing site components and design tokens (verified: `grep` for `<style` / `class="` in both locale MDX files returns nothing)
- [x] All 14 sections of the source HTML are represented in the MDX content, in both locales (issue 09's close-out test asserts no placeholder text remains and all 14 TOC anchors resolve to real sections — this also caught and fixed a gap where sections 06 and 12 had been built as components/fragments in issues 01/02 but never assigned to a migration issue)
- [x] `npm run lint` and `npm run build` (static export) pass — reverified at the end of every issue, including this one
- [x] Visual QA — no browser/screenshot tooling is available in this environment (no Playwright, no chromium-cli), so this was not a pixel-level visual pass. Coverage instead comes from the full automated suite (144/144 passing) re-run after every issue, which includes every other Doc page's own existing page-level tests — no regressions were introduced in any shared component (`NumberedGrid`, `DoDontList`, `CardGrid`/`InfoCard`, `Disclosure`, `CodeBlock`, `DataTable`, `Callout`, `FlowSteps`, `TwoBoxGrid`). A human/browser visual pass is still recommended before treating this as fully signed off.

## Blocked by

None - can start immediately
