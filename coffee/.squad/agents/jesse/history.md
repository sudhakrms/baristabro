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
- **Bean SVG illustrations** (`src/assets/beans/`): 4 detailed SVGs (arabica, robusta, liberica, excelsa) with per-bean gradients, 3D highlights/shadows via radialGradient, center crease lines, surface texture, and feGaussianBlur drop shadows. Each uses unique IDs (e.g., `arabica-body`, `robusta-drop`) to avoid SVG filter/gradient collisions when multiple beans render on the same page. Viewbox `0 0 200 200`, transparent bg. Liberica/Excelsa use custom `<path>` for asymmetric shapes; Arabica/Robusta use `<ellipse>`.
- **Bean image integration**: Static SVG imports → `beanImages` Record map by bean name. Hero image (140px) at card top with fade-in + float-up Framer Motion entrance, hover scale+rotate. Expanded view shows 220px centered image. Comparison panel shows both 120px images side-by-side with slide-in animations.

## Latest Work (2026-04-08)

**Task:** Create 4 SVG bean illustrations + integrate with BeanExplorer  
**Status:** ✅ Delivered

- Created `src/assets/beans/arabica.svg`, `robusta.svg`, `liberica.svg`, `excelsa.svg`
  - Unique gradient/filter IDs to prevent SVG collision on multi-bean pages
  - 3D effects: radialGradient highlights, center crease lines, surface texture, feGaussianBlur drop shadows
  - Liberica/Excelsa use asymmetric `<path>` shapes; Arabica/Robusta use `<ellipse>`
  - Viewbox `0 0 200 200`, transparent background
  
- Updated `src/sections/BeanExplorer.tsx`
  - Hero images (140px) at card top with fade-in + float-up animation
  - Hover scale+rotate on hero
  - Expanded view shows 220px centered image
  - Comparison mode: 120px side-by-side images with slide-in animations
  - beanImages Record<string, string> map for static imports

**Build:** Part of combined 157.90 KB JS + 5.82 KB CSS gzipped, 2711 modules, zero errors.

**Parallel delivery:** Coordinated with Hank (indianCoffee.ts) and Walter (IndianCoffee.tsx section).
