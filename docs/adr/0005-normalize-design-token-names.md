# 0005. Normalize design token names, deviating from the literal design files

## Status

Accepted

## Context

The design handoff (`docs/design_handoff_doc_library/README.md`) documents an inconsistency in the original static HTML: the index page uses `--pink` for an accent that the doc pages call `--red` for the same role, and `setup.html` uses `--cyan` as a synonym for `--blue` in some places. The README itself flags this as an unintentional artifact of how the original static files were authored, not a deliberate design choice, and recommends normalizing.

## Decision

Use a single, normalized token set across index and doc pages (e.g. one name per semantic role — no `--pink`/`--red` split for the same accent, no `--cyan`/`--blue` synonym). The rebuilt codebase will not literally mirror the design files' CSS variable names token-for-token.

## Consequences

- Token names in the codebase will not 1:1 match the names in `docs/design_handoff_doc_library/README.md`'s Design Tokens tables — anyone diffing against the handoff doc for variable names (not just hex values) needs to know this ADR exists.
- Colors (hex/rgba values) are still taken verbatim from the README per page/theme — only the *names* are normalized, not the palette itself.
- Future token additions should follow the normalized naming, not reintroduce the original split.
