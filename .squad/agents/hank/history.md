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
- **Indian coffee data delivered:** `src/data/indianCoffee.ts` — 15 entries with `IndianCoffeeBrand` interface, 1–10 radar scores, organized by type (5 estates, 8 brands, 1 blend, 1 espresso-focused). Covers Karnataka (~70% of Indian production), Tamil Nadu filter coffee tradition, Andhra Pradesh specialty (Araku), and Kerala coast (Monsooned Malabar).
  - **Estates:** Tata Coffee/Coorg, Bababudangiri (birthplace ~1670), Sethuraman (Blue Tokai sourcing), Kerehaklu, Ratnagiri
  - **Brands:** Blue Tokai, Third Wave, Cothas, Narasu's, Levista, MNEB (export grade), Indian Coffee House
  - **Specialty:** Sleepy Owl (cold brew/espresso), Araku Coffee (Paris award winner)
  - **Iconic process:** Monsooned Malabar (colonial-era accidental origin, deliberate monsoon exposure)
- **KC Das correction:** Task listed "KC Das Coffee" as a heritage Mysore coffee brand, but KC Das is actually famous for sweets (rasgulla). Replaced with Mysore Nuggets Extra Bold (MNEB) — India's actual premium export-grade Arabica classification from the Mysore region. This is the real heritage coffee name associated with Mysore.
- **Araku award accuracy:** The Paris award was the Prix de l'Association at the Café de Paris awards (2018), not the Prix Épicures d'Or. The previous version of the file had this wrong.
- **Araku award accuracy:** The Paris award was the Prix de l'Association at the Café de Paris awards (2018), not the Prix Épicures d'Or. The previous version of the file had this wrong.
- **Indian coffee key facts for reference:** India is 6th-largest global producer. Baba Budan brought 7 beans from Yemen (~1670). Karnataka = ~70% of production. Shade-grown + intercropped with cardamom/pepper is the norm. Monsooned Malabar = uniquely Indian processing. South Indian filter coffee uses steel tumbler-davara, chicory blends, decoction method.

## Latest Work (2026-04-08)

**Task:** Create indianCoffee.ts with 15 comprehensive Indian coffee entries + KC Das correction  
**Status:** ✅ Delivered

- Created `src/data/indianCoffee.ts`
  - `IndianCoffeeBrand` TypeScript interface (matches pattern from beans.ts, drinks.ts, etc.)
  - 15 entries: 5 estates, 8 brands, Araku Coffee, Monsooned Malabar
  - Differentiated taste radar scores (1–10 per acidity/body/sweetness/bitterness/aftertaste)
  - Accurate regional metadata: Karnataka ~70%, Tamil Nadu filter tradition, Andhra Pradesh (Araku), Kerala monsoon
  - Real flavor profiles + processing details per entry

- **Critical Decision: KC Das → MNEB**
  - Task listed "KC Das Coffee" as heritage Mysore brand, but KC Das actually makes sweets (rasgulla), not coffee
  - Replaced with **Mysore Nuggets Extra Bold (MNEB)** — India's actual premium export-grade Arabica, Coffee Board of India certified
  - Decision logged to `decisions.md` for team consensus
  - Maintains factual accuracy and credibility for educational content

- **Entries Delivered:**
  - Estates: Tata Coffee/Coorg, Bababudangiri, Sethuraman, Kerehaklu, Ratnagiri
  - Brands: Blue Tokai, Third Wave, Cothas, Narasu's, Levista, MNEB, Indian Coffee House, Sleepy Owl
  - Specialty: Araku Coffee, Monsooned Malabar

**Build:** Part of combined 157.90 KB JS + 5.82 KB CSS gzipped, 2711 modules, zero errors.

**Parallel delivery:** Coordinated with Jesse (SVG beans + BeanExplorer) and Walter (IndianCoffee.tsx section).
