# 0002. Theme is client-side state, not a route segment

## Status

Accepted

## Context

[[0001-nextjs-tailwind-nextintl-stack]] made locale a route segment (`/tr`, `/en`) for SEO and shareable-link reasons. The doc library also has a second axis of variation — theme (`anthropic` light / `bright-saas` dark) — and the original static design mirrored both axes in the folder structure (`files-claude/anthropic/`, `files-claude/bright-saas/`, etc.), which could tempt a symmetric choice: route segment for theme too.

Locale and theme are not equivalent, though: locale changes the actual content language (relevant to search engines and to sharing a link with someone who reads a specific language), while theme is a purely visual preference with no content difference.

## Decision

Theme is modeled as client-side state (React state, persisted to `localStorage`), applied via a `data-theme` attribute on `<html>` that switches the active CSS custom property set. It is not part of the URL. Locale remains a route segment per [[0001-nextjs-tailwind-nextintl-stack]].

## Consequences

- A single URL (`/tr/setup`) works for both themes — the visitor's stored preference (or system preference on first visit) decides which renders, avoiding duplicate-content URLs for what is visually the same content.
- No SEO benefit is lost, since theme carries no content difference.
- First paint must read the persisted preference before rendering to avoid a flash of the wrong theme (FOUC) — needs an inline script or equivalent before hydration.
- This creates an intentional asymmetry with locale handling; documented here so a future reader doesn't "fix" it into symmetry.
