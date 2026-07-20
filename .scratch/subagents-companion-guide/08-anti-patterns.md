# Migrate "Anti-patterns"

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

Add source doc §11 ("Anti-patterns") to the guide page:

- The two anti-pattern panels (Expert Personas, Test Runner Agents), each with a "why" sub-note, via `DoDontList`/`DontItem`
- The "Sequential Pipelines" sub-section, including its inline SVG diagram (Researcher → Planner → Worker chain with a warning icon), restyled to use the site's theme CSS custom properties instead of hardcoded hex, so it respects both themes per [[0002-theme-as-client-state-not-route]] — same treatment as the Mental Model diagram in issue 03
- The closing paragraph on pipeline handoffs

## Acceptance criteria

- [ ] Section renders on `/en/subagents-companion-guide` and `/tr/subagents-companion-guide` with correct locale content
- [ ] Both anti-pattern panels render with their "why" sub-notes
- [ ] Sequential-pipeline diagram renders correctly under both `anthropic` and `bright-saas` theme states
- [ ] TOC anchor for this section resolves correctly
- [ ] No inline `<style>` or bespoke CSS classes carried over
- [ ] Existing page-level integration test is extended to assert this section's content is present, in both locales
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/subagents-companion-guide/03-page-scaffold-and-mental-model.md`
