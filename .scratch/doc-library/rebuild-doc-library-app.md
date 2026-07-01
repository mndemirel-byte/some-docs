# Rebuild the AI Coding doc library as a real Next.js app (theme + locale)

Label: ready-for-agent

## Problem Statement

The "AI Coding Serisi" doc library (1 index + 4 long reference pages) currently exists only as 20 static HTML design references (`docs/design_handoff_doc_library/design-files/`) — 5 pages × 2 themes (Anthropic light / Bright SaaS dark) × 2 locales (TR/EN), each a hand-generated file. There is no real codebase: switching theme or language means navigating to a different static file/folder, colors are hardcoded per file rather than driven by a shared token system, and there's no way to add or edit content without touching raw HTML per combination.

Visitors need a single, real site where they can read the doc library in their preferred language and color theme, switch either independently at any time, and have that preference remembered — without the site maintaining 20 near-duplicate HTML files by hand.

## Solution

Build a Next.js app (App Router) that renders the Index page and the 4 Doc pages, with Locale (`tr`/`en`) as a route segment and Theme (`anthropic`/`bright-saas`) as client-side state persisted in `localStorage`. Colors are driven entirely by a normalized set of Design tokens (CSS custom properties) so no page hardcodes hex values. The Switcher (Index page only) lets a visitor change Theme and Locale independently, preserving the other axis. Doc page content is authored per-locale as MDX; short UI chrome strings go through `next-intl` translation keys. The whole site ships as a full static export.

## User Stories

1. As a first-time visitor, I want the site to load in English with the Anthropic (light) theme by default, so that I get a consistent, predictable experience regardless of my browser or OS settings.
2. As a visitor, I want to click DARK on the Switcher, so that the whole site (not just the Index page) switches to the Bright SaaS theme.
3. As a visitor, I want my theme choice to persist across visits (via `localStorage`), so that I don't have to reselect it every time I return.
4. As a visitor, I want to click TR on the Switcher, so that I can read the Index and any Doc page I navigate to in Turkish.
5. As a visitor who switches Theme, I want my Locale to stay exactly as it was, so that the two axes never interfere with each other.
6. As a visitor who switches Locale, I want my Theme to stay exactly as it was, so that the two axes never interfere with each other.
7. As a visitor, I want the currently active Theme option to be shown as non-clickable/highlighted and only the inactive option to be clickable, so that the Switcher's affordance matches the original design spec.
8. As a visitor, I want the Switcher visible only on the Index page (top-left = theme, top-right = locale), so that Doc pages stay focused on reading without UI clutter.
9. As a visitor on a small screen (≤660px), I want the Switcher to shrink to the documented mobile sizing, so that it doesn't crowd the page.
10. As a visitor, I want to open one of the 4 Doc pages (setup, ai-coding-b1, ai-coding-b2, matt-pocock-skills) from the Index card grid, so that I can read the full reference content.
11. As a visitor reading a Doc page, I want terminal mockups, file-tree visualizations, code blocks, and skill-letter badges to render with full fidelity to the original design, so that the content is just as readable as the HTML reference.
12. As a visitor reading a Doc page in Turkish, I want the Turkish text to come from the actual Turkish content authored for that page (not a partial/placeholder translation), so that the page reads naturally.
13. As a visitor reading a Doc page in English, I want the same guarantee for English content.
14. As a visitor, I want a direct link to a specific Doc page in a specific Locale (e.g. `/tr/setup`) to be shareable and bookmarkable, so that I can send someone straight to the right content in the right language.
15. As a visitor sharing a link, I want the recipient to see the page in their own stored (or default) Theme rather than the sender's, so that Theme never leaks into a shared URL.
16. As a visitor, I want the Index page's 4 cards to keep their per-card accent colors (c1–c4) exactly as specified, so that visual hierarchy between doc types is preserved.
17. As a visitor on `setup`, I want the file-tree mockup's folder name / special file name / folder icon colors to switch correctly between the two themes, so that the mockup stays legible and on-brand in both.
18. As a visitor on `ai-coding-b2` or `matt-pocock-skills`, I want the 5 skill-letter badge colors (accent/blue/green/amber/red) to render correctly in both themes.
19. As a visitor on `matt-pocock-skills`, I want the terminal window header background to use the correct theme-specific surface color.
20. As a content maintainer, I want Doc page content authored as per-locale MDX files rather than translation-key JSON, so that I can write rich structural content (mockups, trees, code) naturally instead of flattening it into string keys.
21. As a content maintainer, I want short UI chrome text (Switcher labels, meta tags, footer, card titles/descriptions) in `next-intl` JSON catalogs, so that small text edits don't require touching MDX content files.
22. As a developer, I want all colors sourced from a single normalized Design token set (not per-page-type variable names like the original `--pink`/`--red` split), so that the token system is consistent and easy to extend.
23. As a developer, I want the exact hex/rgba values from the design handoff's Design Tokens tables preserved verbatim (only names normalized, not values), so that visual fidelity to the approved design is maintained.
24. As a developer, I want icons sourced from `@tabler/icons-react` as a local dependency (not the Tabler webfont CDN), so that the static export has no external runtime icon dependency and only used icons are bundled.
25. As a developer, I want the whole app built with `output: 'export'` (no Node server), so that it can be deployed to any static host with no dynamic backend to run or scale.
26. As a developer, I want first-visit defaults (`en` locale, `anthropic` theme) to be fixed rather than detected from `Accept-Language` or `prefers-color-scheme`, so that first paint is deterministic and compatible with static generation.
27. As a project stakeholder, I want to visually compare all 4 theme/locale combinations (Anthropic+TR, Bright SaaS+TR, Anthropic+EN, Bright SaaS+EN) once the app is built, so that I can confirm fidelity to the design handoff before considering this done.

## Implementation Decisions

- **Stack**: Next.js (App Router) + Tailwind CSS + `next-intl`. See [[0001-nextjs-tailwind-nextintl-stack]].
- **Locale** (`tr` | `en`) is a route segment (`/tr/...`, `/en/...`), resolved via `next-intl`'s App Router routing. See [[0001-nextjs-tailwind-nextintl-stack]].
- **Theme** (`anthropic` | `bright-saas`) is client-side React state, persisted to `localStorage`, applied via a `data-theme` attribute on `<html>` that switches the active CSS custom property set. Not part of the URL. See [[0002-theme-as-client-state-not-route]].
- **Content architecture** is two-layered:
  - UI chrome (Switcher labels, meta tags, footer, Index card titles/descriptions) — `next-intl` translation-key JSON (`messages/tr.json`, `messages/en.json`).
  - The 4 Doc pages' bodies — per-locale MDX files (`content/tr/<slug>.mdx`, `content/en/<slug>.mdx`), authored as MDX/JSX so structural content (terminal mockups, file trees) stays as rich markup instead of translation strings.
  - See [[0003-two-layer-i18n-json-plus-mdx]].
- **Rendering mode**: full static export (`output: 'export'`), all locale × page routes generated at build time via `generateStaticParams`, no server-side runtime logic anywhere. See [[0004-full-static-export]].
- **Design tokens**: single normalized CSS custom property set (one name per semantic color role — no `--pink`/`--red` split, no `--cyan`/`--blue` synonym). Token *names* deviate from the literal design files; token *values* (hex/rgba) are taken verbatim from `docs/design_handoff_doc_library/README.md`'s Design Tokens tables per theme. See [[0005-normalize-design-token-names]].
- **Icons**: `@tabler/icons-react` (React components, local npm dependency), replacing the original Tabler webfont CDN.
- **First-visit defaults**: Locale defaults to `en`, Theme defaults to `anthropic`. Both fixed — no `Accept-Language` negotiation, no `prefers-color-scheme` detection. Overridden only once a visitor explicitly uses the Switcher, after which the choice persists via `localStorage`. See [[0006-default-locale-en-theme-anthropic]].
- **Switcher interaction**: preserves the original spec exactly — active option rendered as a non-clickable, highlighted element; only the inactive option is clickable/actionable. Two independent toggles (theme, locale) that never affect each other.
- **Deploy target**: not yet finalized; proceed assuming Vercel (static export) as the default target, revisit if a different host is specified later.
- Typography, spacing, radius, and shadow values are taken directly from `docs/design_handoff_doc_library/README.md`'s "Tipografi" and "Spacing & Radius" sections — no new decisions needed there.

## Testing Decisions

- **Single seam, highest point possible**: page-level integration rendering. Render the real Next.js route (`/[locale]/[page]`) end-to-end (React Testing Library and/or Playwright against the static export) and assert against the rendered DOM — not against isolated internal functions (e.g. don't unit-test a `getPageContent()`-style resolver in isolation).
- A good test in this seam exercises real behavior a visitor would see: correct locale content rendering, correct default theme/locale on first load, Switcher click changing theme/locale independently (and persisting to `localStorage`), and only the inactive Switcher option being interactive. It should not assert on internal module boundaries (how content resolution or state management is structured internally) — those can be refactored freely as long as rendered behavior is unchanged.
- Modules to be tested through this seam: Index page, all 4 Doc pages, the Switcher component, and the theme/locale persistence behavior — all exercised together through rendered routes rather than as separate unit suites.
- No prior art exists in this repo (greenfield) — this PRD establishes the pattern; follow `/tdd`'s integration-style philosophy (behavior through public interface, not implementation details) for all tests going forward in this project.

## Out of Scope

- CI/CD pipeline and deployment automation (Vercel project setup, deploy triggers) — deploy target itself is not finalized.
- Any dynamic/server-side data, authentication, or per-request personalization — explicitly ruled out by the static-export decision.
- SEO metadata beyond basic per-locale page content (structured data, sitemap generation, social preview images) unless separately requested.
- Automated visual regression / screenshot-diff tooling — the acceptance step is a manual visual comparison of the 4 theme/locale combinations, not automated pixel comparison.
- Accessibility audit beyond what's inherited from faithfully reproducing the design spec.
- Any CMS or non-file-based content authoring workflow — content stays as MDX/JSON files in the repo.

## Further Notes

- Source of truth for exact colors, typography, and spacing remains `docs/design_handoff_doc_library/README.md`; source of truth for pixel-level behavior of individual pages remains the HTML files under `docs/design_handoff_doc_library/design-files/`.
- `docs/design_handoff_doc_library/screenshots/` contains 12 reference images useful for visual QA during and after implementation.
- All 6 ADRs referenced above live in `docs/adr/`; `CONTEXT.md` at the repo root defines the domain vocabulary (Theme, Locale, Index page, Doc page, Switcher, Design token) used throughout this PRD.
- This PRD was synthesized from a `/grilling` session (via `/grill-with-docs`) — no further stakeholder interview should be needed before implementation starts; open questions should default to what's written here.
