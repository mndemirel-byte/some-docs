# Migrate "Anatomy of a Subagent" and "Writing Great Descriptions"

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

Add two more sections (source doc §04 and §05) to the guide page:

- "Anatomy of a Subagent" — the two-card intro (YAML Frontmatter, System Prompt) via `CardGrid`/`InfoCard`, the `code-reviewer.md` example via `CodeBlock` (with copy-to-clipboard, matching the source doc's `.cb` behavior), and the closing "Current note" callout via `Callout`
- "Writing Great Descriptions" — the bad/good example pair via `DoDontList`/`DoItem`/`DontItem` (each with its own small `CodeBlock` snippet), the formula line via `Formula` if it fits, and the closing note via `Callout`

## Acceptance criteria

- [ ] Both sections render on `/en/subagents-companion-guide` and `/tr/subagents-companion-guide` with correct locale content
- [ ] `code-reviewer.md` example renders in a `CodeBlock` with working copy-to-clipboard
- [ ] Bad/good description examples render via `DoDontList` with their code snippets intact
- [ ] TOC anchors for these sections resolve correctly
- [ ] No inline `<style>` or bespoke CSS classes carried over
- [ ] Existing page-level integration test is extended to assert these sections' content is present, in both locales
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/subagents-companion-guide/03-page-scaffold-and-mental-model.md`
