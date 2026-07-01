# Migrate GridCard onto InfoCard

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `GridCard` (`src/components/doc/two-col-grid.tsx`) with an `InfoCard` usage. `GridCard` is used on two Doc pages (`ai-coding-b1.mdx` and `matt-pocock-skills.mdx`), and is the first migration to need the optional per-instance `iconColor` override — extend `InfoCard`'s `variant`/icon handling to support it if the base interface from `05` didn't already account for it.

Delete `two-col-grid.tsx` and its module CSS once no longer referenced.

## Acceptance criteria

- [ ] All `GridCard` usages in both `ai-coding-b1.mdx` and `matt-pocock-skills.mdx` (both locales) render identically to before via `InfoCard`, including per-instance icon colors
- [ ] `src/components/doc/two-col-grid.tsx` and its module CSS are deleted
- [ ] Existing `ai-coding-b1` and `matt-pocock-skills` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/05-info-card-module-and-responsive-card.md`
