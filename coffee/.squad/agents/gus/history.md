# Gus — History

## Project Context

- **Project:** BrewSchool — Interactive coffee education SPA
- **Stack:** React 18 + TypeScript, Vite 5, Tailwind CSS 3, Framer Motion, D3.js (flavor wheel), Lucide React
- **User:** Sudhakar S
- **Created:** 2026-04-08

## Core Context

- Single-page scroll app with 6 interactive sections: Bean Explorer, Terminology, Flavor Wheel, Drinks Guide, Brewing Methods, Hero
- No backend — all data is static TypeScript
- Dark/light theme via CSS custom properties
- No router — section anchoring with smooth scroll
- D3.js only for flavor wheel; other visuals use SVG + Framer Motion

## Learnings

- **Phase 1 completed**: Project scaffold, theme system, layout shell all built and verified with `npm run build`
- **Vite 8 + @tailwindcss/vite**: Using the Vite plugin approach for Tailwind (not PostCSS config). Import via `@import "tailwindcss"` in index.css
- **Theme architecture**: CSS custom properties in `:root` (light default) and `[data-theme="dark"]`. `useTheme` hook manages localStorage + system preference detection. Smooth 0.3s transitions on bg/color/border
- **ThemeToggle**: Uses Lucide Sun/Moon icons, wired through useTheme hook
- **Navbar**: Sticky with backdrop-blur, `color-mix()` for translucent bg. Mobile drawer uses Framer Motion AnimatePresence + slide from right
- **SectionWrapper**: Framer Motion fade-in-on-scroll using custom `useInView` hook (IntersectionObserver)
- **Hero**: Animated coffee steam SVG with looping pathLength animations, bouncing chevron scroll indicator
- **Folder structure**: `src/{components,sections,data,hooks,assets,styles}` — clean separation
- **Key files**: `vite.config.ts` (Tailwind plugin), `src/styles/theme.css` (tokens), `src/hooks/useTheme.ts`, `src/hooks/useInView.ts`, `src/components/Navbar.tsx`, `src/components/ThemeToggle.tsx`, `src/components/SectionWrapper.tsx`, `src/sections/Hero.tsx`, `src/App.tsx`
- **Google Fonts**: Playfair Display (headings) + Inter (body) loaded via index.html preconnect
