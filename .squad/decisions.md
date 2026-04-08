# Squad Decisions

## Active Decisions

### Phase 1 Architecture Choices (Gus)
- **Tailwind via Vite plugin** — Using `@tailwindcss/vite` instead of PostCSS for simpler setup and faster builds
- **Theme tokens in CSS custom properties** — Variables in `:root` (light) and `[data-theme="dark"]` decoupled from Tailwind utilities
- **`useTheme` hook as single source of truth** — Manages system preference, localStorage persistence, and `data-theme` attribute
- **`color-mix()` for navbar translucency** — Modern CSS with graceful fallback
- **`SectionWrapper` as composition boundary** — Handles consistent padding and scroll-triggered animations
- **Architectural pattern paths** — Sections in `src/sections/`, shared UI in `src/components/`, data in `src/data/`

### Coffee Data Structure Conventions (Hank)
- **Named exports only** — All data files export both interfaces and arrays, no default exports
- **Composition percentages sum to 100** — Drink recipes use percentage-based compositions (espresso + milk + foam + water + other)
- **Layer percentages are visual** — Distinct from composition percentages for SVG cup diagrams
- **Flavor wheel structure** — Root node "Coffee Flavors" with 9 categories and 37 subcategories (SCA standard)
- **Radar chart scores** — Beans scored 1-10 on 5 dimensions (acidity, body, sweetness, bitterness, aftertaste)
- **Color constants in drinks.ts** — All UI colors should import from or replicate the hex constants defined there

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
