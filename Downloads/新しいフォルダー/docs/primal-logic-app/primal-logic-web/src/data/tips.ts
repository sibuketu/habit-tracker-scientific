/**
 * CarnivoreOS - Tips
 *
 * Tips data about carnivore diet
 * Randomly displayed during loading and app startup
 */

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty?: number; // 1-4 (⭁Ecount)
}

export const TIPS_DATA: Tip[] = [
  {
    id: 'tip_001',
    title: 'Hay Fever and Carbohydrates',
    content:
      'Hay fever symptoms are actually deeply related to carbohydrate intake. When carbohydrates are consumed, blood sugar rises and inflammatory reactions are promoted. Many people report that hay fever symptoms are reduced or disappear when carbohydrates are completely eliminated with a carnivore diet.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_002',
    title: 'Is Fiber Really Necessary?',
    content:
      'It is commonly said that "fiber is good for the gut," but in reality, fiber is an intestinal irritant, and many people with irritable bowel syndrome (IBS) see improvement when fiber is removed. In carnivore, fiber is completely eliminated and gut health is maintained with meat only.',
    category: 'Digestion',
    difficulty: 2,
  },
  {
    id: 'tip_003',
    title: 'Lectins and Joint Pain',
    content:
      'Lectins found in plants easily bind to joint cartilage and may cause inflammation. By completely eliminating plants with carnivore, many people are freed from joint pain.',
    category: 'Inflammation',
    difficulty: 1,
  },
  {
    id: 'tip_004',
    title: 'Oxalate Accumulation',
    content:
      'Oxalates found in spinach and nuts can accumulate in the body and cause kidney stones and joint pain. In carnivore, these foods are completely avoided, so oxalate-related problems do not occur.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_005',
    title: 'Importance of Electrolyte Balance',
    content:
      'In carnivore, sodium excretion accelerates, so active salt intake (5000-8000mg/day) is necessary. Magnesium and potassium are also important, and potassium can be replenished by consuming meat juice without discarding it.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_006',
    title: 'Keto Flu and Sodium',
    content:
      'The "keto flu" (headache, fatigue) that occurs in the early stages of carnivore transition is mainly caused by sodium deficiency. In a low insulin state, sodium excretion from the kidneys accelerates, so high doses of sodium are needed. Drinking salt water improves symptoms.',
    category: 'Transition',
    difficulty: 1,
  },
  {
    id: 'tip_007',
    title: 'Heme Iron Absorption Rate',
    content:
      'Heme iron found in animal foods has 5-10 times the absorption rate compared to non-heme iron from plant foods. In carnivore, there is little worry about iron deficiency.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_008',
    title: 'Importance of Vitamin B12',
    content:
      'Vitamin B12 is only found in animal foods. Since it is not found in plant foods, strict vegans need B12 supplements, but in carnivore, sufficient B12 can be obtained naturally.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_009',
    title: 'Taurine and Heart Health',
    content:
      'Taurine is an important amino acid for heart health and is abundant in animal foods (especially organ meats, fish, and shellfish). Since it is not found in plant foods, sufficient taurine can be obtained naturally in carnivore.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_010',
    title: 'Collagen and Joint Health',
    content:
      'Collagen is important for joint, skin, and bone health. Bone-in meat, meat with skin, and bone broth contain abundant collagen. In carnivore, collagen can be naturally replenished by actively consuming these parts.',
    category: 'Health',
    difficulty: 1,
  },
  {
    id: 'tip_011',
    title: 'DHA/EPA and Brain Health',
    content:
      'Omega-3 fatty acids (DHA/EPA) are important for brain health. They are abundant in fish (especially salmon, mackerel, and sardines). Eating fish 2-3 times a week provides sufficient omega-3.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_012',
    title: 'Benefits of Bone Broth',
    content:
      'Bone broth contains abundant glycine, proline, and collagen. It helps with gut health, joint health, and improved sleep quality. Incorporating bone broth into meals makes it easy to replenish these nutrients.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_013',
    title: 'Nutrient Density of Organ Meats',
    content:
      'Organ meats (liver, heart, kidney) have very high nutrient density. Liver contains abundant vitamin A, iron, and B12. Eating small amounts of organ meats 1-2 times a week significantly improves nutritional balance.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_014',
    title: 'Dairy and Carnivore',
    content:
      'Dairy handling in carnivore varies. If there is no lactose intolerance, butter, cheese, and heavy cream are often allowed. However, milk should be avoided. If there is lactose intolerance, it is recommended to avoid all dairy products.',
    category: 'Practice',
    difficulty: 2,
  },
  {
    id: 'tip_015',
    title: 'Types of Salt and Importance',
    content:
      'Active salt intake is necessary in carnivore. Regular table salt is fine, but natural salts (sea salt, Himalayan salt, Celtic salt) contain abundant minerals. Sprinkling salt directly on meat allows efficient salt intake.',
    category: 'Practice',
    difficulty: 1,
  },
  {
    id: 'tip_016',
    title: 'P:F Ratio Guidelines',
    content:
      'The protein to fat ratio (P:F ratio) is important in carnivore. Generally, 1:1 to 1:2 (fat is 1-2 times protein) is recommended. Choosing fatty cuts of meat naturally maintains this ratio.',
    category: 'Practice',
    difficulty: 2,
  },
  {
    id: 'tip_017',
    title: 'Transition Period Notes',
    content:
      'When transitioning to carnivore, symptoms called "keto flu" (headache, fatigue, irritability) may appear in the first 1-2 weeks. This is the process of the body adapting to ketosis. Sufficient salt and water intake can alleviate symptoms.',
    category: 'Transition',
    difficulty: 1,
  },
  {
    id: 'tip_018',
    title: 'Digestive Issues and Solutions',
    content:
      'Digestive issues (diarrhea, constipation) may appear in the early transition period. This is due to changes in gut bacteria. Usually improves in 1-2 weeks. Reducing fat and focusing on protein can alleviate symptoms.',
    category: 'Transition',
    difficulty: 2,
  },
  {
    id: 'tip_019',
    title: 'Dining Out Options',
    content:
      'When dining out, plain burgers (no bun), steak, grilled fish, and sashimi are good options. Seasonings and sauces often contain sugar and vegetable oils, so choose simple cooking methods when possible.',
    category: 'Practice',
    difficulty: 1,
  },
  {
    id: 'tip_020',
    title: 'Meat Cooking Temperature',
    content:
      'Meat cooking temperature is important for balancing safety and nutrient retention. Steaks are safe even if only the surface is seared without cooking through. Moderate heating also improves protein digestion and absorption.',
    category: 'Practice',
    difficulty: 1,
  },
  {
    id: 'tip_021',
    title: 'Vitamin D and Sunlight',
    content:
      'Vitamin D is synthesized in the body through sun exposure. In carnivore, fish and eggs also contain vitamin D, but sunbathing is also important. 15-30 minutes of sun exposure per day can synthesize sufficient vitamin D.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_022',
    title: 'Potassium Replenishment Methods',
    content:
      'Potassium intake is also important in carnivore. Consuming meat juice without discarding it can replenish potassium. Meat itself also contains potassium. Using potassium chloride is also an option.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_023',
    title: 'Signs of Magnesium Deficiency',
    content:
      'Signs of magnesium deficiency include muscle cramps, insomnia, and irritability. In carnivore, magnesium intake tends to be insufficient, so consider magnesium supplements as needed.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_024',
    title: 'Exercise Performance and Carnivore',
    content:
      'After adapting to carnivore, many people report improved exercise performance. Especially improved endurance and decreased body fat percentage. Adaptation can take weeks to months, so patience is needed.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_025',
    title: 'Sleep Quality Improvement',
    content:
      'After transitioning to carnivore, many people report improved sleep quality. Blood sugar fluctuations decrease and deep sleep becomes possible. Avoid heavy meals before bedtime and opt for lighter meals.',
    category: 'Health',
    difficulty: 1,
  },
  {
    id: 'tip_026',
    title: 'Cholesterol Misconception',
    content:
      'Rising blood cholesterol levels are a normal response in carnivore. Cholesterol is necessary for cell membranes, hormones, and vitamin D synthesis. High LDL cholesterol does not necessarily mean a problem.',
    category: 'Health',
    difficulty: 3,
  },
  {
    id: 'tip_027',
    title: 'Weight Loss and Weight Maintenance',
    content:
      'Many people experience weight loss in carnivore, but after reaching an appropriate weight, weight is naturally maintained. Sufficient fat and protein intake can prevent excessive weight loss.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_028',
    title: 'Female-Specific Considerations',
    content:
      'Women\'s nutritional needs change according to the menstrual cycle. There are times when iron needs are particularly high. Actively consuming liver and red meat can replenish iron.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_029',
    title: 'Importance of Water Intake',
    content:
      'In carnivore, water excretion may increase initially. Sufficient water and salt intake can prevent dehydration. When you feel thirsty, actively replenish water.',
    category: 'Practice',
    difficulty: 1,
  },
  {
    id: 'tip_030',
    title: 'Meal Timing',
    content:
      'In carnivore, 1-2 meals per day is often sufficient. The need to eat frequently decreases and hunger decreases. Following your body\'s signals and eating only when truly hungry establishes a natural eating rhythm.',
    category: 'Practice',
    difficulty: 1,
  },
  {
    id: 'tip_031',
    title: 'Glycine and Methionine Balance',
    content:
      'Muscle meat contains more methionine, while collagen (bone, skin, cartilage) contains more glycine. Excess methionine may promote inflammation, so eating bone-in meat and meat with skin can balance glycine and methionine.',
    category: 'Nutrition',
    difficulty: 3,
  },
  {
    id: 'tip_032',
    title: 'Importance of Vitamin K2',
    content:
      'Vitamin K2 is important for bone health and cardiovascular health. It is abundant in animal foods (especially grass-fed meat, organ meats, fermented foods). In carnivore, sufficient K2 can be obtained naturally.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_033',
    title: 'Zinc and Immune Function',
    content:
      'Zinc is important for immune function, wound healing, and taste. It is abundant in red meat, organ meats, and shellfish. In carnivore, there is little worry about zinc deficiency.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_034',
    title: 'Selenium and Thyroid Health',
    content:
      'Selenium is necessary for thyroid hormone synthesis. It is abundant in fish, organ meats, and eggs. Eating fish or organ meats several times a week provides sufficient selenium.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_035',
    title: 'Choline and Brain Health',
    content:
      'Choline is important for brain health, memory, and learning. It is abundant in egg yolks, organ meats, and fish. Egg yolks are an excellent source of choline.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_036',
    title: 'Vitamin A Overdose Misconception',
    content:
      'There is concern that eating liver causes vitamin A overdose, but in reality, vitamin A toxicity is very rare. Eating small amounts of liver 1-2 times a week is safe and nutritionally beneficial.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_037',
    title: 'Omega-3 and Omega-6 Ratio',
    content:
      'Modern diets tend to have excess omega-6, but in carnivore, choosing grass-fed meat and fish can balance omega-3 and omega-6. It is recommended to eat fish 2-3 times a week.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_038',
    title: 'Calcium Intake',
    content:
      'There is concern that calcium intake is insufficient in carnivore, but calcium can actually be obtained from bone-in meat, small fish, and bone broth. Vitamin D and K2 are also important for calcium absorption.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_039',
    title: 'Phosphorus and Calcium Balance',
    content:
      'Meat contains a lot of phosphorus, but balance can be maintained by also consuming calcium. Eating bone-in meat and bone broth can balance phosphorus and calcium.',
    category: 'Nutrition',
    difficulty: 3,
  },
  {
    id: 'tip_040',
    title: 'Copper and Zinc Balance',
    content:
      'Organ meats contain a lot of copper, but balance can be maintained by also consuming zinc. Combining red meat and organ meats can balance copper and zinc.',
    category: 'Nutrition',
    difficulty: 3,
  },
  {
    id: 'tip_041',
    title: 'Importance of B Vitamins',
    content:
      'B vitamins (B1, B2, B3, B5, B6, B7, B9, B12) are important for energy metabolism, nerve function, and DNA synthesis. Animal foods contain all B vitamins abundantly.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_042',
    title: 'Folate and B12 Relationship',
    content:
      'Folate and B12 work together. Both are necessary for DNA synthesis and red blood cell formation. In carnivore, both can be obtained sufficiently.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_043',
    title: 'Vitamin E Intake',
    content:
      'Vitamin E is important as an antioxidant. Animal foods contain relatively little, but eggs and organ meats contain it. Also, vitamin E requirements may decrease in low-carb states.',
    category: 'Nutrition',
    difficulty: 2,
  },
  {
    id: 'tip_044',
    title: 'Iodine and Thyroid',
    content:
      'Iodine is necessary for thyroid hormone synthesis. It is abundant in fish, shellfish, and seaweed. Eating fish several times a week provides sufficient iodine.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_045',
    title: 'Molybdenum and Sulfur Metabolism',
    content:
      'Molybdenum is necessary for sulfur amino acid metabolism. It is abundant in organ meats, especially liver. 1-2 times a week of organ meats is sufficient.',
    category: 'Nutrition',
    difficulty: 3,
  },
  {
    id: 'tip_046',
    title: 'Chromium and Blood Sugar',
    content:
      'Chromium improves insulin action and helps stabilize blood sugar. It is found in meat, especially organ meats. In carnivore, blood sugar stabilizes, so chromium needs also decrease.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_047',
    title: 'Manganese and Antioxidants',
    content:
      'Manganese is important as a component of antioxidant enzymes. It is found in organ meats, especially liver. 1-2 times a week of organ meats is sufficient.',
    category: 'Nutrition',
    difficulty: 3,
  },
  {
    id: 'tip_048',
    title: 'Fluorine and Bone Health',
    content:
      'Fluorine is important for bone and dental health. It is found in fish, especially small fish and bone-in fish. Eating fish several times a week provides sufficient fluorine.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_049',
    title: 'Silicon and Collagen',
    content:
      'Silicon is important for collagen synthesis. It is found in bone broth and bone-in meat. Regularly drinking bone broth can replenish silicon.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_050',
    title: 'Vanadium and Blood Sugar',
    content:
      'Vanadium improves insulin action and helps stabilize blood sugar. It is found in organ meats, especially liver.',
    category: 'Health',
    difficulty: 3,
  },
  {
    id: 'tip_051',
    title: 'Nickel and Metabolism',
    content:
      'Nickel is necessary for activation of certain enzymes. It is found in organ meats, especially liver. 1-2 times a week of organ meats is sufficient.',
    category: 'Nutrition',
    difficulty: 3,
  },
  {
    id: 'tip_052',
    title: 'Boron and Bone Health',
    content:
      'Boron is important for bone health and calcium metabolism. It is relatively low in meat but found in bone broth.',
    category: 'Health',
    difficulty: 3,
  },
  {
    id: 'tip_053',
    title: 'Chlorine and Electrolyte Balance',
    content:
      'Chlorine is important for maintaining electrolyte balance together with sodium. Consuming salt (sodium chloride) also replenishes chlorine simultaneously.',
    category: 'Nutrition',
    difficulty: 1,
  },
  {
    id: 'tip_054',
    title: 'Constipation During Transition',
    content:
      'Constipation may occur in the early stages of carnivore transition. This is a temporary reaction to removing fiber. Usually improves in 1-2 weeks. Sufficient water and salt intake can alleviate symptoms.',
    category: 'Transition',
    difficulty: 1,
  },
  {
    id: 'tip_055',
    title: 'Diarrhea During Transition',
    content:
      'Diarrhea may occur in the early stages of carnivore transition. This is a temporary reaction to suddenly increased fat intake. Reducing fat and focusing on protein can alleviate symptoms.',
    category: 'Transition',
    difficulty: 1,
  },
  {
    id: 'tip_056',
    title: 'Fatigue During Transition',
    content:
      'Fatigue may appear in the early stages of carnivore transition. This is the process of the body adapting to ketosis. Sufficient salt and water intake and adequate sleep can alleviate symptoms.',
    category: 'Transition',
    difficulty: 1,
  },
  {
    id: 'tip_057',
    title: 'Irritability During Transition',
    content:
      'Irritability may occur in the early stages of carnivore transition. This is a temporary reaction to blood sugar fluctuations or electrolyte imbalance. Sufficient salt intake and gradual adaptation will improve symptoms.',
    category: 'Transition',
    difficulty: 1,
  },
  {
    id: 'tip_058',
    title: 'Individual Differences in Adaptation Period',
    content:
      'The adaptation period to carnivore varies by individual. Some adapt in 1-2 weeks, while others may take months. It is important to continue without rushing, following your body\'s signals.',
    category: 'Transition',
    difficulty: 1,
  },
  {
    id: 'tip_059',
    title: 'Exercise and Carnivore',
    content:
      'After adapting to carnivore, many people report improved exercise performance. Especially improved endurance and decreased body fat percentage. It is recommended to reduce exercise intensity during the adaptation period.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_060',
    title: 'Carnivore and Mental Health',
    content:
      'After transitioning to carnivore, many people report improved mental health. Anxiety and depression symptoms decrease and concentration improves. This is thought to be due to stabilized blood sugar and reduced inflammation.',
    category: 'Health',
    difficulty: 2,
  },
  {
    id: 'tip_mindset_001',
    title: 'The Trap of Perfectionism',
    content:
      'The "100 points or 0 points" mindset is the enemy of continuity. Eating pizza once does not ruin everything. What matters is returning to carnivore immediately with the next meal.',
    category: 'Mindset',
    difficulty: 2,
  },
  {
    id: 'tip_mindset_002',
    title: 'Having Your Own Axis',
    content:
      'Don\'t be swayed by others\' opinions, value "how you feel." Your body\'s good condition is the best evidence, more than others\' criticism.',
    category: 'Mindset',
    difficulty: 2,
  },
  {
    id: 'tip_social_001',
    title: 'Managing "Poison" in Social Situations',
    content:
      'When unavoidable in meals with friends, you may eat pizza or pasta. That is not a "failure" but a "social cost." A 16-hour fast the next day to reset metabolism is fine.',
    category: 'Social',
    difficulty: 2,
  },
  {
    id: 'tip_social_002',
    title: 'Loneliness and Cortisol',
    content:
      'Excessive loneliness increases stress hormones (cortisol) and negatively affects metabolism. Occasionally enjoying meals with friends and refreshing your mind is also "health management" in a broad sense.',
    category: 'Social',
    difficulty: 3,
  },
  {
    id: 'tip_social_003',
    title: 'The Art of Refusing',
    content:
      'At drinking parties, saying "doctor\'s orders..." is the least confrontational. Saying "allergy" is also effective. Avoid explaining unnecessarily and causing arguments.',
    category: 'Social',
    difficulty: 1,
  },
];

/**
 * Get tips sequentially (to show progress)
 */
export function getSequentialTip(currentIndex?: number): { tip: Tip; index: number } {
  const savedIndex =
    typeof window !== 'undefined' ? localStorage.getItem('tips_current_index') : null;
  let index = currentIndex !== undefined ? currentIndex : savedIndex ? parseInt(savedIndex, 10) : 0;

  if (index >= TIPS_DATA.length) {
    index = 0; // Return to beginning after reaching the end
  }

  const tip = TIPS_DATA[index];

  // Save next index
  if (typeof window !== 'undefined') {
    localStorage.setItem('tips_current_index', String(index + 1));
  }

  return { tip, index };
}

/**
 * Get next tip (sequential)
 */
export function getNextTip(currentIndex: number): { tip: Tip; index: number } {
  const nextIndex = currentIndex + 1 >= TIPS_DATA.length ? 0 : currentIndex + 1;
  return getSequentialTip(nextIndex);
}

/**
 * Get previous tip (sequential)
 */
export function getPrevTip(currentIndex: number): { tip: Tip; index: number } {
  const prevIndex = currentIndex - 1 < 0 ? TIPS_DATA.length - 1 : currentIndex - 1;
  return { tip: TIPS_DATA[prevIndex], index: prevIndex };
}

/**
 * Get random tip (kept for backward compatibility)
 */
export function getRandomTip(): Tip {
  const randomIndex = Math.floor(Math.random() * TIPS_DATA.length);
  return TIPS_DATA[randomIndex];
}

/**
 * Get tips by category
 */
export function getTipsByCategory(category: string): Tip[] {
  return TIPS_DATA.filter((tip) => tip.category === category);
}

/**
 * Get random tip excluding current tip (kept for backward compatibility)
 */
export function getRandomTipExcluding(excludeId: string): Tip {
  const available = TIPS_DATA.filter((tip) => tip.id !== excludeId);
  if (available.length === 0) {
    // If no tips to exclude, return normal random tip
    return getRandomTip();
  }
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

/**
 * Get saved tip ID list
 */
function getSavedTipIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('@primal_logic:saved_tips');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Check if tip is saved
 */
export function isTipSaved(id: string): boolean {
  const ids = getSavedTipIds();
  return ids.includes(id);
}

/**
 * Save tip
 */
export function saveTip(tip: Tip): void {
  const ids = getSavedTipIds();
  if (!ids.includes(tip.id)) {
    ids.push(tip.id);
    localStorage.setItem('@primal_logic:saved_tips', JSON.stringify(ids));
  }
}

/**
 * Unsave tip
 */
export function unsaveTip(id: string): void {
  const ids = getSavedTipIds();
  const newIds = ids.filter((savedId) => savedId !== id);
  localStorage.setItem('@primal_logic:saved_tips', JSON.stringify(newIds));
}

