import { LabelGuide, SampleLabelData } from '@/types';

export const labelGuides: LabelGuide[] = [
  {
    id: 'guide-serving',
    field: 'Serving Size',
    icon: 'FaBalanceScale',
    whyItMatters: 'All values on the label are based on this amount. Companies often use unrealistically small serving sizes to make a product appear healthier or lower in calories.',
    whatToLookFor: 'Compare the serving size to what you actually eat.',
    exampleInterpretation: 'If a bag of chips says 150 calories per serving, but contains 3 servings and you eat the whole bag, you consumed 450 calories.',
    tipText: 'Always multiply the calories and nutrients by the number of servings you consume.'
  },
  {
    id: 'guide-added-sugars',
    field: 'Added Sugars',
    icon: 'FaCandyCane',
    whyItMatters: 'Excess added sugar is linked to weight gain, diabetes, and heart disease. The new labels separate added sugar from naturally occurring sugar.',
    whatToLookFor: 'Keep added sugars as low as possible. A 5% DV or less is low, 20% DV or more is high.',
    exampleInterpretation: 'A yogurt might have 15g Total Sugar, but only 10g Added Sugar. The other 5g are natural milk sugars (lactose).',
    tipText: 'Aim for less than 25-36 grams of added sugar per day.'
  },
  {
    id: 'guide-sodium',
    field: 'Sodium',
    icon: 'FaSaltBae',
    whyItMatters: 'High sodium intake can lead to high blood pressure.',
    whatToLookFor: 'Check the % Daily Value. Foods with >20% DV of sodium per serving are considered high sodium.',
    exampleInterpretation: 'Canned soups and frozen meals often contain 30-50% of your daily sodium in just one serving.',
    tipText: 'Rinsing canned beans and vegetables can reduce sodium by up to 40%.'
  },
  {
    id: 'guide-fats',
    field: 'Saturated & Trans Fat',
    icon: 'FaOilCan',
    whyItMatters: 'These fats can raise your bad cholesterol levels.',
    whatToLookFor: 'Aim for 0g of Trans Fat and keep Saturated Fat low.',
    exampleInterpretation: 'Even if a label says 0g Trans Fat, if "partially hydrogenated oil" is in the ingredients, it contains trace amounts.',
    tipText: 'Total fat isn\'t inherently bad; focus on limiting saturated and trans fats while enjoying healthy unsaturated fats.'
  },
  {
    id: 'guide-fiber',
    field: 'Dietary Fiber',
    icon: 'FaLeaf',
    whyItMatters: 'Fiber keeps you full, aids digestion, and slows the absorption of sugar into your bloodstream.',
    whatToLookFor: 'Look for foods with at least 3 grams of fiber per serving, especially in breads and cereals.',
    exampleInterpretation: 'A high-fiber food will help mitigate the blood sugar spike from the carbohydrates it contains.',
    tipText: '20% DV or more of dietary fiber per serving is considered an excellent source.'
  },
  {
    id: 'guide-ingredients',
    field: 'Ingredient List',
    icon: 'FaListUl',
    whyItMatters: 'Ingredients are listed in descending order by weight. The first 3-5 ingredients make up the bulk of the food.',
    whatToLookFor: 'Watch out for sugar listed under different names (syrup, words ending in -ose) in the top ingredients.',
    exampleInterpretation: 'If whole wheat isn\'t the very first ingredient in "wheat bread", it is mostly refined flour.',
    tipText: 'A shorter ingredient list with recognizable words is generally a better choice.'
  }
];

export const sampleLabelData: SampleLabelData = {
  productName: 'Honey Oat Granola Bar',
  servingSize: '1 Bar (40g)',
  servingsPerContainer: '6',
  calories: 190,
  totalFat: { value: 7, unit: 'g', dv: 9 },
  saturatedFat: { value: 1.5, unit: 'g', dv: 8 },
  transFat: { value: 0, unit: 'g' },
  cholesterol: { value: 0, unit: 'mg', dv: 0 },
  sodium: { value: 140, unit: 'mg', dv: 6 },
  totalCarbs: { value: 29, unit: 'g', dv: 11 },
  dietaryFiber: { value: 2, unit: 'g', dv: 7 },
  totalSugars: { value: 12, unit: 'g' },
  addedSugars: { value: 11, unit: 'g', dv: 22 },
  protein: { value: 3, unit: 'g' },
  ingredients: 'Whole Grain Oats, Corn Syrup, Sugar, Canola Oil, Honey, Brown Rice Crisp, Salt, Natural Flavor.'
};
