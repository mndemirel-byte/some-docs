# Migrate "Choosing Models" and "Good Use Cases"

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

Add two more sections (source doc §09 and §10) to the guide page, both straightforward `CardGrid`/`InfoCard` migrations:

- "Choosing Models" — 4 cards (Haiku, Sonnet, Opus, Inherit) each with an icon/emoji, plus the closing "Simple rule" callout via `Callout`
- "Good Use Cases" — 7 cards (Research, Exploration, Code Review, Documentation, Copywriting, Design System, Fresh Perspective), each with an icon/emoji

## Acceptance criteria

- [ ] Both sections render on `/en/subagents-companion-guide` and `/tr/subagents-companion-guide` with correct locale content
- [ ] All model cards (4) and use-case cards (7) render with their icons/emoji intact
- [ ] TOC anchors for these sections resolve correctly
- [ ] No inline `<style>` or bespoke CSS classes carried over
- [ ] Existing page-level integration test is extended to assert these sections' content is present, in both locales
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/subagents-companion-guide/03-page-scaffold-and-mental-model.md`
