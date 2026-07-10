# Fill sections 01-03: Mental model, File structure, Setup commands

Label: ready-for-agent

## Parent

`.scratch/agentic-workflow-cheat-sheet/01-scaffold-page-and-toc.md`

## What to build

Fill in the first three `Section` placeholders (`mental`, `structure`, `setup`) in both `content/en/agentic-workflow-cheat-sheet.mdx` and `content/tr/agentic-workflow-cheat-sheet.mdx`, using content adapted from `docs/requirements/agentic-setup-reference-cheat-sheet.html` (sections `#mental`, `#structure`, `#setup`), rebuilt with this project's existing `doc` components instead of the source file's own inline HTML/CSS:

- **`mental`**: the "rules / CLAUDE.md / settings.json / commands / skills / agents / hooks" concept table — render as a `CardGrid` of `InfoCard`s (one card per concept, each with a short "what it's for" + "when to use" body), rather than the source's raw `<table>`. Preserve the two callout notes ("quick distinction", "skill ↔ agent relationship") as `Callout`s.
- **`structure`**: the recommended file-tree — render with `FileTree`/`Dir`/`File`/`Special` reproducing the tree from the source (`CLAUDE.md`, `.claude/`, `docs/`, `src/`, `tests/`, `README.md` and their children). Follow with a `DataTable` (or `CardGrid`/`InfoCard`s) for the file/folder responsibility descriptions.
- **`setup`**: the bash and PowerShell setup scripts — render with `OsTabs` (two tabs) wrapping `CodeBlock`s, reproducing both scripts verbatim from the source.

Adapt wording naturally into each locale rather than doing a literal machine translation; the source HTML already has both TR and EN copy for each section (`tr-only`/`en-only` spans) — use those as the basis for each locale's MDX content.

## Acceptance criteria

- [ ] `mental` section renders a `CardGrid` of `InfoCard`s covering all 7 concepts (rules, CLAUDE.md, settings.json, commands, skills, agents, hooks) with correct locale copy, plus the two callouts
- [ ] `structure` section renders the file tree via `FileTree` components matching the source tree shape, plus the responsibility table/cards
- [ ] `setup` section renders both bash and PowerShell scripts verbatim inside `OsTabs`/`CodeBlock`
- [ ] Both `content/en/...` and `content/tr/...` MDX files are updated with locale-correct content (not placeholder/duplicate text)
- [ ] Existing page-level test still passes; extend it to assert key content from these three sections is present in both locales

## Blocked by

- `.scratch/agentic-workflow-cheat-sheet/01-scaffold-page-and-toc.md`
