# BaristaBro Rebrand — Brand Identity Update

**Date:** 2026-04-08  
**Agent:** Lydia (UX Designer)  
**Status:** Implemented  
**Priority:** High (Brand Identity)

## Decision

Rebranded the application from **BrewSchool** to **BaristaBro** with a complete visual identity update:

1. **New Logo/Character:** Created custom SVG barista character (40-45 year old male with beard, mustache, short neat hair) as favicon and hero illustration
2. **Color Palette Refinement:** Warmed up accent colors and backgrounds to feel more masculine, casual-expert, and approachable
3. **Voice/Tone Shift:** From academic/institutional to knowledgeable-friend barista personality
4. **Hero Section Redesign:** New character illustration, conversational headlines, first-person voice

## Rationale

The "BrewSchool" brand implied formal education and institutional tone. The new "BaristaBro" brand positions the experience as learning from a seasoned, approachable barista — warm, knowledgeable, but unpretentious. This better matches the coffee culture aesthetic and makes the content feel more accessible.

## Implementation

**Changed Files:**
- `public/favicon.svg` — New barista character logo
- `src/styles/theme.css` — Updated color tokens (warmer, richer accents)
- `src/sections/Hero.tsx` — New animated character, conversational copy
- `index.html` — Updated title and meta description

**Color Updates:**
- Light accent: `#8B4513` → `#A85F2A` (richer amber)
- Dark accent hover: `#E0B98A` → `#E8C79E` (warmer gold)
- Backgrounds subtly warmed across both themes

**Design System Impact:**
- All CSS custom property names preserved
- No breaking changes to component API
- Typography, spacing, and interaction patterns unchanged

## Notes

The navbar already displayed "BaristaBro" text, suggesting this rebrand may have been partially implemented previously. This update completes the visual identity across logo, colors, and messaging.
