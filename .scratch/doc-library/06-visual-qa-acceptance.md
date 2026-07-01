# Visual QA: verify all 4 theme x locale combinations

Label: ready-for-agent

## Parent

`.scratch/doc-library/rebuild-doc-library-app.md`

## What to build

Build the full static export and visually verify all 4 Theme × Locale combinations (Anthropic+TR, Bright SaaS+TR, Anthropic+EN, Bright SaaS+EN) across all 5 pages (Index + 4 Doc pages) against the reference screenshots in `docs/design_handoff_doc_library/screenshots/` and the original HTML files in `docs/design_handoff_doc_library/design-files/`. This is the PRD's closing acceptance step — no automated screenshot-diff tooling is in scope, per the PRD's Out of Scope section; this is a manual comparison pass.

## Acceptance criteria

- [x] Static export builds successfully with no server dependency
- [x] Anthropic+TR combination visually matches the design references across all 5 pages
- [x] Bright SaaS+TR combination visually matches the design references across all 5 pages
- [x] Anthropic+EN combination visually matches the design references across all 5 pages
- [x] Bright SaaS+EN combination visually matches the design references across all 5 pages
- [x] Switcher behavior (independent theme/locale toggling, active/inactive interaction spec) re-verified end-to-end on the final build
- [x] Findings (any visual discrepancies) are reported back, even if no code change is made as part of this issue

## Findings (2026-07-01)

Two real, previously-undetected bugs were found and fixed during this pass (not just visual discrepancies — both were functional regressions masked by how earlier per-slice visual checks were done: setting `data-theme` via script and screenshotting immediately, which happened to outrun the bugs below).

1. **Nested `<p>`/`<span>` inside block-level MDX content caused a hydration failure that reset theme/locale state on every doc page.** Nine shared components (`Callout`, `WorkflowStep`, `KeyQuote`, `PrincipleCard`, `SimplePrincipleCard`, `TeamCard`, `GroupedFlowStep`, `HeroAuthor`, `ResourceItem`) wrapped `{children}` in a `<p>` or `<span>`. When used as block-level MDX tags (opening tag on its own line), MDX auto-wraps the inner content in its own `<p>`, producing invalid nesting (`<p><p>` or `<span><p>`). React detected the mismatch, discarded the SSR tree, and re-rendered from the client-computed default — which silently reset `data-theme` back to `anthropic` on every doc page load. Fixed by changing all nine wrappers to `<div>` (safe for arbitrary flow content), adjusting two CSS selectors (`.content span` → `.content div` in `grouped-flow.module.css`) to match.
2. **Locale switch (client-side navigation) reverted the theme to default.** `ThemeSwitcher`'s `useSyncExternalStore` only wrote `data-theme` to the DOM inside its click handler — nothing reapplied the persisted theme when the `[locale]` layout remounted for a locale change. Fixed by adding an always-mounted `ThemeSync` client component (`src/app/[locale]/theme-sync.tsx`) to the root layout that reasserts the stored theme from `localStorage` on every mount.

Both fixes verified via: dev-mode hydration-error-free scan across all 10 routes, static-export theme-persistence check across full navigation chains (theme click → locale click → doc-page click → reload), and visual screenshots confirming Bright SaaS+TR renders correctly on `ai-coding-b1` and `matt-pocock-skills` after a realistic `localStorage`-driven flow (not just an immediate post-script screenshot).

No other visual discrepancies found against the reference screenshots/HTML. Minor TOC column-count differences observed in some screenshots are expected responsive behavior at different viewport widths, not defects.

## Blocked by

- `.scratch/doc-library/03-theme-switching.md`
- `.scratch/doc-library/05-remaining-doc-pages.md`
