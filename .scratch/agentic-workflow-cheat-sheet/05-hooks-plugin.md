# Fill sections 10-11: hooks, plugin

Label: ready-for-agent

## Parent

`.scratch/agentic-workflow-cheat-sheet/01-scaffold-page-and-toc.md`

## What to build

Fill in the `hooks` and `plugin` `Section` placeholders in both locale MDX files, adapted from `docs/requirements/agentic-setup-reference-cheat-sheet.html` (sections `#hooks`, `#plugin`):

- **`hooks`**: intro paragraph, the hook-type reference `DataTable` (`PreToolUse` / `PostToolUse` / `Stop` / `Notification`), the `hooks/remind-tests.py` example as a `CodeBlock`, the `settings.json` hook-registration example as a `CodeBlock`, and the closing best-practice `Callout`.
- **`plugin`**: intro paragraph, a `CardGrid` of `InfoCard`s (or `TwoBoxGrid`) for "when local?" vs "when GitHub?", the plugin file-tree via `FileTree`, the `plugin.json` example as a `CodeBlock`, and the closing "why include in a plugin" `DataTable`.

Reproduce all code/JSON snippets verbatim. Use the source's `tr-only`/`en-only` copy as the basis for each locale.

## Acceptance criteria

- [ ] `hooks` section renders the hook-type table, both code examples, and the closing callout
- [ ] `plugin` section renders the local-vs-GitHub comparison, the plugin file tree, the plugin.json example, and the closing table
- [ ] Both locale MDX files updated with correct, non-duplicate copy
- [ ] Page-level test extended to assert key content from these two sections in both locales

## Blocked by

- `.scratch/agentic-workflow-cheat-sheet/04-commands-skills-agents.md`
