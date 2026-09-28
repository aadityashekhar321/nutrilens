import { describe, it, expect } from 'vitest';
import {
  validateNutritionProfile,
  normalizePerServing,
  formatNutrientValue,
  isDataAvailable,
} from '../data-normalizer';
import type { NutritionProfile } from '@/types';

const baseProfile: NutritionProfile = {
  calories: 150,
  protein: 10,
  totalFat: 5,
  saturatedFat: 2,
  transFat: 0,
  carbohydrates: 20,
  totalSugar: 8,
  addedSugar: 4,
  dietaryFiber: 3,
  sodium: 200,
  servingSize: 100,
};

// ──────────────────────────────────────────────────────────────────────────────

describe('validateNutritionProfile', () => {
  it('returns true for a valid profile', () => {
    expect(validateNutritionProfile(baseProfile)).toBe(true);
  });

  it('returns false when any value is negative', () => {
    expect(validateNutritionProfile({ ...baseProfile, protein: -1 })).toBe(false);
    expect(validateNutritionProfile({ ...baseProfile, calories: -100 })).toBe(false);
    expect(validateNutritionProfile({ ...baseProfile, sodium: -5 })).toBe(false);
  });

  it('returns false when totalSugar exceeds carbohydrates', () => {
    expect(
      validateNutritionProfile({ ...baseProfile, totalSugar: 25, carbohydrates: 20 })
    ).toBe(false);
  });

  it('returns true when totalSugar equals carbohydrates', () => {
    expect(
      validateNutritionProfile({ ...baseProfile, totalSugar: 20, carbohydrates: 20 })
    ).toBe(true);
  });

  it('returns false when saturatedFat exceeds totalFat', () => {
    expect(
      validateNutritionProfile({ ...baseProfile, saturatedFat: 8, totalFat: 5 })
    ).toBe(false);
  });

  it('returns true when saturatedFat equals totalFat', () => {
    expect(
      validateNutritionProfile({ ...baseProfile, saturatedFat: 5, totalFat: 5 })
    ).toBe(true);
  });

  it('handles null values without throwing', () => {
    const withNulls: NutritionProfile = {
      ...baseProfile,
      totalSugar: null,
      carbohydrates: null,
      saturatedFat: null,
      totalFat: null,
    };
    expect(() => validateNutritionProfile(withNulls)).not.toThrow();
    expect(validateNutritionProfile(withNulls)).toBe(true);
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('normalizePerServing', () => {
  it('returns the original profile when fromGrams is 0', () => {
    const result = normalizePerServing(baseProfile, 0, 100);
    expect(result).toEqual(baseProfile);
  });

  it('returns the original profile when fromGrams is negative', () => {
    const result = normalizePerServing(baseProfile, -50, 100);
    expect(result).toEqual(baseProfile);
  });

  it('scales all non-null values by the ratio toGrams/fromGrams', () => {
    const result = normalizePerServing(baseProfile, 50, 100); // ratio = 2
    expect(result.calories).toBe(300);
    expect(result.protein).toBe(20);
    expect(result.sodium).toBe(400);
  });

  it('preserves null values as null', () => {
    const profileWithNull: NutritionProfile = { ...baseProfile, addedSugar: null };
    const result = normalizePerServing(profileWithNull, 100, 200);
    expect(result.addedSugar).toBeNull();
  });

  it('returns 1:1 when fromGrams equals toGrams', () => {
    const result = normalizePerServing(baseProfile, 100, 100);
    expect(result.calories).toBe(baseProfile.calories);
    expect(result.protein).toBe(baseProfile.protein);
  });

  it('rounds to 2 decimal places', () => {
    const result = normalizePerServing(baseProfile, 3, 10); // ratio = 3.333...
    expect(Number.isFinite(result.calories as number)).toBe(true);
    const strCalories = String(result.calories);
    const decimalPart = strCalories.split('.')[1];
    expect(!decimalPart || decimalPart.length <= 2).toBe(true);
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('formatNutrientValue', () => {
  it('returns "N/A" for null', () => {
    expect(formatNutrientValue(null, 'g')).toBe('N/A');
  });

  it('formats a value with its unit', () => {
    expect(formatNutrientValue(10, 'g')).toBe('10g');
    expect(formatNutrientValue(200, 'mg')).toBe('200mg');
  });

  it('handles zero correctly', () => {
    expect(formatNutrientValue(0, 'g')).toBe('0g');
  });

  it('handles decimal values', () => {
    expect(formatNutrientValue(2.5, 'g')).toBe('2.5g');
  });

  it('works with an empty unit string', () => {
    expect(formatNutrientValue(100, '')).toBe('100');
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('isDataAvailable', () => {
  it('returns false for null', () => {
    expect(isDataAvailable(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isDataAvailable(undefined)).toBe(false);
  });

  it('returns false for NaN', () => {
    expect(isDataAvailable(NaN)).toBe(false);
  });

  it('returns true for 0', () => {
    expect(isDataAvailable(0)).toBe(true);
  });

  it('returns true for a positive number', () => {
    expect(isDataAvailable(42)).toBe(true);
  });

  it('returns true for a negative number', () => {
    expect(isDataAvailable(-10)).toBe(true);
  });
});
