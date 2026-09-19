export interface NutritionCulprit {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  summary: string;
  details: string;
  whereItHides: string[];
  alternativeNames?: string[];
  whatToCheck: string;
  dailyLimit?: string;
}

export type MythCategory =
  | 'protein'
  | 'carbohydrates'
  | 'hydration'
  | 'energy'
  | 'recovery'
  | 'supplements'
  | 'meal-timing';

export interface AthleteMyth {
  id: string;
  myth: string;
  truth: string;
  explanation: string;
  practicalGuidance: string;
  category: MythCategory;
}

export interface FoodAlternative {
  id: string;
  popularFood: string;
  popularFoodIcon: string;
  concern: string;
  alternativeFood: string;
  alternativeFoodIcon: string;
  reason: string;
  comparisonMetrics: {
    metric: string;
    popular: string;
    alternative: string;
    betterChoice: 'popular' | 'alternative' | 'tie';
  }[];
}

export interface EducationalSection {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  content?: string;
}

export interface HealthHaloStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const MYTH_CATEGORY_LABELS: Record<MythCategory, string> = {
  'protein': 'Protein',
  'carbohydrates': 'Carbohydrates',
  'hydration': 'Hydration',
  'energy': 'Energy',
  'recovery': 'Recovery',
  'supplements': 'Supplements',
  'meal-timing': 'Meal Timing',
};
