// SCA Coffee Taster's Flavor Wheel — hierarchical data for D3 sunburst
// Structure based on the World Coffee Research / SCA Sensory Lexicon

export interface FlavorNode {
  name: string;
  children?: FlavorNode[];
  color?: string;
  description?: string;
}

export const flavorWheel: FlavorNode = {
  name: 'Coffee Flavors',
  color: '#8B4513',
  description:
    'The SCA Coffee Taster\'s Flavor Wheel is the largest collaborative piece of research on coffee flavor ever completed. It was created in 2016 by SCA and World Coffee Research.',
  children: [
    {
      name: 'Fruity',
      color: '#E74C3C',
      description:
        'Fruit-forward notes often found in high-altitude, lightly roasted single-origin coffees — especially naturals and honeys from Ethiopia and Kenya.',
      children: [
        { name: 'Berry', color: '#C0392B', description: 'Blueberry, raspberry, strawberry, blackberry — common in Ethiopian Yirgacheffe naturals.' },
        { name: 'Dried Fruit', color: '#D35400', description: 'Raisin, prune, fig, date — typical in aged or natural-processed coffees.' },
        { name: 'Citrus Fruit', color: '#E67E22', description: 'Lemon, orange, grapefruit, lime — bright citric acidity found in washed Kenyan and Colombian coffees.' },
        { name: 'Other Fruit', color: '#E74C3C', description: 'Apple, pear, peach, grape, cherry, pomegranate — broader fruit spectrum in diverse origins.' },
        { name: 'Tropical Fruit', color: '#F39C12', description: 'Mango, pineapple, passion fruit, papaya — often in coffees from Panama, Costa Rica, and Honduras.' },
      ],
    },
    {
      name: 'Sour / Fermented',
      color: '#F1C40F',
      description:
        'Tangy, sharp, or vinegary notes. Mild sourness (acidity) is desirable; intense fermentation is usually a processing defect.',
      children: [
        { name: 'Sour', color: '#F4D03F', description: 'Tart, tangy acidity — positive in moderation, especially in light roasts.' },
        { name: 'Alcohol / Fermented', color: '#D4AC0D', description: 'Wine-like, whiskey, overripe — can indicate natural process or fermentation defect.' },
        { name: 'Butyric Acid', color: '#B7950B', description: 'Rancid, cheesy — almost always a defect from improper fermentation or storage.' },
        { name: 'Acetic Acid', color: '#F1C40F', description: 'Vinegar-like sharpness — mild levels add brightness, excess is a defect.' },
      ],
    },
    {
      name: 'Green / Vegetative',
      color: '#27AE60',
      description:
        'Herbaceous, grassy notes often associated with under-roasted beans, early-harvest coffees, or certain processing methods.',
      children: [
        { name: 'Olive Oil', color: '#229954', description: 'Oily, buttery green-olive character — sometimes found in fresh-crop Brazilian naturals.' },
        { name: 'Raw', color: '#1E8449', description: 'Uncooked, starchy, green-bean — often from under-developed roasts.' },
        { name: 'Green / Vegetative', color: '#2ECC71', description: 'Fresh-cut grass, herb garden, pea pod — common in very light roasts or quakers.' },
        { name: 'Beany', color: '#27AE60', description: 'Like raw green beans or lentils — a roast defect indicating insufficient development.' },
        { name: 'Hay-like', color: '#82E0AA', description: 'Dried grass, straw, herbal tea — can come from older crop or light roasting.' },
      ],
    },
    {
      name: 'Other',
      color: '#95A5A6',
      description:
        'Unusual or hard-to-categorize flavors — includes chemical off-notes and non-standard aromatics.',
      children: [
        { name: 'Papery / Musty', color: '#7F8C8D', description: 'Cardboard, stale, dusty — indicates past-crop beans or poor storage.' },
        { name: 'Chemical', color: '#BDC3C7', description: 'Rubber, petroleum, medicinal, skunky — serious defects from contamination or mold.' },
        { name: 'Pipe Tobacco', color: '#A6ACAF', description: 'Earthy, smoky, cured tobacco — can be positive in Sumatran coffees.' },
        { name: 'Leather', color: '#808B96', description: 'Tanned, hide-like — often found in dry-processed or aged Indonesian coffees.' },
      ],
    },
    {
      name: 'Roasted',
      color: '#6D4C41',
      description:
        'Flavors created during the Maillard reaction and caramelization in roasting — more prominent in medium-to-dark roasts.',
      children: [
        { name: 'Cereal', color: '#8D6E63', description: 'Toast, malt, grain — light Maillard products from early roast development.' },
        { name: 'Burnt', color: '#4E342E', description: 'Charcoal, ash, smoky — from prolonged or excessively dark roasting.' },
        { name: 'Tobacco', color: '#795548', description: 'Cured, dried leaf — nuanced smokiness considered positive in some Sumatran and aged coffees.' },
        { name: 'Brown Roast', color: '#A1887F', description: 'Toasted bread, roasted barley — the core "coffee" flavor most people recognize.' },
      ],
    },
    {
      name: 'Spices',
      color: '#E65100',
      description:
        'Warm spice aromatics created by volatile compounds in certain origins and roast profiles.',
      children: [
        { name: 'Pungent', color: '#BF360C', description: 'Black pepper, clove, allspice — sharp warming spice notes.' },
        { name: 'Pepper', color: '#D84315', description: 'White or black pepper — often in Sumatran and Indian coffees.' },
        { name: 'Brown Spice', color: '#FF8F00', description: 'Cinnamon, nutmeg, cardamom, anise — warm baking-spice notes common in Guatemalan and Yemeni coffees.' },
        { name: 'Ginger', color: '#EF6C00', description: 'Fresh or dried ginger — zingy warmth sometimes found in East African coffees.' },
      ],
    },
    {
      name: 'Nutty / Cocoa',
      color: '#5D4037',
      description:
        'Nut and chocolate flavors from caramelization and lipid development — common across a wide range of origins and roast levels.',
      children: [
        { name: 'Nutty', color: '#6D4C41', description: 'Almond, hazelnut, walnut, peanut — prevalent in Brazilian, Colombian, and Central American coffees.' },
        { name: 'Cocoa', color: '#4E342E', description: 'Cocoa powder, dark chocolate, bittersweet chocolate — the most universally recognized coffee flavor.' },
        { name: 'Coconut', color: '#8D6E63', description: 'Coconut flesh or cream — rare but found in some natural-processed coffees.' },
      ],
    },
    {
      name: 'Sweet',
      color: '#FF8A65',
      description:
        'Sweetness in coffee comes from caramelized sugars and Maillard products — a key quality indicator. The best specialty coffees are remarkably sweet.',
      children: [
        { name: 'Brown Sugar', color: '#D7CCC8', description: 'Molasses, muscovado, raw sugar — warm caramel sweetness from medium roasting.' },
        { name: 'Vanilla', color: '#FFCCBC', description: 'Vanillin compound — subtle vanilla often found in bourbon-variety coffees from Central America.' },
        { name: 'Honey', color: '#FFB74D', description: 'Floral honey sweetness — common in honey-processed Costa Rican and El Salvadoran coffees.' },
        { name: 'Caramel', color: '#FFA726', description: 'Toffee, butterscotch, caramelized sugar — the sweet spot of medium roast development.' },
        { name: 'Maple Syrup', color: '#FF9800', description: 'Rich, tree-syrup sweetness — occasionally found in medium-roasted Colombian and Rwandan coffees.' },
      ],
    },
    {
      name: 'Floral',
      color: '#AB47BC',
      description:
        'Delicate flower-like aromatics — a hallmark of high-quality, lightly roasted single-origin coffees, particularly washed Ethiopians.',
      children: [
        { name: 'Black Tea', color: '#7B1FA2', description: 'Tea-like, bergamot, Earl Grey — sometimes in washed Ethiopians and high-altitude Kenyans.' },
        { name: 'Floral', color: '#CE93D8', description: 'Jasmine, lavender, rose, hibiscus, honeysuckle — the signature of Yirgacheffe and Geisha varieties.' },
        { name: 'Chamomile', color: '#E1BEE7', description: 'Gentle herbal floral — subtle and calming, occasionally in light-roasted washed coffees.' },
      ],
    },
  ],
};
