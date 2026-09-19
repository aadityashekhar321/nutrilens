import { 
  Food, 
  FoodComparison, 
  ComparisonResult, 
  NutritionMetric, 
  MetricComparison, 
  ComparisonChartData,
  NutritionProfile
} from '@/types';
import { foods } from '@/data/foods';
import { comparisons } from '@/data/comparisons';
import { nutritionMetrics } from '@/data/nutrition-metrics';
import { evaluateMetric } from './nutrition-rules';
import { normalizePerServing } from './data-normalizer';

export function getComparisonByCategory(categoryId: string): ComparisonResult | null {
  const comparison = comparisons.find(c => c.categoryId === categoryId);
  if (!comparison) return null;

  const foodA = foods.find(f => f.id === comparison.foodAId);
  const foodB = foods.find(f => f.id === comparison.foodBId);

  if (!foodA || !foodB) return null;

  return { comparison, foodA, foodB };
}

export function normalizeToServing(
  nutrition: NutritionProfile, 
  originalGrams: number | undefined, 
  targetGrams: number
): NutritionProfile {
  if (!originalGrams || originalGrams <= 0) return nutrition;
  return normalizePerServing(nutrition, originalGrams, targetGrams);
}

export function compareMetric(
  foodA: Food,
  foodB: Food,
  metric: NutritionMetric,
  normalizedNutritionA: NutritionProfile,
  normalizedNutritionB: NutritionProfile
): MetricComparison {
  const valA = normalizedNutritionA[metric.id as keyof NutritionProfile] as number | null;
  const valB = normalizedNutritionB[metric.id as keyof NutritionProfile] as number | null;

  const { winner, margin, percentDiff, interpretation } = evaluateMetric(
    metric.id,
    metric.preferredDirection,
    valA,
    valB
  );

  return {
    metricId: metric.id,
    displayName: metric.displayName,
    unit: metric.unit,
    valueA: valA,
    valueB: valB,
    winner,
    margin,
    percentDiff,
    interpretation,
    preferredDirection: metric.preferredDirection,
  };
}

export function getFilteredComparison(
  foodA: Food,
  foodB: Food,
  selectedMetricIds: string[]
): MetricComparison[] {
  // Find a common serving size, usually 100g, but we'll use foodA's serving size for the baseline
  const targetServingSize = foodA.servingSize.amount;
  
  const normA = foodA.nutrition; 
  // Normalize food B to food A's serving size for fair comparison
  const normB = normalizeToServing(
    foodB.nutrition, 
    foodB.servingSize.amount, 
    targetServingSize
  );

  return selectedMetricIds
    .map(id => nutritionMetrics.find(m => m.id === id))
    .filter((m): m is NutritionMetric => m !== undefined)
    .map(metric => compareMetric(foodA, foodB, metric, normA, normB));
}

export function buildChartData(
  foodA: Food,
  foodB: Food,
  selectedMetricIds: string[]
): ComparisonChartData[] {
  const targetServingSize = foodA.servingSize.amount;
  const normA = foodA.nutrition; 
  const normB = normalizeToServing(
    foodB.nutrition, 
    foodB.servingSize.amount, 
    targetServingSize
  );

  return selectedMetricIds
    .map(id => nutritionMetrics.find(m => m.id === id))
    .filter((m): m is NutritionMetric => m !== undefined)
    .map(metric => {
      const valA = normA[metric.id as keyof NutritionProfile] as number | null;
      const valB = normB[metric.id as keyof NutritionProfile] as number | null;
      
      const { winner } = evaluateMetric(metric.id, metric.preferredDirection, valA, valB);
      
      return {
        metric: metric.id,
        displayName: metric.displayName,
        unit: metric.unit,
        foodA: valA ?? 0,
        foodB: valB ?? 0,
        foodAName: foodA.name,
        foodBName: foodB.name,
        winner
      };
    });
}
