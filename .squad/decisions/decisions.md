# Team Decisions

## Decision: GitHub Pages deployment setup

**Author:** Jesse (Frontend Dev)  
**Date:** 2025-07-28

### Context

BrewSchool needs to be deployed to GitHub Pages from the `coffee` repo.

### Decisions

1. **`base: '/coffee/'`** — Set in `vite.config.ts` because GitHub Pages serves project sites under `/<repo-name>/`. All asset paths (`/coffee/assets/...`) are correctly prefixed in the production build.

2. **Single-job workflow** — The deploy workflow (`deploy.yml`) uses a single `build-and-deploy` job rather than splitting build and deploy into separate jobs. Simpler for a static site; no artifact handoff overhead.

3. **Triggers on `main` branch** — Per the request. The repo's default branch is `master`, so the team should either rename to `main` or update the workflow trigger to `master`.

4. **Blank page investigation** — Ran a headless browser test against the dev server. The app renders all 7 sections correctly with zero console errors. No runtime crash found in the recently added components (BeanExplorer SVG images, IndianCoffee section). The blank page report may have been from a stale cache or transient issue.

### Files changed

- `vite.config.ts` — added `base: '/coffee/'`
- `.github/workflows/deploy.yml` — new GitHub Actions workflow
