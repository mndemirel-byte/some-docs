# Migrate PrincipleCard onto InfoCard

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `PrincipleCard` (`src/components/doc/principles-grid.tsx`), used alongside `ResponsiveCard` in `setup.mdx`, with an `InfoCard` usage. Same shape as `ResponsiveCard` (icon + title + description, no `meta`) — this slice should be close to mechanical once `05-info-card-module-and-responsive-card.md` is done, and is a good check that the base `InfoCard` interface needs no changes for a second real call site.

Delete `principles-grid.tsx` and its module CSS once no longer referenced.

## Acceptance criteria

- [ ] All `PrincipleCard` usages in `setup.mdx` (both locales) render identically to before via `InfoCard`
- [ ] `src/components/doc/principles-grid.tsx` and its module CSS are deleted
- [ ] Existing `setup` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/05-info-card-module-and-responsive-card.md`
