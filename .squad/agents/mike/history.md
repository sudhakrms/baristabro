# Mike — History

## Project Context

- **Project:** BrewSchool — Interactive coffee education SPA
- **Stack:** React 18 + TypeScript, Vite 5, Vitest (likely), React Testing Library
- **User:** Sudhakar S
- **Created:** 2026-04-08

## Core Context

- 6 interactive sections to test: Bean Explorer, Terminology, Flavor Wheel, Drinks Guide, Brewing Methods, Hero
- Dark/light theme must toggle correctly across all sections
- Accessibility targets: WCAG AA, keyboard navigation, screen reader compatibility
- Performance target: Lighthouse 90+ on all metrics
- Responsive breakpoints: 375px, 640px, 768px, 1024px, 1440px
- `prefers-reduced-motion` must disable all animations

## Learnings

### Phase 4 Verification Pass (2026-04-08)

**Build:**
- Build passes clean, zero errors, zero warnings.
- Bundle: JS 461 KB (148 KB gzip), CSS 26 KB (5.8 KB gzip). Total gzipped ~154 KB.

**TypeScript:** All clean — `tsc -b` passes as part of build script.

**Accessibility fixes applied:**
- 3 interactive divs (BeanCard, FlipCard, MethodCard) were missing `role="button"`, `tabIndex`, keyboard handlers, and `aria-label`. Fixed all three.
- Terminology search input had no `aria-label` — added.
- Terminology category filter buttons had no `aria-pressed` — added.
- DrinksGuide tab content had no `role="tabpanel"` — added.
- Navbar `<nav>` had no `aria-label` — added "Main navigation".
- CupDiagram used hardcoded `clipPath id="cup-clip"` — when multiple cups render on the same page (which they do in DrinksGuide), they share the same ID causing render bugs. Fixed with `useId()`.
- BeanExplorer ComparisonPanel used bare `<>` fragment in `.map()` — no key on the fragment. Fixed to `React.Fragment` with key.

**Already solid (no fixes needed):**
- Hero section: proper h1, aria-hidden on decorative SVG, aria-label on scroll link.
- FlavorWheel D3 paths: already had role=button, tabindex, aria-label, keyboard handler.
- CupDiagram layer rects: already had role=button, tabindex, keyboard handler.
- DrinksGuide tabs: already had role=tab, aria-selected.
- DrinkCard: uses a `<button>` element with aria-expanded — correct.
- ThemeToggle: proper aria-label with dynamic state.
- All SVG visualizations: have role=img and aria-label.
- Heading hierarchy: h1 → h2 → h3 → h4 — correct throughout.
- prefers-reduced-motion: already comprehensive in theme.css (animation-duration, transition-duration, scroll-behavior).
- All color values use CSS custom properties — no hardcoded theme colors.
- Responsive Tailwind classes used throughout (sm:, md:, lg:, xl:).

**Data integrity:**
- All 20 drink compositions sum to exactly 100%.
- All 4 bean taste scores are in 1–10 range.
- All data files export named interfaces and arrays (no default exports).

**Pattern:** Interactive `<div>` elements with click handlers are a recurring a11y gap. Every clickable div needs: `role="button"`, `tabIndex={0}`, `aria-label`, and `onKeyDown` for Enter/Space. Use `<button>` when possible to get this for free.
