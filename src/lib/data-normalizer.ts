import { NutritionProfile } from '@/types';

export function validateNutritionProfile(profile: NutritionProfile): boolean {
  // basic checks for negative values
  for (const value of Object.values(profile)) {
    if (value !== null && value < 0) {
      return false;
    }
  }

  // check impossible values e.g. sugar > carbs
  if (
    profile.carbohydrates !== null &&
    profile.totalSugar !== null &&
    profile.totalSugar > profile.carbohydrates
  ) {
    return false;
  }
  
  if (
    profile.totalFat !== null &&
    profile.saturatedFat !== null &&
    profile.saturatedFat > profile.totalFat
  ) {
    return false;
  }

  return true;
}

export function normalizePerServing(
  nutrition: NutritionProfile,
  fromGrams: number,
  toGrams: number
): NutritionProfile {
  if (fromGrams <= 0) return nutrition;
  
  const ratio = toGrams / fromGrams;
  
  const normalized: any = {};
  for (const [key, value] of Object.entries(nutrition)) {
    normalized[key] = value !== null ? Number((value * ratio).toFixed(2)) : null;
  }
  
  return normalized as NutritionProfile;
}

export function formatNutrientValue(value: number | null, unit: string): string {
  if (value === null) return 'N/A';
  return `${value}${unit}`;
}

export function isDataAvailable(value: number | null | undefined): boolean {
  return value !== null && value !== undefined && !isNaN(value);
}
