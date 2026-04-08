# Lydia — History

## Project Context

- **Project:** BrewSchool — Interactive coffee education SPA
- **Stack:** React 18 + TypeScript, Tailwind CSS 3, Framer Motion
- **User:** Sudhakar S
- **Created:** 2026-04-08

## Core Context

- Coffee education site needs Apple-level visual polish
- Dark theme: #1A1410 bg, #D4A574 accent, warm earthy tones
- Light theme: #FEFCF9 bg, #8B4513 accent, clean and bright
- Typography: Playfair Display (headings) + Inter (body)
- Mobile-first responsive: 375px → 640px → 1024px → desktop
- Barista-culture aesthetic: warm, artisanal, premium feel

## Learnings

### Visual Polish Pass (Session 1)

**Design System Tokens Established:**
- Typography scale: 5-level clamp() system (`--text-hero`, `--text-section`, `--text-card-title`, `--text-body`, `--text-small`) — no more hardcoded breakpoint jumps
- Heading letter-spacing: `-0.02em` for tighter, more premium feel
- Body line-height: `1.65` for comfortable reading
- Dark mode heading glow: subtle `0 0 40px rgba(212, 165, 116, 0.08)` warm accent bloom

**Card Design System:**
- Unified `--card-radius: 1rem` across ALL card types (was inconsistent: some `rounded-2xl`, some `rounded-xl`)
- Unified `--card-shadow` and `--card-shadow-hover` tokens — light theme uses soft warm shadows, dark theme uses deeper blacks
- All cards use `var(--card-border)` for consistent 1px border
- Hover scale reduced from `1.02` to `1.015` — subtler, more premium

**Color Additions:**
- Added `--bg-tertiary` for alternating section backgrounds (#EDE0D4 light / #231A14 dark)
- Added `--accent-hover` for interactive state consistency
- Sections now alternate between primary and tertiary backgrounds for visual rhythm

**Interaction Polish:**
- Global `focus-visible` ring using `box-shadow` (2px bg + 4px accent) — works on all interactive elements
- ThemeToggle now has a satisfying rotation animation (AnimatePresence with rotate transition)
- Nav links use background-color hover instead of weak opacity change
- Mobile drawer uses spring physics instead of linear tween
- Mobile nav links stagger-animate on entry
- All filter/tab buttons have `minHeight: 36-44px` for proper touch targets

**Layout:**
- Section padding now uses `clamp(4rem, 6vw, 6rem)` for responsive breathing room
- Grid gaps unified to `gap-5` across all card grids

**Footer:**
- New Footer component with BrewSchool branding, coffee icon, and "Made with ☕ and curiosity"
- Matches dark/light theme, uses `--bg-secondary` background

**Mobile:**
- Hamburger button and close button sized to 44×44px (`w-11 h-11`)
- Mobile drawer widened to `w-72` for more generous touch targets
- Mobile nav links have `minHeight: 44px` with proper vertical centering
- Search input padding increased to `py-3` for comfortable touch
