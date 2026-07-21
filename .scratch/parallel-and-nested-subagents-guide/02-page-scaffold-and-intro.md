# Scaffold the guide page and migrate the intro + "Paralel: Mental Model"

Label: ready-for-agent

## Parent

`.scratch/parallel-and-nested-subagents-guide/parallel-and-nested-subagents-guide.md`

## What to build

Tracer bullet for the whole page pipeline: prove content → route → homepage index → i18n → theme works end-to-end for this guide, using source doc §01 "Nereden Geliyoruz" and §02 "Paralel: Mental Model" as the first real content.

- `content/en/parallel-and-nested-subagents-guide.mdx` and `content/tr/parallel-and-nested-subagents-guide.mdx`, following [[0003-two-layer-i18n-json-plus-mdx]]
- `src/app/[locale]/parallel-and-nested-subagents-guide/page.tsx`, dynamically importing the locale MDX and wrapping it in `PageWrap`, matching the pattern in `src/app/[locale]/subagents-companion-guide/page.tsx`
- Page hero using `Hero`/`HeroAuthor`/`Accent`, reproducing the source doc's title ("Paralel & Nested Subagents"), eyebrow ("Claude Code · Workshop 03"), and chip row ("Fan-out", "Depth ≤ 5", "Agent Tool Gate")
- `Toc` component wired to all 15 source sections (`bridge`, `pmodel`, `pbenefit`, `ptrigger`, `puse`, `pcaution`, `nmodel`, `nmech`, `npro`, `ncon`, `nhow`, `nmodelres`, `tree`, `best`, `tldr`) — only `bridge` and `pmodel` have real content yet; the rest are placeholder anchors filled in by later issues
- Homepage index card: add an entry to the `cardChrome` array in `src/app/[locale]/page.tsx` linking to `/[locale]/parallel-and-nested-subagents-guide`, plus matching text in the `IndexPage.cards` array in `messages/en.json` and `messages/tr.json`
- "Nereden Geliyoruz" (§01) content: the bridge paragraph plus the "Bugünün sorusu" `Callout`
- "Paralel: Mental Model" (§02) content, using the `FanOutDiagram` built in `01-diagram-components-and-prefactor.md`, plus the "Ana fikir" `Callout` and the version-note `Callout` citing `code.claude.com/docs/en/agent-sdk/subagents`

## Acceptance criteria

- [x] `/en/parallel-and-nested-subagents-guide` and `/tr/parallel-and-nested-subagents-guide` both render with correct locale content
- [x] Homepage index card links to the new page in both locales
- [x] Hero, chip row, and TOC render with all 15 anchors (13 as placeholders) and match the source doc's content
- [x] "Nereden Geliyoruz" and "Paralel: Mental Model" sections render fully, including `FanOutDiagram` — no browser/screenshot tooling available in this environment, so the theme-state visual pass was not performed; coverage instead comes from the `FanOutDiagram` unit test asserting theme-token-only colors
- [x] No inline `<style>` or bespoke CSS classes carried over from the source HTML
- [x] A page-level integration test renders both locale routes and asserts the two migrated sections and homepage card link are present
- [x] `npm run lint` and `npm run build` pass

## Blocked by

- `.scratch/parallel-and-nested-subagents-guide/01-diagram-components-and-prefactor.md`
