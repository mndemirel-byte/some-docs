# Migrate "Nested: Avantajlar" and "Nested: Dezavantajlar & Riskler"

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Add source doc §09 and §10 to the guide page:

- "Nested: Avantajlar" (§09) — the 3-card grid (Hiyerarşik iş bölümü / Dinamik orkestrasyon / Yeniden kullanılabilir parçalar) via `CardGrid`/`InfoCard`
- "Nested: Dezavantajlar & Riskler" (§10) — the 2-item "invisible steps / type restriction weakens" do/don't block via `DoDontList` (don't-only, matching source), the 2-card grid (Maliyet & gecikme katlanır / Sert derinlik duvarı) via `CardGrid`/`InfoCard`, and the danger `Callout` citing the "type-specific restrictions... ignored for nested spawns" quote

## Acceptance criteria

- [x] Both sections render on `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` with correct locale content
- [x] Advantages grid renders all 3 cards
- [x] Disadvantages section renders the 2-item don't block, the 2-card grid, and the danger callout
- [x] TOC anchors for `npro` and `ncon` are no longer placeholders
- [x] No inline `<style>` or bespoke CSS classes carried over
- [x] Page-level integration test asserts both sections' content for both locales
- [x] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/05-nested-mental-model-and-mechanism.md`
