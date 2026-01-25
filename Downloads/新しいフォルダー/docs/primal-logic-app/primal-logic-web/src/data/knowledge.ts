/**
 * CarnivoreOS - Knowledge Base (Primal Knowledge)
 *
 * Q&A data to address criticisms and misconceptions about carnivore
 * Display/hide can be controlled with isVisible flag
 */

export type KnowledgeItem = {
  id: string;
  title: string; // e.g., "Are Japanese people suited for rice?"
  content: string; // Main text of rebuttal
  isVisible: boolean; // Set to false to hide in production
};

export const KNOWLEDGE_DATA: KnowledgeItem[] = [
  {
    id: 'rice_myth',
    title: 'Misconception: Japanese intestines are suited for rice',
    content: `The history of agriculture is short, and genetic-level adaptation has not occurred. Also, historically, common people eating white rice as a staple is very recent.

Common people in the Edo period ate brown rice and mixed grains, and white rice was for the wealthy. After the Meiji period, rice polishing technology spread, and after post-war food shortages, white rice finally became common.

In other words, the "history of Japanese people eating rice" is at most about 100 years, and genetic-level adaptation requires thousands of years.`,
    isVisible: true,
  },
  {
    id: 'fiber_essential',
    title: 'Misconception: Fiber is essential',
    content: `Fiber is not an "essential nutrient." Rather, it acts as a non-digestible irritant.

According to research, there are reports that constipation was 100% cured by completely eliminating fiber (Ho et al., 2012). Fiber causes "intestinal congestion" and is unnecessary in a carnivore diet.

Animal foods do not contain fiber, but the digestive system functions normally.`,
    isVisible: true,
  },
  {
    id: 'vitamin_c_meat',
    title: 'Misconception: Meat has no vitamin C',
    content: `Meat contains vitamin C. More importantly, in a carnivore (low-carb) state, vitamin C requirements are significantly reduced.

According to the Glucose-Ascorbate Antagonism theory, high carbohydrates (glucose) increase vitamin C needs, but in a ketosis state, about 10mg/day is sufficient.

Normal meat consumption alone sufficiently meets this requirement.`,
    isVisible: true,
  },
  {
    id: 'saturated_fat_heart',
    title: 'Misconception: Saturated fat causes heart disease',
    content: `Saturated fat does not "clog" arteries. What actually clogs arteries is "inflammation."

Cholesterol is a "firefighter," not the cause of the "fire (inflammation)." The causes of inflammation are carbohydrates, excess omega-6, stress, etc.

In a carnivore diet, saturated fat functions as a stable energy source and does not cause inflammation.`,
    isVisible: true,
  },
  {
    id: 'red_meat_cancer',
    title: 'Misconception: Red meat causes cancer',
    content: `The WHO's classification of "red meat may be carcinogenic" is based on observational studies, and causality has not been proven.

In fact, these studies confuse "processed meat" and "unprocessed red meat," and other lifestyle factors of people who eat red meat (smoking, excessive drinking, low exercise, etc.) are not considered.

Unprocessed red meat (steak, liver, etc.) is highly nutrient-dense, and there is no scientific evidence that it increases cancer risk.`,
    isVisible: true,
  },
  {
    id: 'kidney_disease',
    title: 'Misconception: High protein is bad for kidneys',
    content: `The theory that "high protein is bad for kidneys" is based on studies of people who already have kidney disease.

For healthy kidneys, high protein is not a problem. Rather, protein is essential for the production of muscles, hormones, and enzymes.

In a carnivore diet, appropriate amounts of protein (1.5-2g per kg of body weight) are consumed, and kidney function is maintained normally.`,
    isVisible: true,
  },
  {
    id: 'cholesterol_bad',
    title: 'Misconception: Cholesterol is bad',
    content: `Cholesterol is not a "villain." Cholesterol is essential as a component of cell membranes, hormones (testosterone, estrogen, etc.), and as a precursor to vitamin D.

The name "LDL (bad cholesterol)" is also misleading. LDL is a "delivery truck" that transports energy, and the problem is not the "truck" but "traffic congestion (inflammation)" on the road.

In a carnivore diet, cholesterol levels may rise, but this is a normal physiological response and not a health risk.`,
    isVisible: true,
  },
  {
    id: 'balanced_diet',
    title: 'Misconception: A balanced diet is necessary',
    content: `The concept of a "balanced diet" is to justify low-nutrient-density plant foods.

Animal foods (meat, eggs, fish, organ meats) contain all the nutrients humans need, and plant foods are unnecessary.

The carnivore diet is evolutionarily the most "balanced" diet because it is what human ancestors ate for millions of years.`,
    isVisible: true,
  },
];

/**
 * Get only visible knowledge items
 */
export function getVisibleKnowledge(): KnowledgeItem[] {
  return KNOWLEDGE_DATA.filter((item) => item.isVisible);
}

/**
 * Get knowledge item by ID
 */
export function getKnowledgeById(id: string): KnowledgeItem | undefined {
  return KNOWLEDGE_DATA.find((item) => item.id === id);
}

