# Migrate "Best Practices" and "TL;DR", close out the guide page

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

Add the final two sections (source doc §13 and §14) to the guide page, plus the footer:

- "Best Practices" — the 8-item checklist using the `Checklist` component (`variant="check"`) built and drafted in `01-checklist-module-and-migrations.md`, plus the collapsible "Workshop checklist" (6-point agent-file evaluation list) using `Disclosure`
- "TL;DR" — the 2x2 grid of takeaways (Isolate noise, Keep decisions, Constrain tools, Define "done") via `CardGrid`/`InfoCard`, plus the closing "Final rule" callout via `Callout`
- Footer matching the site's existing Doc page footer convention (not the source doc's bespoke `.footer` class)

This closes out the guide: after this issue, all 14 source sections are represented and the TOC should have no more placeholder anchors.

## Acceptance criteria

- [ ] Both sections and the footer render on `/en/subagents-companion-guide` and `/tr/subagents-companion-guide` with correct locale content
- [ ] "Best Practices" checklist uses the `Checklist` component from issue 01, not a re-implementation
- [ ] Workshop checklist accordion uses `Disclosure` and toggles correctly
- [ ] TL;DR grid renders all 4 items plus the closing rule callout
- [ ] TOC has no remaining placeholder anchors — all 14 sections are live
- [ ] No inline `<style>` or bespoke CSS classes remain anywhere in the migrated MDX (final sweep across the whole page)
- [ ] Page-level integration test asserts full-page content for both locales, and confirms no regressions on other Doc pages that share `Checklist`, `DecisionTree`, `DoDontList`, `CardGrid`, `Disclosure`, `CodeBlock`, `DataTable`, `Callout`, or `FlowSteps`
- [ ] Visual QA (both themes, both locales) on the complete page
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/subagents-companion-guide/01-checklist-module-and-migrations.md`
- `.scratch/subagents-companion-guide/03-page-scaffold-and-mental-model.md`
