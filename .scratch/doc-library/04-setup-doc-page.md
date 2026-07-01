# First Doc page end-to-end: `setup`

Label: ready-for-agent

## Parent

`.scratch/doc-library/rebuild-doc-library-app.md`

## What to build

Establish the Doc page content pipeline using the `setup` page as the proving case: author its content as per-locale MDX files (`content/en/setup.mdx`, `content/tr/setup.mdx`), per [[0003-two-layer-i18n-json-plus-mdx]], reproducing the original design's terminal mockups, file-tree visualization, and code blocks with full fidelity. Wire the Index page's `setup` card to a real link (`/[locale]/setup`). Apply the file-tree mockup's theme-specific color points (folder name, special file name, folder icon) via the Design tokens established in slice 1, per [[0005-normalize-design-token-names]] (verbatim hex values from the README per theme).

This slice does not need the Switcher UI to be present on the Doc page itself (the Switcher only appears on the Index page, per the original spec) — it only needs the Locale routing (slice 2) and Theme token set (slice 1) to already exist.

## Acceptance criteria

- [ ] `/en/setup` and `/tr/setup` both render with the correct locale-specific MDX content, matching the original HTML design references for fidelity
- [ ] Terminal mockup, file-tree visualization, and code blocks render correctly and match the design references
- [ ] File-tree colors (folder name, special file name, folder icon) render the correct theme-specific hex values under both `anthropic` and `bright-saas` `data-theme` states
- [ ] The Index page's `setup` card links to `/[locale]/setup` (real link, no longer a placeholder)
- [ ] No UI chrome (Switcher) appears on the Doc page itself
- [ ] A page-level integration test renders `/en/setup` and `/tr/setup` and asserts correct locale content is present, and asserts file-tree token colors resolve correctly under both theme states

## Blocked by

- `.scratch/doc-library/01-scaffold-tokens-index-shell.md`
- `.scratch/doc-library/02-locale-switching.md`
