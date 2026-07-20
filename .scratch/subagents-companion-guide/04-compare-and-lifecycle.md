# Migrate "Main Thread vs Subagent" and "Lifecycle"

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

Add two more sections (source doc §02 and §03) to the guide page scaffolded in `03-page-scaffold-and-mental-model.md`:

- "Main Thread vs Subagent" — the comparison table using `DataTable`/`TableBox`, and the yes/no side-by-side decision panel ("YES — Main Thread" / "NO — Subagent") using `TwoBoxGrid`/`Box`
- "Lifecycle" — the 7-step vertical timeline (User → Main Agent → Task Prompt → Launch Subagent → Research/Work → Summary → Destroy Context) using `FlowSteps`/`GroupedFlowPhase`

## Acceptance criteria

- [ ] Both sections render on `/en/subagents-companion-guide` and `/tr/subagents-companion-guide` with correct locale content
- [ ] Comparison table and yes/no panel match the source doc's content and dimensions (Context, Visibility, Tool calls, Context growth, Return)
- [ ] Lifecycle renders all 7 steps in order using `FlowSteps`
- [ ] TOC anchors for these sections resolve correctly
- [ ] No inline `<style>` or bespoke CSS classes carried over
- [ ] Existing page-level integration test from issue 03 is extended to assert these sections' content is present, in both locales
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/subagents-companion-guide/03-page-scaffold-and-mental-model.md`
