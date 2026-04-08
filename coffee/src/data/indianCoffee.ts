// Indian coffee brands and estates — accurate profiles for barista-level education
// India is the 6th-largest coffee producer globally; Karnataka produces ~70% of output.
// Indian coffees are predominantly shade-grown, often intercropped with cardamom and pepper.

export interface IndianCoffeeBrand {
  name: string;
  type: 'estate' | 'brand' | 'blend';
  category: 'beans' | 'espresso' | 'both';
  region: string;
  altitude?: string;
  established?: string;
  description: string;
  notableProducts: string[];
  flavorNotes: string[];
  processingMethod?: string;
  // Taste scores for spider/radar diagram (1-10 scale)
  acidity: number;
  body: number;
  sweetness: number;
  bitterness: number;
  aftertaste: number;
  // Badge/logo color for UI cards
  color: string;
}

export const indianCoffeeBrands: IndianCoffeeBrand[] = [
  // ─── ESTATES (single-origin, specialty) ────────────────────────────

  {
    name: 'Tata Coffee — Coorg Estate',
    type: 'estate',
    category: 'both',
    region: 'Coorg (Kodagu), Karnataka',
    altitude: '900–1,100 m',
    established: '1922',
    description:
      'One of India\'s largest integrated coffee companies, Tata Coffee operates 19 estates across Coorg and Chikmagalur totalling over 8,000 hectares. Their Coorg plantations produce both Arabica (Selection 795, Cauvery) and Robusta under dense shade canopy alongside cardamom and pepper. The estate\'s wet-processed Arabica is known for a clean, medium-bodied cup with mild spice undertones — a benchmark for Indian plantation-grade coffee.',
    notableProducts: [
      'Tata Coffee Grand',
      'Sonnets by Tata Coffee (specialty line)',
      'Coorg Pure (single-origin Arabica)',
    ],
    flavorNotes: ['Milk chocolate', 'Black pepper', 'Caramel', 'Mild citrus', 'Toasted almond'],
    processingMethod: 'Washed (wet-process)',
    acidity: 4,
    body: 7,
    sweetness: 6,
    bitterness: 5,
    aftertaste: 6,
    color: '#1a5632',
  },

  {
    name: 'Bababudangiri Estate',
    type: 'estate',
    category: 'beans',
    region: 'Chikmagalur, Karnataka',
    altitude: '1,000–1,500 m',
    established: '~1670 (origin of Indian coffee)',
    description:
      'The legendary birthplace of Indian coffee. Around 1670, the Sufi saint Baba Budan smuggled seven coffee beans from the port of Mocha in Yemen, planting them on the misty hills now bearing his name. These slopes in the Chikmagalur district became India\'s first coffee-growing region. The high-altitude Arabica grown here — primarily Selection 795 and Kent varieties — benefits from cool nights and monsoon moisture, producing a distinctively smooth, low-acid cup with pronounced sweetness.',
    notableProducts: [
      'Bababudangiri Single-Origin Arabica',
      'Heritage Peaberry (hand-sorted)',
    ],
    flavorNotes: ['Dark chocolate', 'Cardamom', 'Brown sugar', 'Stone fruit', 'Cedar'],
    processingMethod: 'Washed and natural (sun-dried)',
    acidity: 3,
    body: 8,
    sweetness: 7,
    bitterness: 4,
    aftertaste: 7,
    color: '#5c3d2e',
  },

  {
    name: 'Sethuraman Estate (Blue Tokai)',
    type: 'estate',
    category: 'beans',
    region: 'Chikmagalur, Karnataka',
    altitude: '1,100–1,400 m',
    description:
      'One of Blue Tokai\'s flagship sourcing estates in the Baba Budan Giri range, Sethuraman Estate grows SLN 795 and S274 Arabica varieties under a mixed shade canopy of silver oak and jackfruit trees. The estate is known for meticulous cherry selection and careful wet processing. The resulting cup is clean and nuanced — bright for an Indian coffee, with a citric acidity uncommon in the region. This estate helped define Blue Tokai\'s reputation as India\'s leading specialty roaster.',
    notableProducts: [
      'Blue Tokai Sethuraman Estate (single-origin)',
      'Sethuraman Estate Peaberry',
    ],
    flavorNotes: ['Citrus zest', 'Hazelnut', 'Honey', 'Mild berry', 'Cocoa nib'],
    processingMethod: 'Washed (wet-process)',
    acidity: 6,
    body: 6,
    sweetness: 7,
    bitterness: 3,
    aftertaste: 7,
    color: '#2563eb',
  },

  {
    name: 'Kerehaklu Estate',
    type: 'estate',
    category: 'beans',
    region: 'Chikmagalur, Karnataka',
    altitude: '1,200–1,400 m',
    description:
      'A premium micro-lot estate in the Mudigere taluk of Chikmagalur, Kerehaklu is among the higher-altitude plantations in the region. The name means "black lake" in Kannada, after the dark water body on the property. Growing primarily SLN 795 Arabica, the estate is intercropped with pepper and cardamom vines that lend a subtle spice character to the coffee through shared soil biology. Known in specialty circles for its consistent, clean lots with remarkable sweetness.',
    notableProducts: [
      'Kerehaklu Estate Reserve Arabica',
      'Kerehaklu Micro-Lot Natural',
    ],
    flavorNotes: ['Toffee', 'Black pepper', 'Dried fig', 'Roasted almond', 'Molasses'],
    processingMethod: 'Washed and honey-process',
    acidity: 4,
    body: 7,
    sweetness: 8,
    bitterness: 3,
    aftertaste: 8,
    color: '#7c3aed',
  },

  {
    name: 'Ratnagiri Estate',
    type: 'estate',
    category: 'beans',
    region: 'Coorg (Kodagu), Karnataka',
    altitude: '850–1,050 m',
    description:
      'A heritage shade-grown estate in the Coorg (Kodagu) district of Karnataka, Ratnagiri grows both Arabica and Robusta under a dense canopy of rosewood, silver oak, and wild fig trees. The estate follows traditional Coorg cultivation methods — minimal chemical inputs, hand-picked cherries, and careful depulping. The Arabica lots produce a balanced, medium-bodied cup, while the Robusta adds depth and crema potential for espresso blends. The interplanting with pepper and cardamom is evident in the cup\'s warm spice finish.',
    notableProducts: [
      'Ratnagiri Estate Arabica',
      'Ratnagiri Peaberry Select',
      'Ratnagiri Robusta (espresso-grade)',
    ],
    flavorNotes: ['Nutmeg', 'Dark chocolate', 'Raisin', 'Tobacco leaf', 'Warm spice'],
    processingMethod: 'Washed (Arabica) / Natural (Robusta)',
    acidity: 3,
    body: 8,
    sweetness: 5,
    bitterness: 6,
    aftertaste: 6,
    color: '#b45309',
  },

  // ─── BRANDS (roasters / blends) ────────────────────────────────────

  {
    name: 'Blue Tokai Coffee Roasters',
    type: 'brand',
    category: 'both',
    region: 'New Delhi (HQ); sources from Karnataka, Kerala, Tamil Nadu',
    established: '2013',
    description:
      'India\'s pioneering specialty coffee roaster, founded by Matt Chitharanjan and Namrata Asthana. Blue Tokai sources directly from estates across southern India and roasts to order — a radical concept in a market long dominated by stale pre-ground blends. They were among the first Indian roasters to publish estate names, altitude, and processing details on their packaging, bringing traceability to Indian coffee consumers. Their cafés now span major Indian cities, and they\'ve become the gateway brand for India\'s third-wave coffee movement.',
    notableProducts: [
      'Attikan Estate (signature single-origin)',
      'Vienna Roast (espresso blend)',
      'Ms. Vatsala\'s French Roast',
      'Silver Oak Espresso Blend',
    ],
    flavorNotes: ['Citrus', 'Chocolate', 'Caramel', 'Tropical fruit', 'Nutty'],
    processingMethod: 'Multiple (varies by estate — washed, natural, honey)',
    acidity: 5,
    body: 6,
    sweetness: 7,
    bitterness: 4,
    aftertaste: 7,
    color: '#1e40af',
  },

  {
    name: 'Third Wave Coffee',
    type: 'brand',
    category: 'both',
    region: 'Bengaluru, Karnataka (HQ)',
    established: '2016',
    description:
      'Founded by Sushant Goel and Anirudh Sharma, Third Wave Coffee has become India\'s fastest-growing specialty café chain with 100+ outlets. Their approach balances specialty-grade quality with accessibility — offering pour-overs alongside familiar lattes and flavored drinks. They source primarily from Chikmagalur and Coorg estates, roasting in-house at their Bengaluru facility. Their espresso blend is calibrated for milk-based drinks, which dominate Indian café orders, with a slightly darker roast profile than typical third-wave standards.',
    notableProducts: [
      'Baarbara Estate Pour-Over',
      'TWC House Blend (espresso)',
      'Single-Origin Drip Bags',
      'Cold Brew Concentrate',
    ],
    flavorNotes: ['Milk chocolate', 'Hazelnut', 'Caramel', 'Mild berry', 'Biscuit'],
    processingMethod: 'Washed (primary)',
    acidity: 4,
    body: 7,
    sweetness: 6,
    bitterness: 5,
    aftertaste: 5,
    color: '#059669',
  },

  {
    name: 'Cothas Coffee',
    type: 'brand',
    category: 'both',
    region: 'Chennai, Tamil Nadu',
    established: '1937',
    description:
      'A heritage South Indian filter coffee brand, Cothas has been blending Arabica and chicory for nearly nine decades. Founded by S. Jagadish Chandran in Madras (now Chennai), the brand is synonymous with traditional "degree coffee" — the thick, sweet decoction brewed in a stainless steel filter and mixed with boiled milk. Their signature blend uses a coffee-to-chicory ratio where the chicory adds body, bitterness, and a characteristic caramelized sweetness that defines South Indian filter coffee culture.',
    notableProducts: [
      'Cothas Speciality Blend (with chicory)',
      'Cothas Premium Filter Coffee',
      'Cothas Pure Coffee (no chicory)',
    ],
    flavorNotes: ['Chicory', 'Roasted grain', 'Dark caramel', 'Earthy', 'Bittersweet chocolate'],
    processingMethod: 'Dark roast blend with chicory root',
    acidity: 2,
    body: 9,
    sweetness: 5,
    bitterness: 8,
    aftertaste: 6,
    color: '#991b1b',
  },

  {
    name: "Narasu's Coffee",
    type: 'brand',
    category: 'beans',
    region: 'Salem, Tamil Nadu',
    established: '1926',
    description:
      'One of South India\'s oldest and most beloved filter coffee brands, Narasu\'s was founded in Salem, Tamil Nadu, and has been a household staple across the southern states for nearly a century. The brand is known for its consistent, robust filter coffee blends that combine plantation Arabica and Robusta with chicory. Narasu\'s "Udhayam" blend is arguably the single most recognized filter coffee brand in Tamil Nadu. Their roast profile is distinctly dark — designed for the high-extraction decoction method using traditional brass or steel drip filters.',
    notableProducts: [
      "Narasu's Udhayam Filter Coffee",
      "Narasu's Delite (premium blend)",
      "Narasu's Instant Coffee",
    ],
    flavorNotes: ['Roasted malt', 'Chicory', 'Bitter chocolate', 'Molasses', 'Smoky'],
    processingMethod: 'Dark roast blend with chicory',
    acidity: 2,
    body: 9,
    sweetness: 4,
    bitterness: 8,
    aftertaste: 5,
    color: '#dc2626',
  },

  {
    name: 'Levista Coffee',
    type: 'brand',
    category: 'both',
    region: 'Bengaluru, Karnataka',
    established: '2017',
    description:
      'A modern Indian coffee brand that bridges the gap between mass-market instant coffee and specialty roasting. Levista sources from Coorg and Chikmagalur estates and offers a tiered product line from instant granules to premium whole-bean options. Their marketing targets younger, urban Indian consumers who want better coffee at home without specialty-shop prices. The instant range uses spray-dried and freeze-dried Arabica-Robusta blends, while their premium line features single-origin options with lighter roast profiles.',
    notableProducts: [
      'Levista Strong (instant)',
      'Levista Premium (freeze-dried)',
      'Levista Filter Coffee',
    ],
    flavorNotes: ['Cocoa', 'Toasted grain', 'Caramel', 'Mild spice', 'Clean finish'],
    processingMethod: 'Spray-dried and freeze-dried blends',
    acidity: 3,
    body: 6,
    sweetness: 5,
    bitterness: 6,
    aftertaste: 4,
    color: '#ca8a04',
  },

  {
    name: 'Mysore Nuggets Extra Bold (MNEB)',
    type: 'brand',
    category: 'beans',
    region: 'Mysore region, Karnataka',
    description:
      'Not a single estate but India\'s premium export-grade classification — Mysore Nuggets Extra Bold refers to the largest screen-size (AA+) washed Arabica beans from the traditional Mysore coffee-growing region of Karnataka. These are graded by the Coffee Board of India and represent the top tier of Indian washed Arabica. The "nuggets" name comes from the large, bold bean size (screen 18+). MNEB is prized by European specialty importers for its syrupy body, muted acidity, and clean chocolate-forward profile that performs exceptionally in espresso blends.',
    notableProducts: [
      'MNEB Grade AA (export)',
      'MNEB Peaberry',
    ],
    flavorNotes: ['Syrupy chocolate', 'Spice', 'Cedar', 'Dried fruit', 'Low-toned sweetness'],
    processingMethod: 'Washed (wet-process), plantation-grade sorting',
    acidity: 3,
    body: 8,
    sweetness: 6,
    bitterness: 5,
    aftertaste: 7,
    color: '#4338ca',
  },

  {
    name: 'Indian Coffee House',
    type: 'brand',
    category: 'both',
    region: 'Pan-India (HQ: Bengaluru, Karnataka)',
    established: '1936 (original); 1957 (cooperative)',
    description:
      'More a cultural institution than a coffee brand, the Indian Coffee House chain is a network of worker-owned cooperatives born from a 1957 struggle led by communist leader A.K. Gopalan after the Coffee Board closed its original outlets. The waiters in their signature white uniforms and fan-shaped turbans serve simple South Indian filter coffee alongside dosas and cutlets. The coffee itself is a straightforward dark-roast Arabica-Robusta blend — nothing fancy, but steeped in history. Locations in Kolkata\'s College Street, Delhi\'s Connaught Place, and Thiruvananthapuram\'s Maveli Café are legendary meeting spots for intellectuals and students.',
    notableProducts: [
      'Filter Coffee (served in steel tumbler-davara)',
      'South Indian Filter Kaapi',
    ],
    flavorNotes: ['Roasted grain', 'Smoky', 'Chicory undertone', 'Dark caramel', 'Earthy'],
    processingMethod: 'Dark roast commercial blend',
    acidity: 2,
    body: 7,
    sweetness: 3,
    bitterness: 7,
    aftertaste: 4,
    color: '#78350f',
  },

  // ─── ESPRESSO-FOCUSED / SPECIALTY ──────────────────────────────────

  {
    name: 'Sleepy Owl Coffee',
    type: 'brand',
    category: 'espresso',
    region: 'New Delhi',
    established: '2016',
    description:
      'India\'s leading ready-to-drink cold brew brand, founded by Arman Sood, Ajai Thandi, and Ashwajeet Singh. Sleepy Owl pioneered the cold brew category in India with their hot brew bags and bottled cold brew concentrate. Their cold brew is steeped for 20+ hours using a coarse-ground blend of washed Arabica from Chikmagalur — a process that yields a naturally sweet, low-acid concentrate. They\'ve expanded into espresso capsules (Nespresso-compatible) and premium blends, targeting the growing home-brewing segment in Indian metros.',
    notableProducts: [
      'Sleepy Owl Cold Brew Packs',
      'Original Cold Brew Concentrate',
      'Espresso Capsules (Nespresso-compatible)',
      'Dark Roast Whole Beans',
    ],
    flavorNotes: ['Smooth chocolate', 'Vanilla', 'Low acid', 'Toffee', 'Clean finish'],
    processingMethod: 'Cold-steeped (20+ hours); washed Arabica base',
    acidity: 2,
    body: 6,
    sweetness: 7,
    bitterness: 3,
    aftertaste: 5,
    color: '#0ea5e9',
  },

  {
    name: 'Araku Coffee',
    type: 'brand',
    category: 'both',
    region: 'Araku Valley, Visakhapatnam, Andhra Pradesh',
    altitude: '900–1,100 m',
    established: '2007 (Naandi Foundation initiative)',
    description:
      'A remarkable social enterprise — Araku Coffee is grown by tribal (Adivasi) farming cooperatives in the Araku Valley of the Eastern Ghats, Andhra Pradesh. Over 10,000 small-holder farmers grow 100% organic Arabica under shade of mango and jackfruit trees, with no chemical inputs. The initiative, backed by the Naandi Foundation, won the prestigious Prix de l\'Association at the Café de Paris awards in 2018, putting Indian specialty coffee on the global map. The terroir is unique — volcanic soils, cool valley microclimate, and Eastern Ghats rainfall patterns produce a cup profile unlike anything from Karnataka.',
    notableProducts: [
      'Araku Signature Blend',
      'Araku Micro-Lot (Grand Cru)',
      'Araku Boomi (organic single-origin)',
    ],
    flavorNotes: ['Tropical fruit', 'Raw cane sugar', 'Jasmine', 'Mild cocoa', 'Lingering floral finish'],
    processingMethod: '100% organic; washed and natural sun-dried',
    acidity: 5,
    body: 6,
    sweetness: 8,
    bitterness: 3,
    aftertaste: 8,
    color: '#16a34a',
  },

  // ─── ICONIC PROCESSING STYLES ─────────────────────────────────────

  {
    name: 'Monsooned Malabar',
    type: 'blend',
    category: 'both',
    region: 'Malabar Coast, Karnataka & Kerala',
    altitude: 'Coastal warehouses (beans sourced from 600–1,000 m)',
    established: '1800s (accidental origin during colonial shipping)',
    description:
      'India\'s most famous and unusual processing method. During the British Raj, raw coffee beans shipped from the Malabar coast to Europe in wooden-hulled sailing vessels absorbed moisture from months of monsoon-season sea travel, swelling in size and losing their sharp acidity. When steamships shortened the voyage, importers missed the distinctive mellow flavor. Today, Monsooned Malabar is deliberately produced by exposing washed Robusta and Arabica beans to monsoon winds in open-sided warehouses along the Karnataka and Kerala coast from June to September. The beans swell to nearly double their original size, turning from green to a pale gold, and develop a heavy, syrupy body with virtually zero acidity — prized as an espresso base across Europe.',
    notableProducts: [
      'Monsooned Malabar AA',
      'Monsooned Malabar Robusta',
      'Monsoon Nuggets (peaberry)',
    ],
    flavorNotes: ['Tobacco', 'Musty cedar', 'Dark chocolate', 'Clove', 'Earthy sweetness'],
    processingMethod: 'Monsooned (exposure to monsoon winds, 12–16 weeks)',
    acidity: 1,
    body: 10,
    sweetness: 5,
    bitterness: 6,
    aftertaste: 8,
    color: '#92400e',
  },
];
