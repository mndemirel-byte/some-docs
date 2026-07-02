# Deploying to Vercel

This app is a fully static Next.js export (`output: "export"`, see [[0004-full-static-export]]) — no Node server, no API routes, no server actions, no env vars. Vercel deploys it as a static site build.

## Steps

1. **Push the repo to a Git provider Vercel can read** (GitHub/GitLab/Bitbucket), if not already hosted there.
2. **Create a new Vercel project** and import the repo.
3. **Configure build settings** in the Vercel project:
   - Framework preset: Next.js (Vercel detects `output: "export"` automatically and serves the static `out/` directory)
   - Build command: `npm run build`
   - Output directory: `out`
   - Install command: `npm install` (default)
4. **No environment variables required** — confirm none need to be set in the Vercel project settings (the app has no runtime config, per `CONTEXT.md` / ADRs).
5. **Trigger the first deploy** (via the Vercel dashboard import or `vercel --prod` from the CLI).
6. **Verify the deployed site**:
   - All 10 static routes resolve (5 pages × `en`/`tr` locales) with no 404s.
   - Root path redirects/resolves to the default locale (`en`) per [[0006-default-locale-en-theme-anthropic]].
   - Theme switching (Anthropic/Bright SaaS) persists across navigation and reload, per the fixes documented in `.scratch/doc-library/06-visual-qa-acceptance.md`.
   - Locale switching does not reset the theme.
7. **(Optional) Configure a custom domain** in Vercel project settings if the site needs one beyond the default `*.vercel.app` URL.

## Notes

- Since there's no server, Vercel's Edge/Serverless Functions are not used by this app — it's served as static assets/CDN only.
- Re-deploys happen automatically on push to the connected branch once the Vercel Git integration is set up (step 2).
