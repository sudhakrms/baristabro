# BrewSchool — Implementation Plan

## Problem
Build "BrewSchool", an interactive single-page coffee education website from scratch in the `coffee/` directory. The design doc (`plan.md`) specifies React + TypeScript + Vite + Tailwind CSS with 6 interactive sections, dark/light theming, Framer Motion animations, and a D3.js flavor wheel. No code exists yet.

## Approach
Implement across 5 phases with 14 steps, matching the design doc. Phases 1–2 are sequential (foundation + data). Phase 3 sections are parallelizable. Phases 4–5 are polish/integration.

---

## Phase 1: Project Scaffolding & Theming

### TODO: scaffold-project
**Title:** Initialize Vite + React + TypeScript project  
**Description:** Run `npm create vite@latest` with react-ts template in the coffee directory. Install all dependencies: tailwindcss, postcss, autoprefixer, framer-motion, d3, lucide-react. Configure Tailwind with custom coffee palette. Set up folder structure: `src/{components,sections,data,hooks,assets,styles}`. Add Google Fonts (Playfair Display, Inter) to `index.html`.

### TODO: theme-system
**Title:** Implement dark/light theme system  
**Description:** Create CSS custom properties in `src/styles/theme.css` for both themes (dark: #1A1410 bg, #D4A574 accent; light: #FEFCF9 bg, #8B4513 accent). Build `useTheme` hook reading `prefers-color-scheme`, storing preference in localStorage, toggling `data-theme` on `<html>`. Include smooth 0.3s color transitions.  
**Depends on:** scaffold-project

### TODO: layout-shell
**Title:** Build layout shell, navbar & hero  
**Description:** Create sticky Navbar with logo, section anchor links (smooth scroll), ThemeToggle, mobile hamburger drawer. Create SectionWrapper component with consistent padding and Framer Motion fade-in-on-scroll. Build Hero section with animated coffee steam SVG, headline typography, scroll-down indicator. Create `useInView` hook for Intersection Observer.  
**Depends on:** theme-system

---

## Phase 2: Coffee Data Layer

### TODO: coffee-data
**Title:** Create all static coffee data files  
**Description:** Build TypeScript data modules with full type definitions:
- `src/data/beans.ts` — 4 bean types (Arabica, Robusta, Liberica, Excelsa) with name, species, marketShare, flavorProfile, regions[], altitude, caffeine, shape, size, color
- `src/data/terminology.ts` — ~38 terms with { term, definition, category }
- `src/data/flavorWheel.ts` — hierarchical SCA wheel data for D3 sunburst
- `src/data/drinks.ts` — 20 drinks with composition ratios (espresso%, milk%, foam%, water%, other%), layers[], origin
- `src/data/brewingMethods.ts` — 10 methods with grindSize, waterTemp, brewTime, ratio, steps[], equipment  
**Depends on:** scaffold-project (can run parallel with theme-system and layout-shell)

---

## Phase 3: Interactive Sections (parallelizable)

### TODO: bean-explorer
**Title:** Build Bean Explorer section  
**Description:** Horizontal scrollable card carousel (grid on desktop). Each card: bean SVG silhouette, name, key stats. Click to expand with `layoutId` transitions showing full profile, mini world-map SVG for regions, size comparison. Comparison mode: select 2 beans → side-by-side panel. Framer Motion scroll-triggered card animations.  
**Depends on:** layout-shell, coffee-data

### TODO: terminology-section
**Title:** Build Coffee Terminology glossary  
**Description:** Searchable/filterable glossary grid. Flip-cards (front=term, back=definition). Category filter pills (Brewing, Tasting, Equipment, Culture). Mobile accordion variant. Framer Motion stagger animations on filter change.  
**Depends on:** layout-shell, coffee-data

### TODO: flavor-wheel
**Title:** Build Interactive Flavor Wheel with D3  
**Description:** D3.js sunburst/radial chart rendering SCA wheel data. Outer ring=subcategories, inner=main categories. Click segment → expand + show description + associated beans/drinks in companion panel. Warm-palette color coding per category. Touch-friendly tap-to-select on mobile. Include 5-axis taste radar chart (acidity, body, sweetness, bitterness, aftertaste).  
**Depends on:** layout-shell, coffee-data

### TODO: drinks-guide
**Title:** Build Coffee Drinks Guide  
**Description:** Visual animated SVG "cup diagram" per drink showing layers with correct proportions. Drinks grid with category tabs (Espresso-based, Traditional, Specialty). Click drink → animated cup fills from bottom up. Details panel with composition ratios, origin story, serving style. Mobile swipeable cards. Create `CupDiagram.tsx` component.  
**Depends on:** layout-shell, coffee-data

### TODO: brewing-methods
**Title:** Build Brewing Methods section  
**Description:** Step-by-step interactive guide per method. Visual timeline with icons (grind → heat → brew → serve). Click method card → expand into walkthrough with animated step progression. Key specs as icon+value pairs. Progress indicator. Simple SVG equipment illustrations.  
**Depends on:** layout-shell, coffee-data

---

## Phase 4: Hero & Polish

### TODO: scroll-animations
**Title:** Add scroll animations & transitions  
**Description:** Each section fades/slides in on viewport entry via useInView + Framer Motion. Subtle parallax on section backgrounds (0.1x speed). Smooth scroll-snap between sections on desktop. Performance: use `will-change`, lazy-load heavy sections (flavor wheel, drink animations).  
**Depends on:** bean-explorer, terminology-section, flavor-wheel, drinks-guide, brewing-methods

### TODO: responsive-a11y
**Title:** Responsive polish & accessibility  
**Description:** Verify breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px). Touch targets ≥44px. `prefers-reduced-motion` → disable animations. Semantic HTML with proper headings, landmarks, ARIA labels. Keyboard navigation for flavor wheel and cards. WCAG AA color contrast verification.  
**Depends on:** bean-explorer, terminology-section, flavor-wheel, drinks-guide, brewing-methods

---

## Phase 5: Final Integration

### TODO: typography-styles  
**Title:** Typography & global styles finalization  
**Description:** Verify Playfair Display (headings) + Inter (body) rendering. Responsive `clamp()` font sizes. Optional subtle coffee-paper texture overlay at 3% opacity on backgrounds. Final global style polish.  
**Depends on:** scroll-animations, responsive-a11y

### TODO: performance-optimization
**Title:** Performance optimization & build verification  
**Description:** Code-split sections with `React.lazy` + `Suspense`. SVG sprites for icons/illustrations. Inline critical CSS, defer non-critical. `loading="lazy"` on images. Run `npm run build` successfully. Target Lighthouse 90+ on all metrics.  
**Depends on:** typography-styles

---

## Verification Checklist
1. `npm run build` completes without errors
2. `npm run dev` starts and renders all 6 sections
3. Theme toggle: dark ↔ light updates all sections, persists on reload, respects system preference
4. Mobile responsive at 375px, 768px, 1440px
5. Flavor wheel: click/tap segments → detail panel updates
6. Drink animations: cup diagrams animate correctly for espresso, latte, cappuccino, americano
7. Accessibility: Lighthouse 90+ score
8. Performance: Lighthouse 90+ on mobile
9. Scroll animations work; `prefers-reduced-motion` disables them
10. Keyboard navigation through all interactive elements

---

## Decisions
- **No router** — single scrollable page with section anchoring
- **No backend** — all data is static TypeScript
- **D3 only for flavor wheel** — other visuals use SVG + Framer Motion
- **Tailwind + CSS custom properties** (no CSS-in-JS)
- **Content hardcoded** (no CMS)
- **In scope:** 6 sections, theming, responsive, animations, accessibility
- **Out of scope:** user accounts, quizzes, backend, CMS, e-commerce, i18n
