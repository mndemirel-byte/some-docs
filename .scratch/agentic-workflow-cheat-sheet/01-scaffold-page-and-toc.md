# Scaffold the agentic-workflow-cheat-sheet doc page

Label: ready-for-agent

## What to build

Add a new Doc page at slug `agentic-workflow-cheat-sheet`, following the existing per-locale MDX pattern used by `setup`, `ai-coding-b1`, `ai-coding-b2`, and `matt-pocock-skills`:

- `src/app/[locale]/agentic-workflow-cheat-sheet/page.tsx` — thin wrapper mirroring `src/app/[locale]/setup/page.tsx`: dynamically imports `../../../../content/${locale}/agentic-workflow-cheat-sheet.mdx` and renders it inside `PageWrap`.
- `content/en/agentic-workflow-cheat-sheet.mdx` and `content/tr/agentic-workflow-cheat-sheet.mdx` — stub content using `Hero` (title "Agentic Development Cheat Sheet" / Turkish equivalent, short description drawn from the source reference) followed by a `Toc` with 13 entries matching the section list below, and 13 empty `Section` placeholders (one per `id`/`num`/`title`) ready for content in later slices.
- A route-level test `page.test.tsx` mirroring the existing pattern (renders `/en/agentic-workflow-cheat-sheet` and `/tr/agentic-workflow-cheat-sheet`, asserts locale-correct title/hero text is present).
- Wire a new card into the Index page: add an entry to `messages/en.json` and `messages/tr.json` (title + short description, matching the existing card copy shape) and register the card/link in the index page's card list so it routes to `/[locale]/agentic-workflow-cheat-sheet`.

Section list for the `Toc` (id — title):

01. `mental` — Mental model
02. `structure` — File structure
03. `setup` — Setup commands
04. `claude` — CLAUDE.md
05. `rules` — rules
06. `settings` — settings.json
07. `commands` — commands
08. `skills` — skills
09. `agents` — agents
10. `hooks` — hooks
11. `plugin` — plugin
12. `context` — context / token management
13. `patterns` — Do / Don't

Content source (Turkish/English copy to draw from) is a standalone reference file: `docs/requirements/agentic-setup-reference-cheat-sheet.html`. Do not link to it or ship it — it's the source material for this and the following slices, not something to reference from the app.

## Acceptance criteria

- [ ] `/en/agentic-workflow-cheat-sheet` and `/tr/agentic-workflow-cheat-sheet` both render, each with locale-correct `Hero` title/description and a `Toc` listing all 13 sections
- [ ] All 13 `Section` placeholders exist with correct `id`/`num`/`title`, ready to be filled in by later slices
- [ ] The Index page shows a new card linking to this page, present in both locales, following the existing card visual pattern
- [ ] Page-level test renders both locale routes and asserts correct locale content and TOC entries are present
- [ ] `npm run build` (or equivalent) succeeds with the new route included

## Blocked by

None - can start immediately
