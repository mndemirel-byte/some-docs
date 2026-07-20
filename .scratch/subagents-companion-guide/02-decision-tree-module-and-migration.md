# Build the DecisionTree module and migrate "Should I Use a Subagent?"

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

New `DecisionTree` module in `src/components/doc/` for the source doc's `.tree`/`.q`/`.branches`/`.branch` pattern: a vertical stack of question cards, each with a question and two branches (yes/no), each branch carrying its own outcome label (e.g. "YES → Main Thread", "NO → Continue"). No existing site component does yes/no branching — `StateFlow`/`State`/`StateArrow` is the closest analog but is linear, not branching, so this is a genuinely new component rather than a variant of an existing one.

Interface: `DecisionTree` wraps `DecisionQuestion` children; each `DecisionQuestion` takes the question text and two `DecisionBranch` children (`outcome="yes" | "no"`, label/destination text).

This is the only usage of this pattern in the source doc ("Should I Use a Subagent?", 5 questions), so build and migrate it in the same issue rather than deferring migration.

Draft the migration as an MDX fragment for now (the page it belongs to doesn't exist yet — see `03-page-scaffold-and-mental-model.md`); verify it via isolated preview or test, and reuse the same MDX when section 12 is assembled into the real page.

## Acceptance criteria

- [ ] `DecisionTree`/`DecisionQuestion`/`DecisionBranch` module exists in `src/components/doc/`
- [ ] Component renders correctly under both themes and both locales, including the mobile layout (branches stack vertically instead of side-by-side, matching the source doc's responsive behavior)
- [ ] A component-level test covers rendering multiple questions each with a yes/no branch
- [ ] "Should I Use a Subagent?" (5 questions) is drafted as MDX using `DecisionTree` and verified to render correctly, ready to drop into the page assembled in issue 03
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

None - can start immediately
