# Migrate "Structured Output" and "Tool Permissions"

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

Add two more sections (source doc §07 and §08) to the guide page:

- "Structured Output" — the result-contract template via `CodeBlock` (with copy-to-clipboard), and the three-card row (Readable, Comparable, Finite) via `CardGrid`/`InfoCard`
- "Tool Permissions" — the "Least Privilege" callout via `Callout`, the recommended-tools table (Research Agent, Reviewer, Writer, Styling Agent) via `DataTable`, and the closing "Reviewer needs Bash but not Edit" note via `Callout`

## Acceptance criteria

- [ ] Both sections render on `/en/subagents-companion-guide` and `/tr/subagents-companion-guide` with correct locale content
- [ ] Result-contract template renders in a `CodeBlock` with working copy-to-clipboard
- [ ] Tool permissions table renders all 4 rows with correct tool lists
- [ ] TOC anchors for these sections resolve correctly
- [ ] No inline `<style>` or bespoke CSS classes carried over
- [ ] Existing page-level integration test is extended to assert these sections' content is present, in both locales
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/subagents-companion-guide/03-page-scaffold-and-mental-model.md`
