# Scaffold the guide page and migrate "Mental Model"

Label: ready-for-agent

## Parent

`.scratch/subagents-companion-guide/subagents-companion-guide.md`

## What to build

Tracer bullet for the whole page pipeline: prove content → route → homepage index → i18n → theme works end-to-end for this guide, using the "Mental Model" section (source doc §01) as the first real content slice.

- `content/en/subagents-companion-guide.mdx` and `content/tr/subagents-companion-guide.mdx`, following [[0003-two-layer-i18n-json-plus-mdx]]
- `src/app/[locale]/subagents-companion-guide/page.tsx`, dynamically importing the locale MDX and wrapping it in `PageWrap`, matching the pattern in `src/app/[locale]/agentic-workflow-cheat-sheet/page.tsx`
- Page hero using `Hero`/`HeroAuthor`/`Accent`, reproducing the source doc's title, eyebrow ("Claude Code · Workshop 02"), and chip row ("Main Thread ↔ Subagent", "Context Isolation", "Least Privilege", "Structured Output")
- `Toc` component wired to the page's sections (source doc has 14 — the TOC can be built now even though only §01 has content yet; add placeholder anchors for the rest as later issues land)
- Homepage index card: add an entry to the `cardChrome` array in `src/app/[locale]/page.tsx` linking to `/[locale]/subagents-companion-guide`, plus matching text in the `IndexPage.cards` array in `messages/en.json` and `messages/tr.json`
- "Mental Model" section content, including its inline SVG diagram (main thread ↔ subagent context boxes) restyled to use the site's theme CSS custom properties instead of the source doc's hardcoded hex values, so it respects both themes per [[0002-theme-as-client-state-not-route]]

## Acceptance criteria

- [ ] `/en/subagents-companion-guide` and `/tr/subagents-companion-guide` both render with correct locale content
- [ ] Homepage index card links to the new page in both locales (no longer just a source doc)
- [ ] Hero, chip row, and TOC render and match the source doc's content (not styling — styling follows site tokens)
- [ ] "Mental Model" section renders with its diagram restyled to theme tokens, verified visually correct under both `anthropic` and `bright-saas` theme states
- [ ] No inline `<style>` or bespoke CSS classes carried over from the source HTML
- [ ] A page-level integration test renders both locale routes and asserts the Mental Model content and homepage card link are present
- [ ] `npm run lint` and `npm run build` pass

## Blocked by

None - can start immediately
