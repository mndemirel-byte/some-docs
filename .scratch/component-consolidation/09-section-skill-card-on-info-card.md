# Migrate SectionSkillCard onto InfoCard

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `SectionSkillCard` (`src/components/doc/section-skill-card.tsx`), used in `matt-pocock-skills.mdx`'s helper-skills section, with an `InfoCard` usage. This is the first migration to need the `meta` slot — `SectionSkillCard`'s `when` prop (a secondary line under the title) — and the boxed-icon visual variant (icon inside a bordered square, rather than inline before the title). Extend `InfoCard`'s `meta`/`variant` support if the base interface from `05` didn't already cover both.

Delete `section-skill-card.tsx` and its module CSS once no longer referenced.

## Acceptance criteria

- [ ] All `SectionSkillCard` usages in `matt-pocock-skills.mdx` (both locales) render identically to before via `InfoCard`, including the `when` secondary line and the boxed-icon layout
- [ ] `src/components/doc/section-skill-card.tsx` and its module CSS are deleted
- [ ] Existing `matt-pocock-skills` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/05-info-card-module-and-responsive-card.md`
