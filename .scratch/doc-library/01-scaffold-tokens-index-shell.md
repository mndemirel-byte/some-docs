# Scaffold + design token system + Index page shell (default en/anthropic)

Label: ready-for-agent

## Parent

`.scratch/doc-library/rebuild-doc-library-app.md`

## What to build

Initialize the Next.js (App Router) + Tailwind CSS project as a full static export (`output: 'export'`), per [[0001-nextjs-tailwind-nextintl-stack]] and [[0004-full-static-export]]. Define the normalized Design token set (one CSS custom property per semantic color role — no `--pink`/`--red` split, no `--cyan`/`--blue` synonym) for both themes, with hex/rgba values taken verbatim from `docs/design_handoff_doc_library/README.md`'s Design Tokens tables, per [[0005-normalize-design-token-names]]. Build the Index page shell: header, divider, and 4-card grid (each card keeping its own accent color, c1–c4), rendered with the fixed default Theme (`anthropic`) — locale routing and the Switcher are not part of this slice, so the page can be built at a single default route for now. Icons use `@tabler/icons-react` from the start (no CDN webfont ever introduced).

Card links to the 4 doc pages may be placeholder/disabled at this point — they'll be wired to real pages in slices 4 and 5.

Typography, spacing, radius, and shadow values come directly from the README's "Tipografi" and "Spacing & Radius" sections.

## Acceptance criteria

- [ ] `next build` with `output: 'export'` succeeds and produces a static Index page with no server dependency
- [ ] All colors on the Index page are read from CSS custom properties (Design tokens) — no hardcoded hex values in component code
- [ ] Token values match the README's Anthropic (light) table verbatim
- [ ] Index page renders header, divider, and a 4-card grid with each card's correct accent color (c1–c4)
- [ ] Icons render via `@tabler/icons-react` components, not a webfont/CDN
- [ ] A page-level integration test (per the PRD's Testing Decisions) renders the Index route and asserts the default theme's token values are applied and the 4 cards render with correct accent colors

## Blocked by

None - can start immediately
