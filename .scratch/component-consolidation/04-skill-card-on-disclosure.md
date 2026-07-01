# Migrate SkillCard onto Disclosure

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `SkillCard` (`src/components/doc/skill-card.tsx`), used in `ai-coding-b2.mdx`'s skill map, with a `Disclosure` usage — the most complex of the four migrations. `SkillCard`'s current trigger is a letter badge (A–E, token-colored) plus a name/goal meta block plus a prerequisite tag; compose that as the `trigger` prop. The revealed body also has a "Who it's for" footer appended after `children` (icon + badge + text) — preserve that as part of the migrated body composition, not lost in the move.

`SkillCols`/`SkillCol` (also in `skill-card.tsx`) are unrelated two-column layout helpers for the revealed body content — keep them as-is; only `SkillCard` itself is being replaced.

Delete the `SkillCard` export and its associated styles from `skill-card.tsx`/`skill-card.module.css` once no longer referenced (leave `SkillCols`/`SkillCol` in place, possibly renaming the file if `SkillCard` was its primary export).

## Acceptance criteria

- [ ] All five `SkillCard` usages in `ai-coding-b2.mdx`'s skill map (both locales) render and toggle identically to before, via `Disclosure`, including the five distinct letter-badge accent colors (A–E)
- [ ] The "Who it's for" footer still renders inside the revealed body exactly as before
- [ ] `SkillCols`/`SkillCol` continue to work unchanged inside the migrated body
- [ ] Existing `ai-coding-b2` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/01-disclosure-module-and-expandable-example.md`
