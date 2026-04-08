// Coffee drinks data — 20 drinks with accurate composition ratios and layer diagrams

export interface DrinkLayer {
  name: string;
  color: string;
  percentage: number;
}

export interface DrinkComposition {
  espresso: number;
  milk: number;
  foam: number;
  water: number;
  other: number;
}

export interface Drink {
  name: string;
  type: 'Espresso-based' | 'Traditional' | 'Specialty';
  composition: DrinkComposition;
  layers: DrinkLayer[];
  servingSize: string;
  origin: string;
  description: string;
}

// Common layer colors
const C = {
  espresso: '#3C1518',
  crema: '#C68B59',
  milk: '#F5E6D3',
  foam: '#FFF8F0',
  water: '#C4E0F9',
  chocolate: '#5C3317',
  whippedCream: '#FFFDF7',
  condensedMilk: '#FFF3CD',
  whiskey: '#D4A017',
  iceCubes: '#D6EAF8',
  nitroBubbles: '#B0C4DE',
  coffeeConcentrate: '#2C1A0E',
} as const;

export const drinks: Drink[] = [
  // ── Espresso-based ──────────────────────────────────────────────────
  {
    name: 'Espresso',
    type: 'Espresso-based',
    composition: { espresso: 100, milk: 0, foam: 0, water: 0, other: 0 },
    layers: [
      { name: 'Crema', color: C.crema, percentage: 15 },
      { name: 'Espresso', color: C.espresso, percentage: 85 },
    ],
    servingSize: '30 ml (1 oz) single shot',
    origin: 'Italy — Milan and Turin, early 20th century',
    description:
      'The foundation of modern coffee culture. A single shot of espresso is brewed by forcing 92–96°C (197–205°F) water at 9 bars of pressure through 7–9 g of finely ground coffee in 25–30 seconds. The result is a concentrated, full-bodied extraction topped with golden crema — an emulsion of CO₂, oils, and melanoidins.',
  },
  {
    name: 'Doppio',
    type: 'Espresso-based',
    composition: { espresso: 100, milk: 0, foam: 0, water: 0, other: 0 },
    layers: [
      { name: 'Crema', color: C.crema, percentage: 12 },
      { name: 'Espresso', color: C.espresso, percentage: 88 },
    ],
    servingSize: '60 ml (2 oz) double shot',
    origin: 'Italy — the modern specialty-coffee standard',
    description:
      'A double shot of espresso using 14–18 g of coffee to produce roughly 60 ml of liquid. The doppio has become the de facto standard in specialty cafés worldwide because it provides a more balanced extraction than a single — the larger dose and proportionally larger basket reduce channeling risk.',
  },
  {
    name: 'Ristretto',
    type: 'Espresso-based',
    composition: { espresso: 100, milk: 0, foam: 0, water: 0, other: 0 },
    layers: [
      { name: 'Crema', color: C.crema, percentage: 20 },
      { name: 'Espresso', color: C.espresso, percentage: 80 },
    ],
    servingSize: '15–20 ml (0.5–0.7 oz)',
    origin: 'Italy — a short pull ("restricted")',
    description:
      'A "restricted" shot pulled with the same dose as espresso but roughly half the water — typically 15–20 ml in 15–20 seconds. The shorter extraction emphasizes the sweeter, more aromatic early-dissolving compounds while leaving behind much of the bitterness that extracts later. The result is sweeter, more intense, and syrupy.',
  },
  {
    name: 'Lungo',
    type: 'Espresso-based',
    composition: { espresso: 100, milk: 0, foam: 0, water: 0, other: 0 },
    layers: [
      { name: 'Crema', color: C.crema, percentage: 8 },
      { name: 'Espresso', color: C.espresso, percentage: 92 },
    ],
    servingSize: '60–90 ml (2–3 oz)',
    origin: 'Italy — a long pull',
    description:
      'The opposite of a ristretto — a "long" extraction using the same dose but approximately double the water (60–90 ml in 45–60 seconds). More water passes through the puck, extracting additional bitter and astringent compounds. The resulting cup is lighter in body but more bitter than a standard espresso. Not the same as an Americano, which dilutes after extraction.',
  },
  {
    name: 'Americano',
    type: 'Espresso-based',
    composition: { espresso: 33, milk: 0, foam: 0, water: 67, other: 0 },
    layers: [
      { name: 'Crema', color: C.crema, percentage: 3 },
      { name: 'Hot Water', color: C.water, percentage: 64 },
      { name: 'Espresso', color: C.espresso, percentage: 33 },
    ],
    servingSize: '180–240 ml (6–8 oz)',
    origin: 'Italy / United States — WWII era, American GIs diluting espresso',
    description:
      'A double shot of espresso diluted with hot water to approximate the strength of drip coffee while retaining espresso character. Legend attributes its origin to American soldiers in Italy during WWII who found straight espresso too strong. Traditionally, espresso is pulled first and water is added on top; the reverse order ("Long Black," an Australian variation) preserves the crema.',
  },
  {
    name: 'Latte',
    type: 'Espresso-based',
    composition: { espresso: 17, milk: 66, foam: 17, water: 0, other: 0 },
    layers: [
      { name: 'Microfoam', color: C.foam, percentage: 17 },
      { name: 'Steamed Milk', color: C.milk, percentage: 66 },
      { name: 'Espresso', color: C.espresso, percentage: 17 },
    ],
    servingSize: '240–360 ml (8–12 oz)',
    origin: 'Italy / United States — "caffè latte" means "coffee with milk"',
    description:
      'Espresso combined with a generous amount of steamed milk and a thin layer of microfoam. The high milk-to-espresso ratio (roughly 1:4 to 1:5) produces a mild, creamy, approachable drink that serves as the canvas for latte art. In Italy, a "caffè latte" is simply coffee with hot milk — the espresso-bar version is largely an American innovation popularized in the 1980s.',
  },
  {
    name: 'Cappuccino',
    type: 'Espresso-based',
    composition: { espresso: 33, milk: 34, foam: 33, water: 0, other: 0 },
    layers: [
      { name: 'Foam', color: C.foam, percentage: 33 },
      { name: 'Steamed Milk', color: C.milk, percentage: 34 },
      { name: 'Espresso', color: C.espresso, percentage: 33 },
    ],
    servingSize: '150–180 ml (5–6 oz)',
    origin: 'Italy — named for the Capuchin friars\' brown robes',
    description:
      'The classic Italian espresso drink: equal thirds espresso, steamed milk, and dense foam. A properly made cappuccino is smaller and stronger than a latte, with a thick, velvety foam cap. In Italy it is exclusively a morning drink — ordering one after 11 AM will earn a raised eyebrow. The name comes from the Capuchin monks, whose brown-hooded robes matched the drink\'s color.',
  },
  {
    name: 'Flat White',
    type: 'Espresso-based',
    composition: { espresso: 25, milk: 70, foam: 5, water: 0, other: 0 },
    layers: [
      { name: 'Thin Microfoam', color: C.foam, percentage: 5 },
      { name: 'Steamed Milk', color: C.milk, percentage: 70 },
      { name: 'Espresso', color: C.espresso, percentage: 25 },
    ],
    servingSize: '150–180 ml (5–6 oz)',
    origin: 'Australia / New Zealand — origin disputed between both nations, 1980s',
    description:
      'A velvety, espresso-forward milk drink served in a smaller cup than a latte, with barely any foam — just a thin, glossy layer of microfoam. The higher espresso-to-milk ratio and minimal foam let the coffee flavor punch through the milk. Usually made with a double ristretto. Australia and New Zealand both claim its invention, and the debate remains spirited.',
  },
  {
    name: 'Macchiato',
    type: 'Espresso-based',
    composition: { espresso: 80, milk: 5, foam: 15, water: 0, other: 0 },
    layers: [
      { name: 'Foam Dollop', color: C.foam, percentage: 15 },
      { name: 'Milk Stain', color: C.milk, percentage: 5 },
      { name: 'Espresso', color: C.espresso, percentage: 80 },
    ],
    servingSize: '45–60 ml (1.5–2 oz)',
    origin: 'Italy — "macchiato" means "stained" or "marked"',
    description:
      'Espresso "stained" with just a small dollop of foamed milk — enough to cut the intensity slightly and add a touch of sweetness. The traditional caffè macchiato is essentially an espresso with a 1–2 tablespoon milk mark on top. Not to be confused with the much larger, sweeter "caramel macchiato" popularized by American chain cafés, which is closer to a flavored latte.',
  },
  {
    name: 'Cortado',
    type: 'Espresso-based',
    composition: { espresso: 50, milk: 45, foam: 5, water: 0, other: 0 },
    layers: [
      { name: 'Thin Foam', color: C.foam, percentage: 5 },
      { name: 'Warm Milk', color: C.milk, percentage: 45 },
      { name: 'Espresso', color: C.espresso, percentage: 50 },
    ],
    servingSize: '120 ml (4 oz)',
    origin: 'Spain — "cortar" means "to cut"',
    description:
      'A Spanish classic: a double espresso "cut" with an equal measure of warm, lightly textured milk. The 1:1 ratio balances the espresso\'s intensity without drowning it — no thick foam, no latte art, just clean harmony. Popular throughout Spain, Portugal, and Latin America under various names (cortadito in Cuba, pingado in Portugal). The specialty-coffee world has adopted it as the thinking person\'s milk drink.',
  },
  {
    name: 'Mocha',
    type: 'Espresso-based',
    composition: { espresso: 20, milk: 50, foam: 10, water: 0, other: 20 },
    layers: [
      { name: 'Whipped Cream', color: C.whippedCream, percentage: 10 },
      { name: 'Foam', color: C.foam, percentage: 10 },
      { name: 'Steamed Milk', color: C.milk, percentage: 40 },
      { name: 'Espresso + Chocolate', color: C.chocolate, percentage: 40 },
    ],
    servingSize: '240–360 ml (8–12 oz)',
    origin: 'United States — inspired by the Yemeni port city of Mocha',
    description:
      'Espresso combined with chocolate syrup (or cocoa powder) and steamed milk, typically topped with whipped cream. Named after the Yemeni port city of Al-Mokha, which in the 15th–18th centuries was the world\'s coffee-trading capital — and whose beans were noted for their natural chocolatey character. The modern mocha is essentially a chocolate latte, bridging coffee and dessert.',
  },
  {
    name: 'Affogato',
    type: 'Espresso-based',
    composition: { espresso: 40, milk: 0, foam: 0, water: 0, other: 60 },
    layers: [
      { name: 'Espresso', color: C.espresso, percentage: 40 },
      { name: 'Gelato / Ice Cream', color: C.whippedCream, percentage: 60 },
    ],
    servingSize: '90–120 ml (3–4 oz)',
    origin: 'Italy — "affogato" means "drowned"',
    description:
      'A scoop of vanilla gelato or ice cream "drowned" in a freshly pulled shot of hot espresso. Served immediately so the eater experiences the contrast of hot and cold, bitter and sweet, liquid and solid as the ice cream melts into the coffee. In Italy, it\'s classified as a dessert rather than a beverage. Simple, dramatic, and impossible to mess up.',
  },

  // ── Traditional ─────────────────────────────────────────────────────
  {
    name: 'Turkish Coffee',
    type: 'Traditional',
    composition: { espresso: 0, milk: 0, foam: 0, water: 90, other: 10 },
    layers: [
      { name: 'Foam (Köpük)', color: C.crema, percentage: 10 },
      { name: 'Unfiltered Coffee', color: C.espresso, percentage: 40 },
      { name: 'Water + Grounds', color: '#5C4033', percentage: 50 },
    ],
    servingSize: '60–90 ml (2–3 oz) in a demitasse',
    origin: 'Ottoman Empire — 15th century, UNESCO Intangible Cultural Heritage since 2013',
    description:
      'The oldest continuously practiced brewing method. Extra-finely ground coffee (almost powder) is simmered with water and sugar in a cezve (ibrik) — a small long-handled pot. The coffee is poured unfiltered, grounds and all, and served in a small cup. The grounds settle to the bottom and are traditionally used for fortune-telling (tasseography). The key is to never boil — the foam (köpük) forms just below boiling and is a sign of proper preparation.',
  },
  {
    name: 'French Press Coffee',
    type: 'Traditional',
    composition: { espresso: 0, milk: 0, foam: 0, water: 94, other: 6 },
    layers: [
      { name: 'Coffee Oils', color: '#8B6914', percentage: 6 },
      { name: 'Brewed Coffee', color: '#4A2C0A', percentage: 94 },
    ],
    servingSize: '240–360 ml (8–12 oz)',
    origin: 'France / Italy — patented by Italian designer Attilio Calimani in 1929',
    description:
      'Full-immersion brewing at its simplest. Coarsely ground coffee steeps in hot water for 4 minutes, then a metal mesh plunger separates the grounds from the liquid. Because there\'s no paper filter, the natural oils and fine particles (fines) pass into the cup, creating a rich, full-bodied brew with more texture than pour over. The trade-off is a heavier, slightly gritty mouthfeel and sediment at the bottom.',
  },
  {
    name: 'Pour Over',
    type: 'Traditional',
    composition: { espresso: 0, milk: 0, foam: 0, water: 94, other: 6 },
    layers: [
      { name: 'Aromatic Top', color: '#D4A574', percentage: 6 },
      { name: 'Clean Brewed Coffee', color: '#5C3317', percentage: 94 },
    ],
    servingSize: '240–360 ml (8–12 oz)',
    origin: 'Germany — Melitta Bentz invented the paper filter in 1908; Japan refined hand-pour technique',
    description:
      'Hot water is poured in a controlled, circular pattern over a bed of medium-fine grounds held in a paper or cloth filter. The paper filter absorbs oils and traps fines, producing a clean, bright, nuanced cup that highlights a coffee\'s origin characteristics. Popular devices include the Hario V60, Kalita Wave, and Chemex. The pour technique, flow rate, and water temperature are all variables the brewer controls.',
  },
  {
    name: 'Cold Brew',
    type: 'Traditional',
    composition: { espresso: 0, milk: 0, foam: 0, water: 85, other: 15 },
    layers: [
      { name: 'Ice', color: C.iceCubes, percentage: 30 },
      { name: 'Cold Brew Concentrate', color: C.coffeeConcentrate, percentage: 70 },
    ],
    servingSize: '240–360 ml (8–12 oz) after dilution',
    origin: 'Japan (Kyoto-style drip) and the Netherlands (Dutch coffee) — 17th century origins',
    description:
      'Coarsely ground coffee steeped in cold or room-temperature water for 12–24 hours, then filtered. The long, cold extraction produces a smooth, low-acid, naturally sweet concentrate (often diluted 1:1 with water or milk). Because heat is the primary driver of acid extraction, cold brew has up to 67% less perceived acidity than hot-brewed coffee — making it popular with those who find drip coffee harsh on the stomach.',
  },

  // ── Specialty ───────────────────────────────────────────────────────
  {
    name: 'Nitro Cold Brew',
    type: 'Specialty',
    composition: { espresso: 0, milk: 0, foam: 0, water: 90, other: 10 },
    layers: [
      { name: 'Nitrogen Cascade', color: C.nitroBubbles, percentage: 15 },
      { name: 'Cold Brew', color: C.coffeeConcentrate, percentage: 85 },
    ],
    servingSize: '300–480 ml (10–16 oz) on tap',
    origin: 'United States — first served at Cuvée Coffee, Austin TX, and Stumptown, Portland OR, around 2013',
    description:
      'Cold brew coffee infused with nitrogen gas and dispensed from a tap, similar to a nitro stout beer (like Guinness). The tiny nitrogen bubbles create a thick, cascading, creamy head and a velvety mouthfeel without any added dairy. It\'s naturally sweeter-tasting than regular cold brew because nitrogen enhances the perception of sweetness. Served without ice to preserve the cascade effect.',
  },
  {
    name: 'Irish Coffee',
    type: 'Specialty',
    composition: { espresso: 0, milk: 0, foam: 0, water: 50, other: 50 },
    layers: [
      { name: 'Cream Float', color: C.whippedCream, percentage: 20 },
      { name: 'Hot Coffee + Whiskey', color: '#5C3317', percentage: 65 },
      { name: 'Brown Sugar', color: '#D4A574', percentage: 15 },
    ],
    servingSize: '180–240 ml (6–8 oz) in a stemmed glass',
    origin: 'Ireland — created by Joe Sheridan at Foynes Airbase, County Limerick, 1943',
    description:
      'Hot brewed coffee spiked with Irish whiskey and brown sugar, topped with a thick layer of lightly whipped heavy cream floated on the surface. The drink is sipped through the cold cream — the contrast of hot, sweet, boozy coffee and cool cream is the entire point. Invented by chef Joe Sheridan to warm up American passengers arriving by seaplane at Foynes on a cold Irish night.',
  },
  {
    name: 'Vietnamese Coffee',
    type: 'Specialty',
    composition: { espresso: 0, milk: 0, foam: 0, water: 55, other: 45 },
    layers: [
      { name: 'Brewed Coffee', color: C.espresso, percentage: 55 },
      { name: 'Condensed Milk', color: C.condensedMilk, percentage: 45 },
    ],
    servingSize: '150–200 ml (5–7 oz)',
    origin: 'Vietnam — French colonial influence, 19th century adaptation using condensed milk',
    description:
      'Dark-roasted Vietnamese coffee (typically Robusta, often with a touch of chicory or butter-roasting) brewed slowly through a single-cup metal phin filter directly over a glass containing 2–3 tablespoons of sweetened condensed milk. The thick, sweet milk softens the Robusta\'s intensity. Served hot (cà phê sữa nóng) or over ice (cà phê sữa đá). Condensed milk was adopted because fresh dairy was scarce in colonial Vietnam — and the combination turned out to be extraordinary.',
  },
  {
    name: 'Café au Lait',
    type: 'Specialty',
    composition: { espresso: 0, milk: 50, foam: 0, water: 50, other: 0 },
    layers: [
      { name: 'Hot Milk', color: C.milk, percentage: 50 },
      { name: 'Brewed Coffee', color: '#6F4E37', percentage: 50 },
    ],
    servingSize: '240–360 ml (8–12 oz), traditionally in a bowl',
    origin: 'France — a staple of French breakfast culture',
    description:
      'Equal parts strong brewed coffee (not espresso) and hot, scalded milk, traditionally poured simultaneously from two pitchers into a wide bowl. The French version uses drip or press coffee, not espresso — which distinguishes it from a latte. In New Orleans, it\'s famously made with chicory coffee and served with beignets at Café Du Monde. The simplicity is the point: good coffee, good milk, no pretense.',
  },
];
