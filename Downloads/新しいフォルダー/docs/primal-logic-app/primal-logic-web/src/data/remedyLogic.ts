/**
 * CarnivoreOS - Remedy Logic (Troubleshooting)
 *
 * Defines problems that may occur during carnivore practice and their solutions.
 *
 * Research Basis: Dr. Steven Gundry (The Plant Paradox) & Carnivore Diet Logic
 */

export interface PlantToxin {
  name: string;
  nameEn: string;
  category: string;
  foods: string[];
  toxins: string[];
  effects: string[];
  riskLevel: 'low' | 'medium' | 'high';
  carnivoreAlternative: string;
}

export interface RemedyItem {
  symptom: string;
  possibleCauses: string[];
  remedies: string[];
  logic: string;
}

/**
 * Plant Antinutrient (Plant Toxin) Database
 *
 * This database lists plant foods that are generally believed to be "healthy"
 * but actually contain antinutrients or toxins that can cause inflammation,
 * gut environment deterioration, and nutrient absorption inhibition.
 */
export const PLANT_TOXIN_DATABASE: PlantToxin[] = [
  {
    name: 'Spinach',
    nameEn: 'Spinach',
    category: 'Leafy Vegetables',
    foods: ['Spinach', 'Swiss chard', 'Beet greens'],
    toxins: ['Oxalates'],
    effects: [
      'Binds with calcium and forms sharp crystals in the body',
      'Causes kidney stones, joint pain, vulvodynia, and systemic inflammation',
      'Also inhibits iron absorption',
    ],
    riskLevel: 'high',
    carnivoreAlternative: 'Liver (high bioavailability real nutrients)',
  },
  {
    name: 'Almonds',
    nameEn: 'Almonds',
    category: 'Nuts',
    foods: ['Almonds', 'Cashews', 'Peanuts'],
    toxins: ['Lectins', 'Phytates'],
    effects: [
      'Lectins: Attack intestinal walls and cause leaky gut (intestinal permeability)',
      'Phytates: Block absorption of important minerals such as zinc, magnesium, and calcium',
      'Note: Most toxins are in the skin',
    ],
    riskLevel: 'high',
    carnivoreAlternative: 'Animal fats (butter, tallow, lard)',
  },
  {
    name: 'Soybeans',
    nameEn: 'Soybeans',
    category: 'Legumes',
    foods: ['Soybeans', 'Kidney beans', 'Lentils'],
    toxins: ['Lectins (especially WGA/PHA)', 'Phytates'],
    effects: [
      'Strong lectins destroy intestinal villi and trigger autoimmune diseases',
      'Also contains enzyme inhibitors that inhibit protein digestion',
      'Hormone disruption from estrogen-like effects (soy)',
    ],
    riskLevel: 'high',
    carnivoreAlternative: 'Red meat (ruminants) (complete amino acid score and heme iron)',
  },
  {
    name: 'Tomato',
    nameEn: 'Tomato',
    category: 'Nightshades',
    foods: ['Tomato (skin/seeds)', 'Peppers', 'Potatoes', 'Eggplant'],
    toxins: ['Lectins', 'Solanine'],
    effects: [
      'Lectins: Easily bind to joint cartilage and cause arthritis and pain',
      'Solanine: A type of neurotoxin that worsens inflammatory reactions',
      'Note: "Italians traditionally remove tomato skin and seeds before eating"',
    ],
    riskLevel: 'medium',
    carnivoreAlternative: 'Egg yolk (choline and fat-soluble vitamins)',
  },
  {
    name: 'Whole Wheat',
    nameEn: 'Whole Wheat',
    category: 'Grains',
    foods: ['Whole wheat', 'Brown rice', 'Oatmeal'],
    toxins: ['WGA (Wheat Germ Agglutinin)', 'Phytates', 'Gluten'],
    effects: [
      'WGA: Mimics insulin behavior and disrupts metabolism. Damages vascular endothelium',
      'Phytates: Cause mineral deficiency',
      'Fiber physically damages the intestines',
    ],
    riskLevel: 'high',
    carnivoreAlternative: 'Bone-in meat and bone broth (intestinal repair through glycine and collagen)',
  },
  {
    name: 'Kale',
    nameEn: 'Kale',
    category: 'Brassicas',
    foods: ['Kale', 'Broccoli', 'Cabbage'],
    toxins: ['Goitrogens'],
    effects: [
      'Inhibits thyroid iodine uptake and reduces thyroid function (reduced metabolism, fatigue)',
      'Gas and bloating from raffinose (indigestible sugars)',
    ],
    riskLevel: 'medium',
    carnivoreAlternative: 'Seafood (natural iodine source)',
  },
  {
    name: 'Chia Seeds',
    nameEn: 'Chia Seeds',
    category: 'Seeds',
    foods: ['Chia seeds', 'Pumpkin seeds', 'Sunflower seeds'],
    toxins: ['Lectins', 'Phytates', 'Omega-6'],
    effects: [
      'Seeds, which are "the next generation of life" for plants, have the strongest defense (toxicity)',
      'Inflammation promotion from excessive omega-6 fatty acids (linoleic acid)',
      'Estrogen-like effects',
    ],
    riskLevel: 'medium',
    carnivoreAlternative: 'Fish roe (ikura, etc.) (DHA/EPA-rich "animal seeds")',
  },
];

/**
 * Terminology Explanation (Mechanism Summary)
 */
export const TOXIN_MECHANISMS = {
  oxalates: {
    name: 'Oxalates',
    description:
      'Fine crystals like "glass shards" that plants use to protect themselves from predators. Not completely broken down even when heated.',
  },
  lectins: {
    name: 'Lectins',
    description:
      'Sugar-binding proteins. Destroy intestinal barrier function (leaky gut) and enter the bloodstream, causing systemic inflammation and autoimmune reactions.',
  },
  phytates: {
    name: 'Phytates',
    description:
      'Representative "antinutrient." Binds with minerals (especially zinc, iron, magnesium) and irreversibly inhibits absorption into the human body.',
  },
  goitrogens: {
    name: 'Goitrogens',
    description: 'Goiter-inducing substances. Interfere with the production of thyroid hormones, which are essential for metabolism.',
  },
};

/**
 * Troubleshooting: Common Symptoms and Solutions
 */
export const REMEDY_LOGIC: RemedyItem[] = [
  {
    symptom: 'Constipation',
    possibleCauses: ['Magnesium deficiency', 'Water deficiency', 'Excessive fiber intake (transition period)'],
    remedies: [
      'Magnesium supplement (600mg/day)',
      'Sufficient water and salt intake',
      'Complete elimination of fiber',
    ],
    logic:
      'Fiber is an intestinal irritant, and constipation is resolved by eliminating it (Ho et al., 2012). Magnesium helps maintain intestinal water.',
  },
  {
    symptom: 'Muscle Cramps',
    possibleCauses: ['Magnesium deficiency', 'Potassium deficiency', 'Sodium deficiency'],
    remedies: [
      'Magnesium supplement',
      'Consume meat juice without discarding (potassium)',
      'Active salt intake (5000-8000mg/day)',
    ],
    logic: 'Electrolyte balance is important. In carnivore, sodium excretion accelerates, so active replenishment is necessary.',
  },
  {
    symptom: 'Keto Flu (Headache, Fatigue)',
    possibleCauses: ['Sodium deficiency', 'Magnesium deficiency', 'Water deficiency'],
    remedies: [
      'Drink salt water (5-8g salt per 1 liter of water)',
      'Magnesium supplement',
      'Sufficient water intake',
    ],
    logic:
      'In a low insulin state, sodium excretion from the kidneys accelerates, so high doses of sodium are needed (Dr. Ken Berry).',
  },
  {
    symptom: 'Joint Pain',
    possibleCauses: ['Intake of plants containing lectins (transition period)', 'Oxalate accumulation'],
    remedies: ['Eliminate all plants', 'Excrete oxalates with sufficient water intake'],
    logic: 'Lectins easily bind to joint cartilage and cause inflammation. Complete elimination is necessary.',
  },
];

/**
 * Search for toxins contained in specific foods
 */
export function getToxinsByFood(foodName: string): PlantToxin[] {
  return PLANT_TOXIN_DATABASE.filter((toxin) =>
    toxin.foods.some(
      (food) =>
        food.toLowerCase().includes(foodName.toLowerCase()) ||
        foodName.toLowerCase().includes(food.toLowerCase())
    )
  );
}

/**
 * Get details of specific toxin
 */
export function getToxinByName(name: string): PlantToxin | undefined {
  return PLANT_TOXIN_DATABASE.find(
    (toxin) => toxin.name === name || toxin.nameEn.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Search for remedies by symptom
 */
export function getRemedyBySymptom(symptom: string): RemedyItem | undefined {
  return REMEDY_LOGIC.find(
    (item) =>
      item.symptom.toLowerCase().includes(symptom.toLowerCase()) ||
      symptom.toLowerCase().includes(item.symptom.toLowerCase())
  );
}

/**
 * CarnivoreOS - Adaptation Phases (Metabolic Phases)
 *
 * Defines the stages of metabolic adaptation in carnivore transition.
 * Used to determine which stage the user is currently in.
 */
export interface AdaptationPhase {
  id: string;
  name: string;
  nameEn: string;
  duration: string; // e.g., "1-2 weeks", "2-4 weeks"
  description: string;
  symptoms: string[]; // Symptoms commonly seen in this phase
  metabolicState: string; // Explanation of metabolic state
  recommendations: string[]; // Recommendations for this phase
  nextPhase?: string; // ID of next phase
}

/**
 * Metabolic Adaptation Phase Database
 *
 * Defines typical stages of metabolic adaptation in carnivore transition.
 * Each phase is determined based on elapsed time since the user started transition and symptoms.
 */
export const ADAPTATION_PHASES: AdaptationPhase[] = [
  // Data will be added later
  // Currently defined as empty array
];

