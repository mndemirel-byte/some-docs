# 0004. Full static export, no Node server

## Status

Accepted

## Context

With locale as a route segment ([[0001-nextjs-tailwind-nextintl-stack]]), theme as client state ([[0002-theme-as-client-state-not-route]]), and doc content split between next-intl JSON and per-locale MDX ([[0003-two-layer-i18n-json-plus-mdx]]), every route the app serves is fully known at build time: 5 logical pages × 2 locales = 10 static routes, with theme resolved client-side. There is no dynamic, per-request, or user-specific data anywhere in the app.

## Decision

Use Next.js static export (`output: 'export'`). All locale routes are generated at build time via `generateStaticParams`; no Node server is required at runtime.

## Consequences

- Deployable to any static host (Vercel static, Netlify, GitHub Pages, S3+CDN, etc.) — no server process to run or scale.
- Rules out any future feature that genuinely needs server-side logic (auth, per-request personalization, API routes with server secrets) without revisiting this decision.
- MDX content and next-intl messages must both be resolvable at build time — no runtime content fetching.
