# Migrate "TL;DR", close out the guide page

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Add the final section (source doc §15) to the guide page, plus the footer:

- "TL;DR" (§15) — the 2x2 grid of takeaways (Paralel = tek mesaj / Nested = Agent tool'u ver ya da alma / Sonuç her zaman özetlenir / Limitleri unutma) via `CardGrid`/`InfoCard`, plus the closing "Son kural" ok `Callout`
- Footer matching the site's existing Doc page footer convention (not the source doc's bespoke `.footer` class)

This closes out the guide: after this issue, all 15 source sections are represented and the TOC should have no more placeholder anchors.

## Acceptance criteria

- [x] TL;DR section and footer render on `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` with correct locale content — no bespoke page footer was added, matching the Workshop 02 precedent (`subagents-companion-guide.mdx` has no footer either; there is no shared Doc-page Footer component in this site)
- [x] TL;DR grid renders all 4 items plus the closing rule callout
- [x] TOC has no remaining placeholder anchors — all 15 sections are live
- [x] No inline `<style>` or bespoke CSS classes remain anywhere in the migrated MDX (final sweep across the whole page — verified via `grep` for `style=`/`class="` in both locale MDX files, no matches)
- [x] Page-level integration test asserts full-page content for both locales, and confirms no regressions on other Doc pages that share `NumberedGrid`, `DoDontList`, `CardGrid`, `DecisionTree`, `CodeBlock`, `DataTable`, `Callout`, or `TwoBoxGrid` (full suite: 193/193 passing)
- [x] Visual QA (both themes, both locales) on the complete page — no browser/screenshot tooling available in this environment, so not visually verified; coverage substitute is the diagram components' own theme-token unit tests plus the full passing suite
- [x] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/08-decision-tree-and-best-practices.md`
