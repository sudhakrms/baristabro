# Walter — History

## Project Context

- **Project:** BrewSchool — Interactive coffee education SPA
- **Stack:** React 18 + TypeScript, D3.js, SVG animations
- **User:** Sudhakar S
- **Created:** 2026-04-08

## Core Context

- D3.js sunburst for SCA flavor wheel with hierarchical data
- SVG cup diagrams showing drink layer compositions with animated fills
- 5-axis taste radar chart (acidity, body, sweetness, bitterness, aftertaste)
- Warm color palette per flavor category
- Touch-friendly interactions for mobile
- React handles state; D3 handles DOM for viz elements

## Learnings

- **D3-React pattern:** useRef for SVG container, useEffect for D3 render, cleanup on unmount via `svg.selectAll('*').remove()`. React owns state (selected segment), D3 owns DOM layout (partition + arc).
- **Sunburst:** `d3.partition().size([2π, radius])` with `d3.arc()` — filter `depth > 0` to skip root node. Arc labels only on inner ring segments with angular width > 0.3 rad.
- **CupDiagram:** Layers reversed (bottom-first), fill animated with Framer Motion `initial={{ y: bottom, height: 0 }}`. Clip path masks layers inside cup outline. `isLightColor()` helper for contrast text.
- **TasteRadar:** Pure SVG pentagon radar — 5 axes at 72° intervals starting from -90°. Concentric guide rings at 20% intervals. Reusable — Jesse's BeanExplorer can import from `src/components/TasteRadar.tsx`.
- **Key files:**
  - `src/components/CupDiagram.tsx` — shared SVG cup with animated layers
  - `src/components/TasteRadar.tsx` — 5-axis taste radar (exported independently)
  - `src/sections/FlavorWheel.tsx` — D3 sunburst + detail panel + TasteRadar demo
  - `src/sections/DrinksGuide.tsx` — tab-filtered drinks grid with expandable cards + CupDiagram + composition bar
- **Responsive:** Sunburst measures container width, caps at 520px. Drinks grid: 1/2/3 cols via Tailwind breakpoints.
- **Accessibility:** All interactive SVG elements have `role="button"`, `tabindex`, `aria-label`. Tabs use `role="tablist"`/`role="tab"`. Color swatches supplement labels — never color-only.
- **Section architecture (IndianCoffee):** Tab-filtered grid + expandable cards pattern mirrors DrinksGuide. Key additions: colored left-border per brand, dual TasteRadar sizes (180px collapsed, 260px expanded), TypeBadge pill component. AnimatePresence with `popLayout` mode for smooth tab switches. Framer Motion `ease` must be typed (use default, not string literal) to satisfy `motion-dom` strict types.
- **TasteRadar reuse:** Confirmed zero-friction reuse — import `TasteRadar` directly and pass `scores` + `size`. No wrapper needed. Works at any size; 180px is minimum for readable labels. Component already has `aria-label` with all five scores.
- **Key files (updated):**
  - `src/sections/IndianCoffee.tsx` — Indian Coffee Heritage section with tab filters, expandable cards, TasteRadar per card
  - `src/data/indianCoffee.ts` — `IndianCoffeeBrand` interface + 9 brands/estates data (Hank may replace data, interface is canonical)

## Latest Work (2026-04-08)

**Task:** Create IndianCoffee.tsx section + integrate with app + Navbar wiring  
**Status:** ✅ Delivered

- Created `src/sections/IndianCoffee.tsx`
  - Tab-filtered grid: All/Estates/Brands/Espresso tabs
  - Expandable card design with smooth animations
  - Per-card colored accent dot (left border) for visual scanning
  - Type badge + region metadata
  - TasteRadar: 180px collapsed, 260px expanded (reuses `src/components/TasteRadar.tsx`)
  - Flavor tags (truncated/full per state)
  - Notable products + processing/established year badges

- **Integration:**
  - Wired into `App.tsx` after BrewingMethods section
  - Added "Indian Coffee" navigation item to Navbar
  - Consistent spacing + scroll-triggered animations via SectionWrapper

- **Technical Details:**
  - Framer Motion AnimatePresence with `popLayout` mode for tab transitions
  - TasteRadar reused from shared component (zero-friction, pass scores + size)
  - Type-safe Framer Motion `ease` (default, not string literal)
  - Responsive grid: 1/2/3 cols via Tailwind breakpoints
  - Follows DrinksGuide + BeanExplorer card patterns for consistency

**Build:** Part of combined 157.90 KB JS + 5.82 KB CSS gzipped, 2711 modules, zero errors.

**Parallel delivery:** Coordinated with Jesse (SVG beans) and Hank (indianCoffee.ts data).
