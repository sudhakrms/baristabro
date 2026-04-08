// Coffee terminology — accurate definitions for barista-level education

export interface Term {
  term: string;
  definition: string;
  category: 'Brewing' | 'Tasting' | 'Equipment' | 'Culture';
}

export const terminology: Term[] = [
  // ── Brewing (10 terms) ──────────────────────────────────────────────
  {
    term: 'Extraction',
    definition:
      'The process of dissolving soluble compounds from ground coffee into water. Ideal extraction pulls 18–22% of the dry coffee mass. Under-extraction yields sour, thin cups; over-extraction produces harsh bitterness.',
    category: 'Brewing',
  },
  {
    term: 'Bloom',
    definition:
      'The initial pour of hot water over fresh grounds that causes them to swell and release trapped CO₂ — a sign of freshness. Typically uses 2× the weight of the grounds and lasts 30–45 seconds.',
    category: 'Brewing',
  },
  {
    term: 'Brew Ratio',
    definition:
      'The weight of ground coffee to the weight of water used. Common ratios range from 1:15 to 1:17 for drip and pour over (e.g., 15 g coffee to 250 g water). Espresso uses roughly 1:2 (18 g in, 36 g out).',
    category: 'Brewing',
  },
  {
    term: 'Immersion',
    definition:
      'A brewing method where grounds steep fully submerged in water for a set time (e.g., French press, AeroPress, cupping). Produces even extraction but requires a coarser grind to avoid over-extraction.',
    category: 'Brewing',
  },
  {
    term: 'Percolation',
    definition:
      'A brewing method where water flows through a bed of coffee grounds by gravity or pressure (e.g., pour over, drip, espresso). The flow rate, grind size, and contact time all interact to control extraction.',
    category: 'Brewing',
  },
  {
    term: 'Agitation',
    definition:
      'Any stirring, swirling, or turbulence applied to the coffee bed during brewing. Agitation increases extraction by moving fresh solvent against ground surfaces. Common in AeroPress and cupping.',
    category: 'Brewing',
  },
  {
    term: 'Bypass',
    definition:
      'Water that passes through the coffee bed without extracting significant solubles, often through cracks or channels. Also refers to intentionally adding water after brewing (e.g., Americano) to dilute concentration without changing extraction.',
    category: 'Brewing',
  },
  {
    term: 'Drawdown',
    definition:
      'The final phase of a pour-over brew when the remaining water drains through the coffee bed. Total drawdown time is a key diagnostic — too fast indicates under-extraction (grind too coarse), too slow indicates over-extraction (grind too fine).',
    category: 'Brewing',
  },
  {
    term: 'Degassing',
    definition:
      'The release of CO₂ from freshly roasted beans over days to weeks. Beans are usually rested 3–14 days post-roast before brewing. Excessive gas interferes with even water contact during extraction.',
    category: 'Brewing',
  },
  {
    term: 'TDS (Total Dissolved Solids)',
    definition:
      'A measurement of the concentration of dissolved coffee compounds in the finished brew, expressed as a percentage. The SCA ideal range is 1.15–1.35% TDS for drip coffee. Measured with a refractometer.',
    category: 'Brewing',
  },

  // ── Tasting (10 terms) ──────────────────────────────────────────────
  {
    term: 'Cupping',
    definition:
      'The standardized sensory evaluation protocol used globally to assess coffee quality. Coarsely ground coffee is steeped in hot water (200°F / 93°C) for 4 minutes, the crust is broken, and the liquid is slurped from a spoon to aerate it across the palate.',
    category: 'Tasting',
  },
  {
    term: 'Acidity',
    definition:
      'A desirable, bright, tangy quality in coffee — not sourness or pH. Often described as citric, malic (apple-like), or phosphoric (sparkling). High-altitude Arabicas from Kenya and Ethiopia are prized for their vibrant acidity.',
    category: 'Tasting',
  },
  {
    term: 'Body',
    definition:
      'The tactile weight and texture of coffee on the palate, ranging from tea-like (light) to syrupy (full). Influenced by brew method, roast level, and the presence of oils and suspended solids. French press produces a heavier body than paper-filtered pour over.',
    category: 'Tasting',
  },
  {
    term: 'Finish (Aftertaste)',
    definition:
      'The flavors and sensations that linger on the palate after swallowing. A long, clean, pleasant finish is a hallmark of high-quality specialty coffee. Bitterness or astringency in the finish may indicate over-extraction or defective beans.',
    category: 'Tasting',
  },
  {
    term: 'Mouthfeel',
    definition:
      'The physical sensations in the mouth beyond flavor — includes viscosity, astringency, creaminess, and effervescence. Distinct from body; a coffee can have a light body but a silky mouthfeel.',
    category: 'Tasting',
  },
  {
    term: 'Flavor Notes',
    definition:
      'Descriptive terms used to communicate a coffee\'s taste characteristics (e.g., "blueberry, dark chocolate, brown sugar"). These are analogies, not additives — the compounds in coffee naturally echo these flavors.',
    category: 'Tasting',
  },
  {
    term: 'Clean Cup',
    definition:
      'A cupping term indicating the absence of off-flavors or defects in a coffee. A clean cup allows the coffee\'s true varietal and terroir character to shine without interference from processing faults.',
    category: 'Tasting',
  },
  {
    term: 'Complexity',
    definition:
      'The presence of multiple, layered flavor attributes that evolve as the coffee cools. A complex coffee might shift from bright citrus when hot to chocolate and caramel as it approaches room temperature.',
    category: 'Tasting',
  },
  {
    term: 'Astringency',
    definition:
      'A dry, puckering sensation on the tongue and cheeks caused by polyphenols (tannins). Mild astringency can add structure; excessive astringency is a defect, often from over-extraction or very dark roasts.',
    category: 'Tasting',
  },
  {
    term: 'Sweetness',
    definition:
      'The perception of sugar-like flavors in coffee, derived from caramelized sugars and Maillard reaction products developed during roasting. Sweetness is one of the highest-scoring attributes in SCA cupping and is a key indicator of quality.',
    category: 'Tasting',
  },

  // ── Equipment (10 terms) ────────────────────────────────────────────
  {
    term: 'Portafilter',
    definition:
      'The handled metal filter holder that locks into an espresso machine\'s group head. Contains a basket where ground coffee is dosed and tamped. Common sizes are 58 mm (commercial standard), 54 mm, and 51 mm.',
    category: 'Equipment',
  },
  {
    term: 'Burr Grinder',
    definition:
      'A grinder using two revolving abrasive surfaces (burrs) to crush beans to a consistent particle size. Far superior to blade grinders for uniformity. Available in flat-burr and conical-burr designs, each producing slightly different particle distributions.',
    category: 'Equipment',
  },
  {
    term: 'Group Head',
    definition:
      'The component of an espresso machine where the portafilter locks in and water is delivered to the coffee puck under pressure. E61-style group heads (invented 1961 by Faema) use a thermosyphon system for temperature stability.',
    category: 'Equipment',
  },
  {
    term: 'Tamper',
    definition:
      'A weighted tool used to compress ground coffee evenly into the portafilter basket before extraction. Proper tamping applies roughly 15–20 kg (30–40 lbs) of pressure to create a level, uniform puck that promotes even water flow.',
    category: 'Equipment',
  },
  {
    term: 'Gooseneck Kettle',
    definition:
      'A kettle with a narrow, curved spout that gives the brewer precise control over pour rate, flow direction, and turbulence — essential for pour-over methods like V60 and Chemex where pour technique directly affects extraction.',
    category: 'Equipment',
  },
  {
    term: 'PID Controller',
    definition:
      'A Proportional-Integral-Derivative controller used in espresso machines to maintain precise boiler temperature (typically ±1°F). Replaces simple thermostats and eliminates temperature surfing — critical for shot consistency.',
    category: 'Equipment',
  },
  {
    term: 'Steam Wand',
    definition:
      'A nozzle on an espresso machine that releases pressurized steam to heat and texture milk. Proper technique creates microfoam — tiny, uniform bubbles that integrate into the milk for latte art and velvety mouthfeel.',
    category: 'Equipment',
  },
  {
    term: 'Channeling',
    definition:
      'When water finds paths of least resistance through the coffee puck instead of flowing evenly, resulting in uneven extraction — some grounds are over-extracted while others are under-extracted. Caused by inconsistent grind, poor distribution, or uneven tamping.',
    category: 'Equipment',
  },
  {
    term: 'WDT (Weiss Distribution Technique)',
    definition:
      'A method of stirring ground coffee in the portafilter basket with fine needles to break up clumps and create a uniform density before tamping. Significantly reduces channeling and improves shot consistency.',
    category: 'Equipment',
  },
  {
    term: 'Refractometer',
    definition:
      'An optical instrument that measures the refractive index of brewed coffee to calculate TDS (Total Dissolved Solids). Used by baristas and Q-graders to objectively measure extraction yield and brew strength.',
    category: 'Equipment',
  },

  // ── Culture (8 terms) ──────────────────────────────────────────────
  {
    term: 'Third Wave',
    definition:
      'A movement treating coffee as an artisanal food — like wine — rather than a commodity. Emphasizes single-origin sourcing, light-to-medium roasts, transparent trade relationships, and precise brewing. Emerged in the early 2000s after first wave (mass consumption) and second wave (Starbucks-era café culture).',
    category: 'Culture',
  },
  {
    term: 'Single Origin',
    definition:
      'Coffee sourced from one country, region, farm, or lot — as opposed to a blend. Allows the drinker to taste the specific terroir, cultivar, and processing method. Traceability is a cornerstone of specialty coffee.',
    category: 'Culture',
  },
  {
    term: 'Q Grader',
    definition:
      'A professionally certified coffee taster, credentialed by the Coffee Quality Institute (CQI). Q Graders use the SCA cupping protocol to score coffees on a 100-point scale. A score of 80+ qualifies a coffee as "specialty grade."',
    category: 'Culture',
  },
  {
    term: 'Crema',
    definition:
      'The golden-brown, velvety foam that forms on top of a well-pulled espresso shot. Created by CO₂ emulsifying with oils under 9 bars of pressure. Good crema is 2–3 mm thick, hazelnut-colored, and persists for about 2 minutes.',
    category: 'Culture',
  },
  {
    term: 'Latte Art',
    definition:
      'Patterns created by pouring steamed microfoam milk into espresso. Fundamental patterns include the heart, rosetta (fern), and tulip. Requires properly textured milk (55–65°C / 130–150°F) with silky microfoam — no large bubbles.',
    category: 'Culture',
  },
  {
    term: 'Direct Trade',
    definition:
      'A sourcing model where roasters buy directly from coffee producers, bypassing traditional importers. Aims to pay higher prices than Fair Trade minimums, build long-term relationships, and ensure quality through farm-level collaboration.',
    category: 'Culture',
  },
  {
    term: 'Coffee Cherry',
    definition:
      'The fruit of the coffee plant. Each cherry typically contains two seeds (coffee beans) facing each other flat-side in. The cherry has layers: outer skin, mucilage (pulp), parchment, silverskin, and the seed. Processing method (washed, natural, honey) determines how these layers are removed.',
    category: 'Culture',
  },
  {
    term: 'Specialty Coffee',
    definition:
      'Coffee scoring 80 or above on the SCA 100-point cupping scale. Represents roughly 5–10% of global production. The Specialty Coffee Association (SCA) sets standards for green grading, roasting, brewing, and water quality.',
    category: 'Culture',
  },
];
