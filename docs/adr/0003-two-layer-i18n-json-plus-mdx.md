# 0003. Two-layer i18n: next-intl JSON for UI chrome, per-locale MDX for doc content

## Status

Accepted

## Context

[[0001-nextjs-tailwind-nextintl-stack]] chose `next-intl` for i18n. `next-intl`'s standard pattern is translation-key JSON catalogs (`messages/tr.json`, `messages/en.json`), which fits short UI strings well (buttons, labels, switcher text) but poorly fits the 4 long-form doc pages (setup, ai-coding-b1, ai-coding-b2, matt-pocock-skills), which contain rich structural content — terminal mockups, file-tree visualizations, code blocks — not just prose.

## Decision

Split i18n into two layers:
- **UI chrome** (switcher labels, meta tags, footer, index card titles/descriptions): `next-intl` translation-key JSON (`messages/tr.json`, `messages/en.json`).
- **Long-form doc page content**: per-locale MDX files (`content/tr/setup.mdx`, `content/en/setup.mdx`, etc.), allowing rich content (terminal mockups, file trees) to be authored as MDX/JSX rather than flattened into translation-key strings.

## Consequences

- Two content mechanisms coexist for i18n instead of one — a future contributor must know which layer a given piece of text belongs to (short UI string → JSON key, doc body → MDX file).
- Doc content authoring stays close to the original design fidelity (structural mockups as components), rather than being awkwardly key-value encoded.
- Adds an MDX toolchain (`@next/mdx` or `next-mdx-remote`) as a dependency alongside `next-intl`.
