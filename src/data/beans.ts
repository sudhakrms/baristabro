// Bean type data — accurate profiles for barista-level education

export interface Bean {
  name: string;
  species: string;
  marketShare: string;
  flavorProfile: string[];
  regions: string[];
  altitude: string;
  caffeine: string;
  shape: string;
  size: string;
  color: string;
  description: string;
  acidity: number;
  body: number;
  sweetness: number;
  bitterness: number;
  aftertaste: number;
}

export const beans: Bean[] = [
  {
    name: 'Arabica',
    species: 'Coffea arabica',
    marketShare: '60–70%',
    flavorProfile: [
      'Bright acidity',
      'Floral',
      'Fruity',
      'Sugary sweetness',
      'Berry',
      'Chocolate',
      'Caramel',
      'Nutty',
    ],
    regions: [
      'Ethiopia',
      'Colombia',
      'Brazil',
      'Guatemala',
      'Costa Rica',
      'Kenya',
      'Jamaica',
      'Yemen',
    ],
    altitude: '600–2,200 m (optimal above 1,200 m)',
    caffeine: '1.0–1.5% by weight (~95 mg per 8 oz brewed)',
    shape: 'Elongated oval with a curved center crease',
    size: '10–13 mm long',
    color: 'Light to medium green (raw); light brown to dark brown (roasted)',
    description:
      'Arabica is the gold standard of specialty coffee. Originating in the highlands of southwestern Ethiopia, it was the first species cultivated for coffee — likely beginning in Yemen during the 15th century. Arabica thrives at higher elevations where cooler temperatures slow cherry maturation, allowing complex sugars and organic acids to develop. It is self-pollinating (tetraploid, 44 chromosomes) and more susceptible to leaf rust (Hemileia vastatrix) than Robusta, which makes it costlier to grow. The cup profile is prized for its nuanced sweetness, bright acidity, and aromatic complexity — the reason it dominates the specialty-coffee market.',
    acidity: 8,
    body: 5,
    sweetness: 7,
    bitterness: 3,
    aftertaste: 7,
  },
  {
    name: 'Robusta',
    species: 'Coffea canephora',
    marketShare: '30–40%',
    flavorProfile: [
      'Strong bitterness',
      'Earthy',
      'Woody',
      'Grain-like',
      'Peanutty',
      'Dark chocolate',
      'Rubber (lower grades)',
      'Heavy body',
    ],
    regions: [
      'Vietnam',
      'Brazil',
      'Indonesia',
      'India',
      'Uganda',
      'Ivory Coast',
      'Cameroon',
    ],
    altitude: '0–800 m (sea level to low elevation)',
    caffeine: '1.7–2.5% by weight (~170 mg per 8 oz brewed)',
    shape: 'Rounder, more circular with a straighter center crease',
    size: '8–11 mm diameter',
    color: 'Pale yellowish-green (raw); medium to very dark brown (roasted)',
    description:
      'Robusta is the workhorse of the coffee world. Native to the forests of central and western sub-Saharan Africa, it is diploid (22 chromosomes), cross-pollinating, and significantly hardier than Arabica — naturally resistant to leaf rust and the coffee berry borer. Its higher caffeine content (nearly double Arabica) acts as a built-in insect deterrent. Robusta grows well at low altitudes in hot, humid climates, which lowers production costs. It is the backbone of instant coffee, Italian-style espresso blends (where it contributes body and crema), and most commercial-grade ground coffee. Fine Robusta, carefully processed, can exhibit pleasant dark chocolate and nutty notes.',
    acidity: 3,
    body: 9,
    sweetness: 3,
    bitterness: 8,
    aftertaste: 5,
  },
  {
    name: 'Liberica',
    species: 'Coffea liberica',
    marketShare: '~1–2%',
    flavorProfile: [
      'Smoky',
      'Woody',
      'Floral',
      'Jackfruit',
      'Dark chocolate',
      'Spicy',
      'Full body',
      'Slightly herbaceous',
    ],
    regions: [
      'Philippines (as Barako)',
      'Malaysia',
      'Liberia',
      'Indonesia',
      'West Africa',
    ],
    altitude: '200–800 m',
    caffeine: '1.2–1.5% by weight',
    shape: 'Asymmetrical, irregular, almond-shaped with a hooked tip',
    size: '15–20 mm — the largest commercial coffee bean',
    color: 'Yellowish-green (raw); dark brown (roasted)',
    description:
      'Liberica is the giant of the coffee genus — the trees can reach 20 meters tall, and the cherries and beans are the largest of any commercial species. It originated in Liberia, West Africa, and gained historical importance in the late 1800s when leaf rust devastated Arabica crops across Southeast Asia; the Philippines and Malaysia replanted with Liberica. Today it survives as a niche crop, most famously as "Barako" in the Batangas and Cavite provinces of the Philippines, where it is prized for its bold, smoky, slightly fruity character. The flavor is polarizing — lovers find it complex and unique; detractors find it "too woody."',
    acidity: 4,
    body: 8,
    sweetness: 4,
    bitterness: 7,
    aftertaste: 6,
  },
  {
    name: 'Excelsa',
    species: 'Coffea liberica var. dewevrei',
    marketShare: '<1%',
    flavorProfile: [
      'Tart',
      'Fruity',
      'Dark, roasty',
      'Wine-like',
      'Popcorn-like',
      'Complex layered profile',
      'Light body',
      'Bright finish',
    ],
    regions: [
      'Vietnam',
      'Philippines',
      'Laos',
      'Central Africa',
      'Indonesia',
    ],
    altitude: '300–1,000 m',
    caffeine: '~1.0% by weight',
    shape: 'Smaller and rounder than Liberica, slightly teardrop-shaped',
    size: '9–12 mm',
    color: 'Olive green (raw); medium to dark brown (roasted)',
    description:
      'Excelsa was reclassified in 2006 as a variety of Liberica (Coffea liberica var. dewevrei), but the coffee industry still treats it as distinct because the cup profile is dramatically different. Where Liberica is heavy and smoky, Excelsa is bright, tart, and fruit-forward with an unusual combination of light-roast acidity on the front palate and dark-roast depth on the finish — a duality that makes it a favorite blending component in Southeast Asia. It accounts for a tiny fraction of global production but is increasingly sought after by specialty roasters exploring rare cultivars. The trees are tall and vigorous, thriving in mid-altitude tropical climates.',
    acidity: 7,
    body: 4,
    sweetness: 5,
    bitterness: 5,
    aftertaste: 8,
  },
];
