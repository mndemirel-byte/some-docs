# Issue tracker: Local markdown

Issues for this repo are tracked as markdown files under `.scratch/<feature>/`, not in an external tracker.

## Conventions

- Each issue is a markdown file at `.scratch/<feature>/<slug>.md`.
- `<feature>` groups related issues (e.g. a feature area or initiative); `<slug>` is a short kebab-case description of the issue.
- New issues should include a title, a triage label (see `docs/agents/triage-labels.md`), and a description.
- To find open issues, skills should list files under `.scratch/`.
- There is no external tracker integration — no `gh`/`glab` CLI calls.
- External PRs are not a request surface (no remote/tracker to submit them against).
