# Deploy the app to Vercel

Label: ready-for-agent

## What to build

Deploy the app to Vercel end-to-end following the step-by-step guide in `docs/deploy-vercel.md`: connect the repo, configure the static-export build settings, run the first deploy, and verify the live site. The app is a pure static export ([[0004-full-static-export]]) with no env vars, API routes, or server actions, so this is a single linear slice rather than multiple independent ones.

## Acceptance criteria

- [ ] Vercel project created and linked to the repo
- [ ] Build settings configured for static export (build command `npm run build`, output directory `out`)
- [ ] First production deploy succeeds
- [ ] All 10 static routes (5 pages × `en`/`tr`) resolve with no 404s on the deployed URL
- [ ] Root path resolves to the default locale (`en`) per [[0006-default-locale-en-theme-anthropic]]
- [ ] Theme switching persists across navigation and reload on the deployed site
- [ ] Locale switching does not reset the theme on the deployed site

## Blocked by

None - can start immediately
