import type { Food } from './food';

export interface FoodComparison {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  description: string;
  foodAId: string;
  foodBId: string;
  icon: string;
}

export interface ComparisonResult {
  comparison: FoodComparison;
  foodA: Food;
  foodB: Food;
}

export type SearchResultType =
  | 'food'
  | 'comparison'
  | 'label-term'
  | 'myth'
  | 'alternative'
  | 'culprit'
  | 'education';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  excerpt: string;
  link: string;
  icon?: string;
}
