# Fill sections 07-09: commands, skills, agents

Label: ready-for-agent

## Parent

`.scratch/agentic-workflow-cheat-sheet/01-scaffold-page-and-toc.md`

## What to build

Fill in the `commands`, `skills`, and `agents` `Section` placeholders in both locale MDX files, adapted from `docs/requirements/agentic-setup-reference-cheat-sheet.html` (sections `#commands`, `#skills`, `#agents`). This is the largest content slice — it carries most of the source document's reference tables and code examples:

- **`commands`**: intro, the "built-in vs skill-backed vs legacy" `DataTable`, the built-in commands reference `DataTable` (`/usage`, `/context`, `/compact`, `/clear`, `/model`, `/skills`), and the two small file-tree comparisons (modern skill layout vs legacy command layout) via `FileTree`.
- **`skills`**: intro, discovery-note `Callout`s, the pattern comparison `DataTable` (inline skill / skill-driven orchestration / agent→skill preload / `context: fork`), the invocation-model `Callout`, the piece comparison table (skill/agent/rule/hook), the frontmatter control table (`default` / `disable-model-invocation` / `user-invocable`), the frontmatter field reference table, the skill↔agent purpose table, and all 5 skill definitions (`plan`, `work`, `review`, `diagnose`, `commit`) each as a `Disclosure` + `CollapsibleTrigger` (badge="skill") wrapping a `CodeBlock` with the full verbatim `SKILL.md` content.
- **`agents`**: intro, the `skills:` preload explanation `Callout`, the agent-skill-preload example `CodeBlock`, the agent-skill-usage `DataTable`, and all 3 agent definitions (`planner`, `worker`, `reviewer`) each as a `Disclosure` + `CollapsibleTrigger` (badge="agent") wrapping a `CodeBlock` with the full verbatim agent markdown, plus the best-practice `Callout` and the closing agent→skill preload pattern `CodeBlock`.

Reproduce every code/markdown snippet (SKILL.md and agent .md bodies) verbatim — these encode exact frontmatter shapes and are the highest-value reference content in the whole page. Use the source's `tr-only`/`en-only` copy as the basis for each locale; keep the `name`/`description`/frontmatter keys in the code blocks in English regardless of locale (they're literal file content, not prose).

## Acceptance criteria

- [ ] `commands` section renders both comparison tables and both file-tree examples
- [ ] `skills` section renders all comparison/reference tables and all 5 skill definitions as expandable `Disclosure` blocks with verbatim `SKILL.md` code
- [ ] `agents` section renders the preload explanation, example, table, and all 3 agent definitions as expandable `Disclosure` blocks with verbatim agent markdown code
- [ ] All `Disclosure` triggers show the correct `badge` (skill vs agent) and name/description
- [ ] Both locale MDX files updated with correct, non-duplicate prose; code-block bodies are identical across locales (only surrounding prose differs)
- [ ] Page-level test extended to assert at least one skill and one agent block's trigger text is present in both locales

## Blocked by

- `.scratch/agentic-workflow-cheat-sheet/03-claude-md-rules-settings.md`
