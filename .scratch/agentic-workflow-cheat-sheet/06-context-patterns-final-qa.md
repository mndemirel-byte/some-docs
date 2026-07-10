# Fill sections 12-13 (context/token management, Do/Don't) and final QA pass

Label: ready-for-agent

## Parent

`.scratch/agentic-workflow-cheat-sheet/01-scaffold-page-and-toc.md`

## What to build

Fill in the final two `Section` placeholders (`context`, `patterns`) in both locale MDX files, adapted from `docs/requirements/agentic-setup-reference-cheat-sheet.html` (sections `#context`, `#patterns`), then do a full end-to-end QA pass over the whole page built across all prior slices in this feature:

- **`context`**: the 4-step context/token management flow ("keep sessions small", "write decisions to files", "use compact/clear when context grows", "choose models by task type") — render with `FlowSteps`/`FlowStep`.
- **`patterns`**: the closing Do/Don't card pair — render with `DoDontList`/`DoItem`/`DontItem` (5 items each side).

Final QA pass (covers the whole page, not just these two sections):

- Verify the TR/EN locale switcher produces fully correct, non-mixed-language content on every one of the 13 sections.
- Verify every `Toc` entry anchor scrolls to the correct `Section`.
- Verify responsive layout (narrow viewport) doesn't break any `CardGrid`, `DataTable`, `OsTabs`, or `Disclosure` block.
- Verify the Index page card added in slice 1 still links correctly and its copy is accurate now that the full page exists.
- Run the full test suite and the project's build/typecheck/lint commands; fix anything the new content introduced.

## Acceptance criteria

- [ ] `context` section renders all 4 flow steps via `FlowSteps` in both locales
- [ ] `patterns` section renders the Do/Don't card pair with all 10 items in both locales
- [ ] All 13 sections verified end-to-end in both `/en/agentic-workflow-cheat-sheet` and `/tr/agentic-workflow-cheat-sheet` — no leftover placeholder text, no mixed-language content
- [ ] TOC anchor links verified to scroll to the correct section for all 13 entries
- [ ] Full test suite, build, typecheck, and lint all pass
- [ ] Index page card confirmed working and accurate

## Blocked by

- `.scratch/agentic-workflow-cheat-sheet/05-hooks-plugin.md`
