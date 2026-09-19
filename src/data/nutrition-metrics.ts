import { NutritionMetric } from '@/types';

export const nutritionMetrics: NutritionMetric[] = [
  {
    id: 'calories',
    displayName: 'Calories',
    shortName: 'Cal',
    unit: 'kcal',
    preferredDirection: 'context-dependent',
    group: 'key',
    description: 'A unit of energy. Your caloric needs depend on your age, sex, weight, and activity level.',
    interpretationRule: 'Consider in context of your daily goals.',
    colorClass: 'bg-gray-100 text-gray-800'
  },
  {
    id: 'protein',
    displayName: 'Protein',
    shortName: 'Pro',
    unit: 'g',
    preferredDirection: 'higher',
    group: 'key',
    description: 'Essential for building and repairing tissues. Helps keep you full.',
    interpretationRule: 'Higher is generally better, especially for satiety and muscle maintenance.',
    colorClass: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'fiber',
    displayName: 'Dietary Fiber',
    shortName: 'Fib',
    unit: 'g',
    preferredDirection: 'higher',
    group: 'key',
    description: 'A type of carbohydrate the body can\'t digest. Important for digestion and blood sugar control.',
    interpretationRule: 'Higher is better. Most people do not get enough fiber.',
    colorClass: 'bg-green-100 text-green-800'
  },
  {
    id: 'addedSugar',
    displayName: 'Added Sugars',
    shortName: 'Add Sug',
    unit: 'g',
    preferredDirection: 'lower',
    group: 'key',
    description: 'Sugars added during processing, distinct from naturally occurring sugars in fruit/milk.',
    interpretationRule: 'Lower is better. Limit to under 25-36g per day.',
    colorClass: 'bg-red-100 text-red-800'
  },
  {
    id: 'totalSugar',
    displayName: 'Total Sugars',
    shortName: 'Sug',
    unit: 'g',
    preferredDirection: 'lower',
    group: 'other',
    description: 'Includes both natural and added sugars.',
    interpretationRule: 'Lower is generally better, but focus more on minimizing added sugars.',
    colorClass: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'saturatedFat',
    displayName: 'Saturated Fat',
    shortName: 'Sat Fat',
    unit: 'g',
    preferredDirection: 'lower',
    group: 'key',
    description: 'A type of fat typically solid at room temperature. High intake is linked to heart disease.',
    interpretationRule: 'Lower is better. Choose unsaturated fats when possible.',
    colorClass: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'sodium',
    displayName: 'Sodium',
    shortName: 'Sod',
    unit: 'mg',
    preferredDirection: 'lower',
    group: 'other',
    description: 'An essential mineral, but excess can lead to high blood pressure.',
    interpretationRule: 'Lower is better for most people. Limit to 2300mg per day.',
    colorClass: 'bg-purple-100 text-purple-800'
  }
];
