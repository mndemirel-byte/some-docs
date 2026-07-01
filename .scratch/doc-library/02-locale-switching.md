# Locale switching on the Index page (route segment + next-intl chrome)

Label: ready-for-agent

## Parent

`.scratch/doc-library/rebuild-doc-library-app.md`

## What to build

Add Locale (`tr`/`en`) as a route segment using `next-intl`'s App Router integration, per [[0001-nextjs-tailwind-nextintl-stack]]. Move the Index page's UI chrome text (header copy, card titles/descriptions, footer, meta tags) into `next-intl` translation-key JSON catalogs (`messages/tr.json`, `messages/en.json`), per [[0003-two-layer-i18n-json-plus-mdx]]. Build the Switcher component shell (fixed-position container, top-right on the Index page only) with the Locale toggle: active locale rendered as a non-clickable, highlighted element; the inactive locale is a clickable link that navigates to the same page under the other locale segment. Apply the documented mobile sizing breakpoint (≤660px) to the switcher container.

First-visit locale defaults to `en` (fixed, no `Accept-Language` negotiation), per [[0006-default-locale-en-theme-anthropic]].

## Acceptance criteria

- [ ] `/en` and `/tr` both render the Index page with correct locale-specific chrome text from `next-intl` JSON catalogs
- [ ] A direct link to `/tr` (or `/en`) is shareable/bookmarkable and renders that locale on first load without depending on browser language
- [ ] The Switcher's locale toggle appears only on the Index page, positioned top-right
- [ ] Clicking the inactive locale option navigates to the equivalent page under the other locale segment; the active option is not clickable
- [ ] Switching locale does not alter the current Theme
- [ ] Switcher container follows the documented mobile sizing at ≤660px
- [ ] A page-level integration test renders both `/en` and `/tr` Index routes and asserts correct chrome text per locale, and asserts clicking the inactive locale option navigates correctly

## Blocked by

- `.scratch/doc-library/01-scaffold-tokens-index-shell.md`
