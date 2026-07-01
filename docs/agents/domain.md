# Domain docs

This repo uses a single-context layout.

- `CONTEXT.md` at the repo root holds the domain language / ubiquitous language for the project.
- `docs/adr/` at the repo root holds architectural decision records.

Skills that read domain context (`improve-codebase-architecture`, `diagnosing-bugs`, `tdd`) should read `CONTEXT.md` and `docs/adr/` directly at the repo root — there is no per-subproject context to disambiguate.

Neither file exists yet; skills that write to them (e.g. `domain-modeling`) should create them at the repo root when first needed.
