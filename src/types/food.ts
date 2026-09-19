export type FoodCategory =
  | 'breakfast-cereals'
  | 'yogurt'
  | 'granola'
  | 'bread'
  | 'beverages'
  | 'snack-foods'
  | 'energy-foods'
  | 'protein-products'
  | 'sauces'
  | 'packaged-foods';

export interface ServingSize {
  amount: number;
  unit: string;
  gramsEquivalent?: number;
}

export interface NutritionProfile {
  calories: number | null;
  protein: number | null;
  totalFat: number | null;
  saturatedFat: number | null;
  transFat: number | null;
  carbohydrates: number | null;
  fiber: number | null;
  totalSugar: number | null;
  addedSugar: number | null;
  sodium: number | null;
}

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  description: string;
  servingSize: ServingSize;
  nutrition: NutritionProfile;
  ingredients?: string[];
  marketingClaims?: string[];
  healthHaloRisk: 'low' | 'medium' | 'high';
  alternativeIds?: string[];
  educationalNotes?: string;
  metadata?: Record<string, string>;
}

export const FOOD_CATEGORY_LABELS: Record<FoodCategory, string> = {
  'breakfast-cereals': 'Breakfast Cereals',
  'yogurt': 'Yogurt',
  'granola': 'Granola & Bars',
  'bread': 'Bread & Wraps',
  'beverages': 'Beverages',
  'snack-foods': 'Snack Foods',
  'energy-foods': 'Energy Foods',
  'protein-products': 'Protein Products',
  'sauces': 'Sauces & Condiments',
  'packaged-foods': 'Packaged Foods',
};
