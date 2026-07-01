# Theme switching on the Index page (client state + localStorage)

Label: ready-for-agent

## Parent

`.scratch/doc-library/rebuild-doc-library-app.md`

## What to build

Add Theme (`anthropic`/`bright-saas`) as client-side React state, persisted to `localStorage`, applied via a `data-theme` attribute on `<html>` that switches the active Design token set — not part of the URL, per [[0002-theme-as-client-state-not-route]]. Add the Switcher's Theme toggle (top-left on the Index page, alongside the Locale toggle built in slice 2): active theme rendered as a non-clickable, highlighted element; the inactive theme is a clickable control that switches the theme in place (no navigation). Apply the same non-clickable-active/clickable-inactive interaction spec used for the Locale toggle.

First-visit theme defaults to `anthropic` (fixed, no `prefers-color-scheme` detection), per [[0006-default-locale-en-theme-anthropic]]. A returning visitor's stored theme preference must be read before first paint to avoid a flash of the wrong theme.

## Acceptance criteria

- [ ] Clicking DARK switches the whole Index page to the Bright SaaS token set; clicking LIGHT switches back to Anthropic
- [ ] Theme choice persists in `localStorage` and is restored on a subsequent visit/reload without a flash of the wrong theme
- [ ] Switching theme does not alter the current Locale or navigate to a different URL
- [ ] The active theme option is non-clickable/highlighted; only the inactive option is clickable, matching the Locale toggle's interaction spec
- [ ] First-visit (no stored preference) shows the Anthropic theme regardless of OS `prefers-color-scheme`
- [ ] A page-level integration test renders the Index route, simulates clicking the inactive theme option, and asserts the token set changes and the choice is persisted (e.g. via a mocked `localStorage`), independent of locale

## Blocked by

- `.scratch/doc-library/01-scaffold-tokens-index-shell.md`
