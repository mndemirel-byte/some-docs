# Context

Domain glossary for the doc library project (`docs/design_handoff_doc_library/`). Vocabulary only — no implementation details; see `docs/adr/` for architectural decisions.

## Terms

**Theme** — the visual color variant of the site: `anthropic` (light) or `bright-saas` (dark). Purely visual, carries no content difference. Client-side state, persisted in `localStorage`, not part of the URL. See [[0002-theme-as-client-state-not-route]].

**Locale** — the content language: `tr` or `en`. Changes actual page content, not just chrome. Represented as a URL route segment (`/tr/...`, `/en/...`). See [[0001-nextjs-tailwind-nextintl-stack]].

**Index page** — the single card-grid landing page (one per locale) linking to the 4 doc pages. The only page that hosts the Switcher.

**Doc page** — one of the 4 long-form reference pages: `setup`, `ai-coding-b1`, `ai-coding-b2`, `matt-pocock-skills`. Authored per-locale as MDX (not next-intl translation keys) so structural content (terminal mockups, file trees) stays as rich markup. See [[0003-two-layer-i18n-json-plus-mdx]].

**Switcher** — the LIGHT/DARK + TR/EN control shown only on the Index page (top-left = theme, top-right = locale). Changing one axis does not affect the other.

**Design token** — a normalized CSS custom property representing one semantic color role (e.g. `--accent`, `--blue`). Deliberately deviates from the literal, inconsistent variable names in the original design files. See [[0005-normalize-design-token-names]].
