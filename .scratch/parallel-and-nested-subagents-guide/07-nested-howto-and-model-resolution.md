# Migrate "Nested: Nasıl Açılır" and "Nested: Model Çözümleme"

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Add source doc §11 and §12 to the guide page — the longest and most content-dense pair in the source, both largely made of `CodeBlock`s and `Callout`s:

- "Nested: Nasıl Açılır" (§11) — intro paragraph, the `.claude/agents/team-lead.md` example via `CodeBlock`, the "Fark burada" ok `Callout`, the `tech-lead`/`frontend-dev`/`data-dev` repo-specific paragraphs, the "Deneme promptu · nested" `CodeBlock`, and the "Canlı izle" ok `Callout`
- "Nested: Model Çözümleme — `inherit` Kimin Modelini Alır?" (§12) — the scenario paragraph, the 3-row model-resolution table (Ana sohbet / team-lead subagent / nested subagent) via `DataTable`, the "Resmi doküman ne diyor" `Callout`, the "Çok-seviyeli zincirde belirsiz" danger `Callout` (citing `github.com/anthropics/claude-code/issues/19174`), the "Pratik cevap" ok `Callout`, the `.claude/settings.json` PostToolUse hook example via `CodeBlock`, the two explanatory paragraphs, the "İki ön koşul" danger `Callout`, and the closing `CLAUDE_CODE_SUBAGENT_MODEL` `Callout`

## Acceptance criteria

- [x] Both sections render on `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` with correct locale content
- [x] All code blocks (`team-lead.md` agent definition, nested trial prompt, `settings.json` hook) render correctly via `CodeBlock` with working copy-to-clipboard
- [x] Model-resolution table renders all 3 rows via `DataTable`
- [x] All callouts in both sections use the correct `kind` (ok/danger/plain) matching the source doc's `.note`/`.note.ok`/`.note.danger` classes
- [x] TOC anchors for `nhow` and `nmodelres` are no longer placeholders
- [x] No inline `<style>` or bespoke CSS classes carried over
- [x] Page-level integration test asserts both sections' content for both locales
- [x] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/06-nested-pros-and-cons.md`
