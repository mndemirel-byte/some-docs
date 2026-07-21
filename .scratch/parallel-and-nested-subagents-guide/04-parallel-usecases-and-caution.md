# Migrate "Paralel: Kullanım Alanları" and "Paralel: Dikkat Edilecekler"

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Add source doc §05 and §06 to the guide page:

- "Paralel: Kullanım Alanları" (§05) — the 4-card use-case grid (Bağımsız modül review / Çoklu kaynak araştırması / Çoklu görüş toplama / `/batch` ile worktree'li iş bölme) via `CardGrid`/`InfoCard`
- "Paralel: Dikkat Edilecekler" (§06) — the do/don't split via `DoDontList`/`DoItem`/`DontItem`, plus the source-citation `Callout`

## Acceptance criteria

- [x] Both sections render on `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` with correct locale content
- [x] Use-case grid renders all 4 cards
- [x] Do/don't section renders via `DoDontList`, matching both the "do" and "don't" lists from the source doc
- [x] TOC anchors for `puse` and `pcaution` are no longer placeholders
- [x] No inline `<style>` or bespoke CSS classes carried over
- [x] Page-level integration test asserts both sections' content for both locales
- [x] `npm run lint` and `npm run build` pass (full suite is flaky above the default 5s per-test timeout under heavy machine load — reran with `--testTimeout=20000`, all 166 tests pass; failures were unrelated pre-existing pages, not this change)

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/03-parallel-benefit-and-trigger.md`
