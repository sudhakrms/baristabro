# Plan: Interactive Coffee Education SPA

## TL;DR
Build a single-page coffee education website ("BrewSchool") using **React + TypeScript + Vite + Tailwind CSS**, featuring 6 interactive sections: Bean Explorer, Terminology Glossary, Flavor Wheel, Drink Guide, Brewing Methods, and a curated barista-culture dark/light theme. Interactive visuals will use **Framer Motion** for animations and **D3.js** for the flavor wheel. Mobile-first responsive design throughout.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React 18 + TypeScript | Rich ecosystem, component model ideal for interactive sections |
| Build | Vite 5 | Fast dev server, optimized production builds |
| Styling | Tailwind CSS 3 + CSS custom properties | Rapid styling, theming via CSS variables |
| Animation | Framer Motion | Declarative animations, scroll-triggered, gesture support |
| Data Viz | D3.js (flavor wheel only) | Industry standard for radial/hierarchical charts |
| Icons | Lucide React | Clean, consistent icon set |
| Routing | None (single scroll page with section anchoring) | SPA requirement — smooth scroll between sections |
| Deployment | Static build (Vite `dist/`) | Can deploy to any static host |

---

## Phase 1: Project Scaffolding & Theming (Foundation)

### Step 1 — Initialize project
- `npm create vite@latest . -- --template react-ts`
- Install deps: `tailwindcss`, `framer-motion`, `d3`, `lucide-react`
- Configure Tailwind with custom theme extending barista palette
- Set up folder structure:
  ```
  src/
    components/       # Shared UI components
    sections/         # Page sections (one per feature)
    data/             # Static coffee data (JSON/TS)
    hooks/            # Custom hooks (useTheme, useInView, etc.)
    assets/           # SVGs, images
    styles/           # Global CSS, theme variables
    App.tsx
    main.tsx
  ```

### Step 2 — Theme system (dark/light)
- Define CSS custom properties in `:root` and `[data-theme="dark"]`
- **Dark theme**: `--bg-primary: #1A1410`, `--bg-secondary: #2B1F18`, `--accent: #D4A574`, `--text-primary: #F5E6D3`, `--text-secondary: #C9B5A1`, `--border: #4A3F38`
- **Light theme**: `--bg-primary: #FEFCF9`, `--bg-secondary: #F5E6D3`, `--accent: #8B4513`, `--text-primary: #2B1810`, `--text-secondary: #5D4633`, `--border: #D9CDD3`
- `useTheme` hook: reads `prefers-color-scheme`, stores preference in localStorage, toggles `data-theme` attribute on `<html>`
- Theme toggle button in navbar with smooth color transition (CSS `transition: all 0.3s`)

### Step 3 — Layout shell & navigation
- Sticky top navbar with logo, section links (smooth scroll `scrollIntoView`), theme toggle
- Mobile: hamburger menu with slide-in drawer
- Section wrapper component with consistent padding, scroll snap, and Framer Motion fade-in-on-scroll
- Hero section with headline, subtext, and subtle background gradient using coffee tones

---

## Phase 2: Coffee Data Layer

### Step 4 — Structure all coffee data as TypeScript constants *(parallel with Step 3)*
- `src/data/beans.ts` — 4 bean types with fields: name, species, marketShare, flavorProfile, regions[], altitude, caffeine, shape, size, color
- `src/data/terminology.ts` — array of ~38 terms: { term, definition, category }
- `src/data/flavorWheel.ts` — hierarchical structure for D3: nested categories/subcategories matching SCA wheel
- `src/data/drinks.ts` — 20 drinks: { name, type, composition: { espresso%, milk%, foam%, water%, other% }, servingSize, origin, description, layers[] }
- `src/data/brewingMethods.ts` — 10 methods: { name, grindSize, waterTemp, brewTime, ratio, steps[], equipment }
- `src/data/themes.ts` — color tokens for both themes

---

## Phase 3: Interactive Sections (can be built in parallel)

### Step 5 — Bean Explorer section
- Horizontal scrollable card carousel (or grid on desktop)
- Each card: bean illustration (SVG silhouette), name, key stats (caffeine, altitude, market share)
- Click/tap to expand: full flavor profile, growing regions on a mini world-map SVG, visual size comparison
- Framer Motion: cards animate in on scroll, expand with `layoutId` transitions
- Comparison mode: select 2 beans → side-by-side stats comparison panel

### Step 6 — Coffee Terminology section *(parallel with 5)*
- Searchable/filterable glossary grid
- Each term is a flip-card: front = term, back = definition
- Filter by category pills (Brewing, Tasting, Equipment, Culture)
- Mobile: stacked list with accordion expand
- Framer Motion: stagger animation on filter change

### Step 7 — Interactive Flavor Wheel *(parallel with 5, 6)*
- **D3.js sunburst/radial chart** rendering SCA flavor wheel data
- Outer ring = subcategories, inner ring = main categories
- Click a segment → expands that category, shows description + associated beans/drinks
- Color coding: each main category gets a distinct warm-palette hue
- Companion panel: selected flavor details, intensity slider visualization
- Touch-friendly: tap to select on mobile
- Taste dimension radar chart: 5-axis (acidity, body, sweetness, bitterness, aftertaste)

### Step 8 — Coffee Drinks Guide *(parallel with 5, 6, 7)*
- Visual "cup diagram" for each drink: animated SVG showing layers (espresso, milk, foam, water, chocolate, etc.) with correct proportions
- Drinks grid with category tabs: Espresso-based | Traditional | Specialty
- Click drink → animated cup fills from bottom up showing each layer with label
- Details panel: composition ratios, origin story, serving style
- Mobile: swipeable horizontal cards with cup animation

### Step 9 — Brewing Methods section *(parallel with 5, 6, 7, 8)*
- Step-by-step interactive guide per method
- Visual timeline: horizontal steps with icons (grind → heat water → brew → serve)
- Click a method card → expands into full walkthrough with animated step progression
- Key specs displayed as icon+value pairs: grind size, water temp, brew time, ratio
- Progress indicator as user reads through steps
- Equipment illustration (simple SVG for each brewing device)

---

## Phase 4: Hero & Polish

### Step 10 — Hero section *(depends on Steps 1-3)*
- Full-viewport hero with animated coffee steam SVG or particle effect
- Headline: large serif font ("The Art & Science of Coffee")
- Scroll-down indicator (animated chevron)
- Background: subtle gradient (#1A1410 → #2B1F18 in dark, cream gradient in light)

### Step 11 — Scroll animations & transitions *(depends on Steps 5-9)*
- Each section fades/slides in on viewport entry using `useInView` + Framer Motion
- Parallax effect on section backgrounds (subtle, 0.1x speed)
- Smooth scroll-snap between sections on desktop
- Performance: use `will-change`, lazy-load heavy sections (flavor wheel, drink animations)

### Step 12 — Responsive polish & accessibility *(depends on Steps 5-9)*
- Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Touch targets ≥ 44px for all interactive elements
- `prefers-reduced-motion` media query → disable animations
- Semantic HTML: proper headings, landmarks, ARIA labels on interactive widgets
- Keyboard navigation for flavor wheel and cards
- Color contrast: all text meets WCAG AA (4.5:1 ratio) — verified by palette choices above

---

## Phase 5: Final Integration

### Step 13 — Typography & global styles
- Heading font: `Playfair Display` (serif, warm, editorial) — Google Fonts
- Body font: `Inter` or `DM Sans` (clean sans-serif, excellent readability)
- Font scale: responsive clamp() sizes
- Subtle texture overlay on backgrounds (optional coffee-paper pattern at 3% opacity)

### Step 14 — Performance optimization
- Code-split sections with `React.lazy` + `Suspense`
- SVG sprites for icons and illustrations
- Inline critical CSS, defer non-critical
- `loading="lazy"` on any images
- Lighthouse audit targeting 90+ on all metrics

---

## Relevant Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root layout: navbar + section ordering + theme provider |
| `src/hooks/useTheme.ts` | Dark/light theme toggle with localStorage + system detection |
| `src/hooks/useInView.ts` | Intersection Observer hook for scroll animations |
| `src/styles/theme.css` | CSS custom properties for both themes |
| `src/data/beans.ts` | Bean type data |
| `src/data/terminology.ts` | Glossary data |
| `src/data/flavorWheel.ts` | SCA flavor wheel hierarchical data for D3 |
| `src/data/drinks.ts` | 20 coffee drinks with composition ratios |
| `src/data/brewingMethods.ts` | 10 brewing methods with steps |
| `src/sections/Hero.tsx` | Hero section with animation |
| `src/sections/BeanExplorer.tsx` | Interactive bean cards + comparison |
| `src/sections/Terminology.tsx` | Searchable glossary |
| `src/sections/FlavorWheel.tsx` | D3 sunburst + taste radar chart |
| `src/sections/DrinksGuide.tsx` | Animated cup diagrams |
| `src/sections/BrewingMethods.tsx` | Step-by-step brewing guides |
| `src/components/Navbar.tsx` | Sticky nav with theme toggle + mobile drawer |
| `src/components/SectionWrapper.tsx` | Shared section layout with scroll animation |
| `src/components/CupDiagram.tsx` | Animated SVG cup layer visualization |
| `src/components/ThemeToggle.tsx` | Dark/light toggle button |
| `tailwind.config.ts` | Extended Tailwind theme with coffee palette |
| `index.html` | Entry HTML with font links + meta tags |
| `package.json` | Dependencies and scripts |

---

## Verification

1. **Build**: `npm run build` completes without errors
2. **Dev server**: `npm run dev` starts and renders all 6 sections
3. **Theme toggle**: switching dark ↔ light updates all sections; persists on reload; respects system preference on first visit
4. **Mobile responsive**: Chrome DevTools responsive mode — test at 375px (iPhone SE), 768px (iPad), 1440px (desktop)
5. **Flavor wheel**: click/tap segments → detail panel updates; touch gestures work on mobile
6. **Drink animations**: cup diagrams animate layer fills correctly for at least espresso, latte, cappuccino, americano
7. **Accessibility**: run axe-core or Lighthouse accessibility audit — target 90+ score
8. **Performance**: Lighthouse performance score 90+ on mobile simulation
9. **Scroll animations**: sections animate in on scroll; `prefers-reduced-motion` disables them
10. **Keyboard nav**: Tab through all interactive elements, Enter/Space activates them

---

## Decisions

- **No router** — single scrollable page with section anchoring; simplest UX for educational content
- **No backend** — all coffee data is static TypeScript; no API needed
- **D3.js only for flavor wheel** — other visuals use SVG + Framer Motion (lighter, simpler)
- **No CSS-in-JS** — Tailwind + CSS custom properties for theming (better performance, smaller bundle)
- **Content is hardcoded** — no CMS; content changes are code changes (appropriate for curated educational content)
- **Scope includes**: 6 interactive sections, dark/light theme, mobile responsive, scroll animations, accessibility
- **Scope excludes**: user accounts, quiz/gamification, backend/API, CMS, e-commerce, blog, multi-language support
