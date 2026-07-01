# Component consolidation: deepen the disclosure and info-card families

Label: ready-for-agent

## What to build

Parent tracking issue for the two "Strong" candidates surfaced by an `/improve-codebase-architecture` review of `src/components/doc/`: four shallow disclosure (open/close) modules and seven shallow info-card modules, each family built once per `/tdd` session with no reuse across Doc pages.

Both consolidations follow the same shape: build the new deep module + migrate its simplest existing usage as a tracer bullet (one issue), then migrate each remaining usage one at a time (one issue each), verified independently. Do not build the new module and defer all migrations to a final big-bang issue.

**Disclosure family** (children of this issue, in order):
1. `.scratch/component-consolidation/01-disclosure-module-and-expandable-example.md`
2. `.scratch/component-consolidation/02-challenge-card-on-disclosure.md`
3. `.scratch/component-consolidation/03-collapsible-card-on-disclosure.md`
4. `.scratch/component-consolidation/04-skill-card-on-disclosure.md`

**Info-card family** (children of this issue, in order):
5. `.scratch/component-consolidation/05-info-card-module-and-responsive-card.md`
6. `.scratch/component-consolidation/06-principle-card-on-info-card.md`
7. `.scratch/component-consolidation/07-grid-card-on-info-card.md`
8. `.scratch/component-consolidation/08-team-card-on-info-card.md`
9. `.scratch/component-consolidation/09-section-skill-card-on-info-card.md`
10. `.scratch/component-consolidation/10-value-card-on-info-card.md`

**Explicitly out of scope:** `ResourceItem` (`src/components/doc/resource-list.tsx`, used in `matt-pocock-skills.mdx`). It renders a real `<li>` inside a `<ul>` — a list item, not a grid card — so folding it into `InfoCard`'s div-based shape would be the wrong semantic fit. Leave it as-is.

## Acceptance criteria

- [x] All 10 child issues completed
- [x] `src/components/doc/collapsible-card.tsx` is deleted, fully replaced by `Disclosure`. `challenge-card.tsx` and `expandable-example.tsx` remain as thin wrappers composing their family-specific trigger and forwarding to `Disclosure` (per issues 01/02's explicit "keep a thin wrapper" option); `skill-card.tsx` remains, now holding only `SkillCols`/`SkillCol` (per issue 04's explicit instruction) — `SkillCard` itself was deleted and replaced by `Disclosure` + `SkillCardTrigger`/`SkillCardFooter`
- [x] `src/components/doc/responsive-card-grid.tsx`, `principles-grid.tsx`, `two-col-grid.tsx`, `team-grid.tsx`, `section-skill-card.tsx`, `value-row.tsx` are deleted, fully replaced by `InfoCard`
- [x] All four Doc pages (`setup`, `ai-coding-b1`, `ai-coding-b2`, `matt-pocock-skills`) still pass their existing page-level integration tests, in both locales
- [ ] Visual QA (both themes, both locales) confirms no regression on any migrated card/disclosure — same pattern used in `06-visual-qa-acceptance.md`

## Blocked by

None - can start immediately
