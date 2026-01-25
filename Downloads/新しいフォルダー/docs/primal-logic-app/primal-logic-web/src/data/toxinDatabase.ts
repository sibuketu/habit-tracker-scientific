/**
 * CarnivoreOS - Plant Toxin Database
 *
 * Database of toxins and antinutrients contained in plants.
 * Data to explain "why to avoid" plant-based foods from a Carnivore perspective.
 */

export interface PlantToxin {
  name: string; // Toxin name (Japanese)
  nameEn: string; // Toxin name (English)
  description: string; // Description
  healthEffects: string[]; // Health effects
  commonSources: string[]; // Main food sources
  bioavailabilityImpact?: string; // Impact on nutrient absorption rate
}

/**
 * Plant toxin database
 */
export const PLANT_TOXINS: PlantToxin[] = [
  {
    name: 'Oxalate',
    nameEn: 'Oxalate',
    description: 'Causes kidney stones and inhibits absorption of minerals (calcium, magnesium).',
    healthEffects: [
      'Kidney stone formation',
      'Mineral deficiency (calcium, magnesium)',
      'Worsening arthritis and inflammation',
    ],
    commonSources: ['Spinach', 'Rhubarb', 'Almonds', 'Cashews', 'Chocolate'],
    bioavailabilityImpact: 'Reduces absorption rate of calcium and magnesium',
  },
  {
    name: 'Phytic Acid',
    nameEn: 'Phytic Acid',
    description: 'Binds with minerals (iron, zinc, magnesium) and inhibits absorption.',
    healthEffects: ['Mineral deficiency (iron, zinc, magnesium)', 'Decreased bone density'],
    commonSources: ['Whole grains', 'Legumes', 'Nuts', 'Seeds'],
    bioavailabilityImpact: 'Significantly reduces absorption rate of iron, zinc, and magnesium',
  },
  {
    name: 'Lectins',
    nameEn: 'Lectins',
    description: 'Increases intestinal permeability (leaky gut) and may cause inflammation.',
    healthEffects: ['Leaky gut syndrome', 'Worsening autoimmune diseases', 'Digestive issues'],
    commonSources: [
      'Legumes (especially raw)',
      'Nuts',
      'Whole grains',
      'Nightshade vegetables (tomatoes, peppers, etc.)',
    ],
  },
  {
    name: 'Saponins',
    nameEn: 'Saponins',
    description: 'Destroys intestinal cell membranes and may cause inflammation.',
    healthEffects: ['Intestinal inflammation', 'Poor nutrient absorption'],
    commonSources: ['Legumes', 'Quinoa', 'Oats'],
  },
  {
    name: 'Goitrogens',
    nameEn: 'Goitrogens',
    description: 'Inhibits thyroid iodine uptake and may reduce thyroid function.',
    healthEffects: ['Hypothyroidism', 'Reduced metabolism'],
    commonSources: ['Cabbage', 'Broccoli', 'Cauliflower', 'Kale'],
  },
  {
    name: 'Tannins',
    nameEn: 'Tannins',
    description: 'Binds with protein and inhibits digestion. Also inhibits iron absorption.',
    healthEffects: ['Poor protein digestion', 'Iron deficiency'],
    commonSources: ['Tea', 'Coffee', 'Wine', 'Legumes'],
    bioavailabilityImpact: 'Reduces iron absorption rate',
  },
];

/**
 * Search for toxins contained in a specific food
 */
export function getToxinsByFood(foodName: string): PlantToxin[] {
  return PLANT_TOXINS.filter((toxin) =>
    toxin.commonSources.some(
      (source) =>
        source.toLowerCase().includes(foodName.toLowerCase()) ||
        foodName.toLowerCase().includes(source.toLowerCase())
    )
  );
}

/**
 * Get details of a specific toxin
 */
export function getToxinByName(name: string): PlantToxin | undefined {
  return PLANT_TOXINS.find(
    (toxin) => toxin.name === name || toxin.nameEn.toLowerCase() === name.toLowerCase()
  );
}

