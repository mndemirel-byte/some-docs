# Fill sections 04-06: CLAUDE.md, rules, settings.json

Label: ready-for-agent

## Parent

`.scratch/agentic-workflow-cheat-sheet/01-scaffold-page-and-toc.md`

## What to build

Fill in the `claude`, `rules`, and `settings` `Section` placeholders in both locale MDX files, adapted from `docs/requirements/agentic-setup-reference-cheat-sheet.html` (sections `#claude`, `#rules`, `#settings`):

- **`claude`**: intro paragraph, then a `CardGrid` of `InfoCard`s for "good content" vs "content to avoid" (two short lists), then the full `CLAUDE.md` template reproduced verbatim inside a `CodeBlock`.
- **`rules`**: intro + nuance paragraph about global vs path-scoped rules, the example file-tree (`.claude/rules/...`) via `FileTree`, the "why frontmatter matters" `Callout`, the two path-scoped rule examples (`api.md`, `react.md`) as `CodeBlock`s, the rule-type comparison `DataTable` (global rule / path-scoped rule / skill / hook-settings), and the closing "practical rule strategy" `Callout`.
- **`settings`**: intro paragraph, the scope comparison `DataTable` (User/Project/Local), the `settings.json` example as a `CodeBlock`, and the closing best-practice `Callout`.

Reproduce all code/JSON snippets verbatim. Use the source's `tr-only`/`en-only` copy as the basis for each locale.

## Acceptance criteria

- [ ] `claude` section renders the good/avoid card grid and the full CLAUDE.md template in a `CodeBlock`, matching the source verbatim for the template
- [ ] `rules` section renders the file tree, both rule-file code examples, the comparison table, and both callouts
- [ ] `settings` section renders the scope table, the settings.json example, and the closing callout
- [ ] Both locale MDX files updated with correct, non-duplicate copy
- [ ] Page-level test extended to assert key content from these three sections in both locales

## Blocked by

- `.scratch/agentic-workflow-cheat-sheet/02-mental-model-structure-setup.md`
