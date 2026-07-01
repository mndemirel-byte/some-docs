# Migrate ChallengeCard onto Disclosure

Label: ready-for-agent

## Parent

`.scratch/component-consolidation/component-consolidation.md`

## What to build

Replace `ChallengeCard` (`src/components/doc/challenge-card.tsx`), used in `ai-coding-b1.mdx`, with a `Disclosure` usage. `ChallengeCard`'s current trigger is a numbered badge (`num`) plus a title — compose that as the `trigger` prop at each call site (or keep a thin `ChallengeCard`-shaped helper that composes the numbered-badge trigger and forwards to `Disclosure`, whichever keeps the six existing call sites in `ai-coding-b1.mdx` least noisy).

Delete `challenge-card.tsx` and its module CSS once no longer referenced.

## Acceptance criteria

- [ ] All six `ChallengeCard` usages in `ai-coding-b1.mdx` (both locales) render and toggle identically to before, via `Disclosure`
- [ ] `src/components/doc/challenge-card.tsx` and `challenge-card.module.css` are deleted
- [ ] Existing `ai-coding-b1` page-level integration tests still pass without weakening their assertions
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/component-consolidation/01-disclosure-module-and-expandable-example.md`
