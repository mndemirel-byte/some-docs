# Migrate ValueCard onto InfoCard

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `ValueCard` (`src/components/doc/value-row.tsx`), used in `matt-pocock-skills.mdx`'s "value of this step" callouts, with an `InfoCard` usage. This is the last and most visually distinct migration — `ValueCard` places a large icon above a centered title/description ("stat" layout) rather than icon-before-title. Add this as another `InfoCard` `variant` if the base interface didn't already anticipate it.

Delete `value-row.tsx` and its module CSS once no longer referenced.

## Acceptance criteria

- [ ] All `ValueCard` usages in `matt-pocock-skills.mdx` (both locales) render identically to before via `InfoCard`, including the stat-style layout (large centered icon above title)
- [ ] `src/components/doc/value-row.tsx` and its module CSS are deleted
- [ ] Existing `matt-pocock-skills` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/05-info-card-module-and-responsive-card.md`
