# Jesse — History

## Project Context

- **Project:** BrewSchool — Interactive coffee education SPA
- **Stack:** React 18 + TypeScript, Vite 5, Tailwind CSS 3, Framer Motion, Lucide React
- **User:** Sudhakar S
- **Created:** 2026-04-08

## Core Context

- Single-page scroll app with 6 interactive sections
- Mobile-first responsive: 375px → 640px → 1024px → desktop
- Dark/light theme via CSS custom properties + data-theme attribute
- Framer Motion for scroll-triggered animations, card transitions, layout animations
- Tailwind CSS with custom coffee palette extending default theme
- No router — smooth scroll section anchoring

## Learnings

- **BeanExplorer** (`src/sections/BeanExplorer.tsx`): 4-bean card grid (2-col desktop, 1-col mobile) with AnimatePresence expand/collapse, stagger-on-scroll, comparison mode (select 2 → side-by-side panel), taste profile as animated bars per axis
- **Terminology** (`src/sections/Terminology.tsx`): Searchable + category-filtered glossary, flip-card animation (rotateY via Framer Motion with preserve-3d/backfaceVisibility), 3-col → 2 → 1 responsive grid, AnimatePresence popLayout for filter transitions, term count display
- **BrewingMethods** (`src/sections/BrewingMethods.tsx`): 10 method cards (3-col desktop), click expands into full walkthrough with step-by-step progression (prev/next + clickable progress dots), equipment list, Lucide icons for specs, AnimatePresence mode="wait" for grid↔expanded swap
- **ringColor is NOT a valid CSS property** — use Tailwind arbitrary `ring-[var(--accent)]` class instead of inline style
- All sections use CSS custom properties exclusively for colors (--bg-primary, --bg-secondary, --accent, --text-primary, --text-secondary, --border)
- All sections provide their own `<h2>` heading — SectionWrapper just handles padding + fade-in
- App.tsx preserves FlavorWheel and DrinksGuide sections added by other agents
