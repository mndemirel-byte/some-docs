# 0006. First-visit defaults: locale `en`, theme `anthropic`, both fixed

## Status

Accepted

## Context

On a first visit (no `localStorage` preference yet), the app needs a default Locale and Theme. Two detection-based alternatives were considered and rejected:
- Locale via `Accept-Language` / browser negotiation, defaulting toward `tr` since the handoff documents (README, PROMPT.md) are authored in Turkish.
- Theme via `prefers-color-scheme` media query, following the visitor's OS setting.

## Decision

Both defaults are fixed, not detected: Locale defaults to **`en`**, Theme defaults to **`anthropic`** (light). No `Accept-Language` negotiation and no `prefers-color-scheme` detection are used for the initial value; both are only overridden once the visitor explicitly uses the Switcher (after which the choice persists via `localStorage`, per [[0002-theme-as-client-state-not-route]]).

## Consequences

- Deliberately not inferring from the browser environment for either axis — worth noting because it's easy for a future reader to expect the opposite (Turkish-authored project defaulting to `tr`; modern web convention respecting `prefers-color-scheme`).
- Consistent, deterministic first paint for all visitors regardless of browser/OS settings — simplifies SSR/static-export output (no per-request variation to reconcile with static generation, reinforcing [[0004-full-static-export]]).
- If analytics later show most visitors manually switch away from these defaults, that's a signal to revisit this decision, not evidence the implementation is broken.
