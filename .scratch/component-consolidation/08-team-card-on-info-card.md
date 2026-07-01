# Migrate TeamCard onto InfoCard

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `TeamCard` (`src/components/doc/team-grid.tsx`), used in `ai-coding-b2.mdx`, with an `InfoCard` usage.

Delete `team-grid.tsx` and its module CSS once no longer referenced.

## Acceptance criteria

- [ ] All `TeamCard` usages in `ai-coding-b2.mdx` (both locales) render identically to before via `InfoCard`
- [ ] `src/components/doc/team-grid.tsx` and its module CSS are deleted
- [ ] Existing `ai-coding-b2` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/05-info-card-module-and-responsive-card.md`
