# Decision: TasteRadar is a shared component

**Author:** Walter (Viz Dev)
**Date:** 2026-04-08

## Context
The 5-axis taste radar chart (acidity, body, sweetness, bitterness, aftertaste) is needed in both the FlavorWheel section (demo) and Jesse's BeanExplorer (per-bean profiles).

## Decision
Extracted TasteRadar into `src/components/TasteRadar.tsx` as a standalone, reusable component with a simple props interface:

```ts
export function TasteRadar({ scores, size }: {
  scores: { acidity: number; body: number; sweetness: number; bitterness: number; aftertaste: number };
  size?: number;
})
```

## Impact
- Jesse should import from `src/components/TasteRadar.tsx` — no need to build a separate radar.
- Max score is hardcoded at 10 (matching bean data range). If we need a different scale later, add a `maxScore` prop.
- Pure SVG, no D3 dependency — keeps it lightweight for any consumer.
