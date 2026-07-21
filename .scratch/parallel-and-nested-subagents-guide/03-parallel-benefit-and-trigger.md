# Migrate "Paralel: Fayda" and "Paralel: Nasıl Tetiklenir"

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Add source doc §03 and §04 to the guide page:

- "Paralel: Fayda Nedir" (§03) — the 4-row benefit table (Zaman / Context izolasyonu / Bağımsız bakış açıları / Worktree izolasyonu) via `DataTable`, plus the source-citation `Callout`
- "Paralel: Nasıl Tetiklenir" (§04) — the 3-card "how to trigger" grid via `CardGrid`/`InfoCard`, the "Sık hata" `Callout` (danger kind), the repo-specific `frontend-dev`/`data-dev` example paragraph, and the "Deneme promptu" code block via `CodeBlock`

## Acceptance criteria

- [x] Both sections render on `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` with correct locale content
- [x] Benefit table renders all 4 rows via `DataTable`
- [x] Trigger section renders the 3-card grid, the danger callout, and the copyable code block via `CodeBlock`
- [x] TOC anchors for `pbenefit` and `ptrigger` are no longer placeholders
- [x] No inline `<style>` or bespoke CSS classes carried over
- [x] Page-level integration test asserts both sections' content for both locales
- [x] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/02-page-scaffold-and-intro.md`
