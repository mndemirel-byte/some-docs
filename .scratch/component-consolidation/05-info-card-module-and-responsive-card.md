# Build the InfoCard module and migrate ResponsiveCard onto it

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Tracer bullet for the info-card-family consolidation. Build a new deep `InfoCard` module (+ matching `CardGrid` wrapper): a single "icon + title + description" card currently reimplemented seven times (`ResponsiveCard`, `PrincipleCard`, `GridCard`, `TeamCard`, `SectionSkillCard`, `ResourceItem`, `ValueCard`), each in its own file and CSS module, differing only cosmetically (icon size, icon placement, title tag).

Interface: `icon`, `title`, optional `meta` (a secondary line — covers the "when"/"goal" uses seen in later migrations), `children` (the description body), optional `variant` for the cosmetic differences (icon-boxed vs icon-inline, compact vs spacious) resolved through existing design tokens.

Migrate `ResponsiveCard` (`src/components/doc/responsive-card-grid.tsx`), used in `setup.mdx`, onto `InfoCard` first — it's the plainest existing shape (icon + name + description, no `meta`), so this slice proves the base interface before later slices add `meta` and `variant` usage.

`ResourceItem` (`resource-list.tsx`) is explicitly out of scope for this whole consolidation — see the parent issue.

## Acceptance criteria

- [ ] `InfoCard` (+ `CardGrid`) module exists with the `icon`/`title`/`meta?`/`children`/`variant?` interface described above
- [ ] All `ResponsiveCard` usages in `setup.mdx` (both locales) render identically to before via `InfoCard`
- [ ] `src/components/doc/responsive-card-grid.tsx` and its module CSS are deleted
- [ ] Existing `setup` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

None - can start immediately
