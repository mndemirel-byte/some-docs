# Remaining 3 Doc pages: `ai-coding-b1`, `ai-coding-b2`, `matt-pocock-skills`

Label: ready-for-agent

## Parent

`.scratch/doc-library/rebuild-doc-library-app.md`

## What to build

Apply the content pipeline pattern established in slice 4 to the remaining 3 Doc pages: author per-locale MDX for each (`content/en/<slug>.mdx`, `content/tr/<slug>.mdx`), and wire their Index cards to real links. `ai-coding-b2` and `matt-pocock-skills` additionally need the 5 skill-letter badge colors (accent/blue/green/amber/red) rendered via Design tokens across both themes. `matt-pocock-skills` additionally needs the terminal window header background to use the correct theme-specific surface color (`--surface2` role).

## Acceptance criteria

- [ ] `/en/ai-coding-b1`, `/tr/ai-coding-b1`, `/en/ai-coding-b2`, `/tr/ai-coding-b2`, `/en/matt-pocock-skills`, `/tr/matt-pocock-skills` all render with correct locale-specific MDX content, matching the original HTML design references for fidelity
- [ ] Skill-letter badges on `ai-coding-b2` and `matt-pocock-skills` render all 5 accent colors correctly under both themes
- [ ] `matt-pocock-skills`' terminal header background uses the correct theme-specific surface color under both themes
- [ ] The Index page's cards for these 3 pages link to their real `/[locale]/<slug>` routes
- [ ] A page-level integration test renders all 6 routes (3 pages × 2 locales) and asserts correct locale content, and asserts skill-badge/terminal-header token colors resolve correctly under both theme states

## Blocked by

- `.scratch/doc-library/04-setup-doc-page.md`
