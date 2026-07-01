# AI Coding Series — Document Library

A Next.js rebuild of a static-HTML "AI Coding Series" doc library: an index page plus four long-form documentation pages, each available in English and Turkish, with a switchable light/dark theme.

## Pages

- **Index** — card grid linking to all four documents
- **Claude Code Agentic Project Setup** (`/setup`)
- **Disciplined Software Development with AI Coding Agents** (`/ai-coding-b1`)
- **Best Practices and the Team Model** (`/ai-coding-b2`)
- **Building a Project from Scratch with Matt Pocock Skills** (`/matt-pocock-skills`)

## Stack

- **Next.js 16** (App Router, Turbopack, full static export via `output: "export"`)
- **next-intl** for locale routing — locale is a URL segment (`/en`, `/tr`)
- **MDX** (`@next/mdx` + `@mdx-js/rollup`) for long-form doc content, one file per locale
- **Tailwind CSS v4** with normalized CSS custom-property design tokens for two themes (`anthropic`, `bright-saas`)
- **Vitest** + **React Testing Library** for page-level integration tests

Theme is client-side state (not part of the URL), persisted to `localStorage` and synced via `useSyncExternalStore`. First visit always defaults to English + the Anthropic theme (see `docs/adr/`).

## Development

```bash
npm install
npm run dev       # start the dev server
npm test          # run the test suite
npm run lint      # lint
npm run build     # produce the static export in out/
```

## Project history

This app was built end-to-end with an agentic skill pipeline: `/grill-with-docs` → `/to-prd` → `/to-issues` → `/tdd`, working through six vertical-slice issues tracked as local markdown files under `.scratch/doc-library/`. See `CONTEXT.md` for the project's domain glossary and `docs/adr/` for the architectural decisions made along the way.
