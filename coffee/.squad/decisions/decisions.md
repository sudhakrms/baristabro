# Team Decisions

## Decision: Netlify Deployment Configuration

**Author:** Gus (Lead)  
**Date:** 2026-04-08  
**Status:** Implemented

### Context

BrewSchool is a static SPA (React 18 + TypeScript, Vite 8, Tailwind CSS 3) built to `dist/` with base path `/coffee/`. Required production-ready Netlify configuration for client-side routing, asset caching, security headers, and clean deployment.

### Decision

Implemented Netlify deployment via two config files:

1. **`netlify.toml`** — Primary configuration
   - Build: `npm run build`, publish: `dist`
   - SPA fallback: `/coffee/*` → `/coffee/index.html` (200 status)
   - Cache headers: immutable assets (1 year), no-cache HTML with revalidation
   - Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy

2. **`public/_redirects`** — Compatibility fallback
   - Backup SPA rule: `/coffee/*  /coffee/index.html  200`

### Rationale

- Dual config approach ensures compatibility and resilience
- Base path scoped to `/coffee/*` matching Vite config
- Vite fingerprints assets enabling aggressive caching
- No-cache HTML ensures users get latest version
- Security headers provide defense-in-depth

### Consequences

**Positive:** Zero-config deploy, optimal performance, no SPA routing issues, security baseline.  
**Negative:** Base path `/coffee/` requires awareness for custom domain deployment; 500kB bundle size noted (code splitting deferred).

### Future Considerations

- Code splitting if bundle grows further
- Update base path to `/` if deploying to root domain
- Add CSP header if external scripts needed

---

## Decision: GitHub Pages deployment setup

**Author:** Jesse (Frontend Dev)  
**Date:** 2025-07-28

### Context

BrewSchool needs to be deployed to GitHub Pages from the `coffee` repo.

### Decision

1. **`base: '/coffee/'`** — Set in `vite.config.ts` for GitHub Pages project site structure
2. **Single-job workflow** — `build-and-deploy` job for simplicity
3. **Triggers on `main` branch** — Repo's default is `master`; team should align
4. **Blank page investigation** — Headless test confirmed all 7 sections render correctly with zero console errors

### Files changed

- `vite.config.ts` — added `base: '/coffee/'`
- `.github/workflows/deploy.yml` — new GitHub Actions workflow
