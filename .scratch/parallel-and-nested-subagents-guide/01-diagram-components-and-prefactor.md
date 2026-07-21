# Build the fan-out and nested-tree diagram components

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Prefactoring slice — no page content yet. Build two new inline-SVG diagram components in `src/components/doc/`, matching the existing `MentalModelDiagram`/`SequentialPipelineDiagram` pattern exactly (hardcoded to this doc's content, no configurable props, styled with theme CSS custom properties like `var(--accent)`, `var(--surface)`, `var(--muted)` instead of hardcoded hex, own `.module.css`, own `.test.tsx`):

- `FanOutDiagram` (`src/components/doc/fan-out-diagram.tsx`) — reproduces the source doc's §02 diagram: one "MAIN THREAD" box dispatching to three subagent boxes (A, B, C), with a legend describing dispatch-together / independent-return / wait-for-slowest semantics (source: `docs/requirements/parallel-and-nested-subagents-guide.html` lines 40-51)
- `NestedTreeDiagram` (`src/components/doc/nested-tree-diagram.tsx`) — reproduces the source doc's §07 diagram: MAIN THREAD → `team-lead` → `developer`, annotated with each node's `tools` list and the "seviye 1 / seviye 2 · derinlik limiti 5" depth labels, with a legend (source: lines 102-109)

Neither diagram needs a corresponding "Checklist" or "DecisionTree" component — both of those patterns already exist from the Workshop 02 migration and will be reused as-is in later issues (`NumberedGrid`/`NumberedItem`, `DecisionTree`/`DecisionQuestion`).

## Acceptance criteria

- [x] `FanOutDiagram` renders the main-thread box and three subagent boxes with arrows, using only theme CSS custom properties (no hardcoded hex)
- [x] `NestedTreeDiagram` renders the main → team-lead → developer chain with tool-list and depth-limit annotations, using only theme CSS custom properties
- [x] Both components have unit tests matching the style of `mental-model-diagram.test.tsx` / `sequential-pipeline-diagram.test.tsx`
- [x] Both components render correctly under both theme states (`anthropic`, `bright-saas`) — no browser/screenshot tooling available in this environment, so not visually verified; the theme-token-only assertion in each unit test is the coverage substitute
- [x] `npm run lint` and `npm run build` pass

## Blocked by

None - can start immediately
