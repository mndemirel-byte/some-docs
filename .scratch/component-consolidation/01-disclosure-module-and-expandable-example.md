# Build the Disclosure module and migrate ExpandableExample onto it

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Tracer bullet for the disclosure-family consolidation. Build a new deep `Disclosure` module: a single component that owns all open/close state, the `aria-expanded` toggle, and the chevron rotation — currently reimplemented independently in `SkillCard`, `ChallengeCard`, `CollapsibleCard`, and `ExpandableExample`.

Interface: `Disclosure` takes a `trigger` prop (the always-visible header content, composed by the caller as a `ReactNode`) and `children` (the revealed body). The caller owns what the trigger looks like; `Disclosure` only owns whether the body is shown.

Migrate `ExpandableExample` (`src/components/doc/expandable-example.tsx`) onto `Disclosure` first — it already has the simplest trigger (a plain label) and is already reused across three Doc pages (`ai-coding-b1.mdx`, `ai-coding-b2.mdx`, `matt-pocock-skills.mdx`), so this slice proves the new interface against real, varied call sites in one pass. `ExpandableExample` can either become a thin wrapper around `Disclosure` (label → trigger) or be replaced by direct `Disclosure` usage in the three MDX files — pick whichever keeps the MDX call sites simplest.

## Acceptance criteria

- [ ] `Disclosure` module exists with a `trigger`/`children` interface, its own open/close state, and correct `aria-expanded` behavior
- [ ] One interaction test on `Disclosure` directly: click toggles `aria-expanded` and reveals/hides the body — this is the seam that four separate implementations previously each needed their own version of
- [ ] All existing `ExpandableExample` usages in `ai-coding-b1.mdx`, `ai-coding-b2.mdx`, `matt-pocock-skills.mdx` (both locales) render and toggle identically to before
- [ ] Existing page-level integration tests for `ai-coding-b1`, `ai-coding-b2`, `matt-pocock-skills` still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` (static export) pass

## Blocked by

None - can start immediately
