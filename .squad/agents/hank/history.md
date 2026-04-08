# Hank — History

## Project Context

- **Project:** BrewSchool — Interactive coffee education SPA
- **Stack:** Content/data layer (TypeScript data files)
- **User:** Sudhakar S
- **Created:** 2026-04-08

## Core Context

- 4 bean types to document: Arabica, Robusta, Liberica, Excelsa
- ~38 coffee terms across categories: Brewing, Tasting, Equipment, Culture
- SCA flavor wheel data (hierarchical categories/subcategories)
- 20 coffee drinks with composition ratios and layer descriptions
- 10 brewing methods with parameters (grind, temp, time, ratio, steps)
- All content must be accurate enough for barista-level education

## Learnings

- **Data files delivered (2026-04-08):** All 5 TypeScript data files created in `src/data/`:
  - `beans.ts` — 4 beans (Arabica, Robusta, Liberica, Excelsa) with Bean interface, 1–10 radar chart scores
  - `terminology.ts` — 38 terms (10 Brewing, 10 Tasting, 10 Equipment, 8 Culture) with Term interface
  - `flavorWheel.ts` — SCA-based hierarchical FlavorNode tree, 9 main categories with warm color palette
  - `drinks.ts` — 20 drinks with DrinkComposition (percentage-based) + DrinkLayer (color + percentage), layer colors as const object
  - `brewingMethods.ts` — 10 methods with BrewingMethod interface, dual °C/°F temps, SCA-accurate ratios
- **Structure decisions:** Every file exports both the TypeScript interface AND the data array as named exports. Drinks file also exports DrinkLayer and DrinkComposition sub-interfaces. Layer colors defined as a `const` object for reuse.
- **Excelsa classification:** Documented as `Coffea liberica var. dewevrei` per the 2006 reclassification, but noted the industry still treats it as a distinct type. This matters for accuracy.
- **Composition ratios:** Drinks use percentage-based composition (espresso + milk + foam + water + other = 100%). Layer percentages are independent and represent visual stacking order for the cup diagram SVG.
- **Flavor wheel:** Root node is "Coffee Flavors" — D3 sunburst should start from this single root. 9 main categories, 37 subcategories total. Colors chosen from a warm palette for visual harmony.
- **Brewing temps:** All in dual format (°C/°F). Moka pot entry uses pre-boiled water technique (modern best practice) rather than old cold-water method.
