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

### Design System Tokens (Lydia)

**Date:** 2025-07-16  
**Status:** Implemented

Established comprehensive CSS custom property system in `theme.css`:
- Typography: `--text-hero`, `--text-section`, `--text-card-title`, `--text-body`, `--text-small` using responsive `clamp()` values
- Cards: `--card-radius: 1rem`, unified shadows and padding tokens
- Interaction: `--focus-ring` for global focus-visible styling, transition speed tokens
- Spacing: `--section-padding-y` with responsive clamp values
- Dark mode: `--heading-glow` adds warm amber glow to headings
- `--bg-tertiary` enables alternating section background patterns

**Rationale:** Single source of truth prevents visual inconsistency from hardcoded values.

### TasteRadar Shared Component (Walter)

**Date:** 2026-04-08  
**Status:** Implemented

5-axis taste radar chart extracted to `src/components/TasteRadar.tsx` for reuse across FlavorWheel (demo) and BeanExplorer (per-bean profiles).

```ts
export function TasteRadar({ scores, size }: {
  scores: { acidity: number; body: number; sweetness: number; bitterness: number; aftertaste: number };
  size?: number;
})
```

Max score hardcoded at 10 (matching bean data range); add `maxScore` prop if alternate scales needed.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
