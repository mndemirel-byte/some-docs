# 0001. Use Next.js + Tailwind CSS + next-intl for the doc library

## Status

Accepted

## Context

The "AI Coding Serisi" doc library (1 index + 4 long reference pages, two color themes, two locales, a LIGHT/DARK + TR/EN switcher on the index) is being rebuilt from static HTML design references (`docs/design_handoff_doc_library/`) into a real codebase. The project was empty at the start — no existing stack to inherit, and the handoff prompt (`PROMPT.md`) explicitly left the stack choice open.

Alternatives considered:
- **Next.js (App Router) + Tailwind CSS + next-intl** — file-based routing maps naturally onto the 5-page structure, static export keeps hosting simple, `next-intl` gives locale-aware routing (`/tr/...`, `/en/...`) that mirrors the original design's folder-based TR/EN split.
- **Vite + React + CSS Modules + hand-rolled JSON dictionary** — near-zero framework overhead, but routing/SSR/SEO concerns would need to be hand-built.

## Decision

Use Next.js (App Router) with Tailwind CSS for styling and `next-intl` for i18n. Theme tokens (light "Anthropic" / dark "Bright SaaS") are modeled as CSS custom properties so components read colors through tokens, never hardcoded hex.

## Consequences

- Locale is represented via route segments (`/tr`, `/en`), not just client-side state — closer to the original design's real navigable URLs per theme/locale combination, and better for SEO/shareable links.
- Theme is expected to be modeled as client state (see follow-up ADRs on theme/locale persistence), independent of routing.
- Adds Next.js and next-intl as dependencies/learning surface, which is more than a hand-rolled static site would need — accepted as a reasonable tradeoff for routing and i18n support.
