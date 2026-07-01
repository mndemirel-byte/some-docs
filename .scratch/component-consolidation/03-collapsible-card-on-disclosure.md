# Migrate CollapsibleCard onto Disclosure

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `CollapsibleCard` (`src/components/doc/collapsible-card.tsx`), used in `setup.mdx`, with a `Disclosure` usage. `CollapsibleCard`'s current trigger is a kind-badge (`badge`/`badgeKind`: skill/agent/docs) plus a name and description line — compose that as the `trigger` prop at each call site.

Delete `collapsible-card.tsx` and its module CSS once no longer referenced.

## Acceptance criteria

- [ ] All `CollapsibleCard` usages in `setup.mdx` (both locales) render and toggle identically to before, via `Disclosure`, including the three badge-kind variants (skill/agent/docs)
- [ ] `src/components/doc/collapsible-card.tsx` and `collapsible-card.module.css` are deleted
- [ ] Existing `setup` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/01-disclosure-module-and-expandable-example.md`
