import { describe, it, expect } from 'vitest';
import {
  validateFoodInsightInput,
  validateAIResponse,
  sanitizeText,
} from '../validators';

describe('validateFoodInsightInput', () => {
  it('returns invalid for empty string', () => {
    expect(validateFoodInsightInput('')).toEqual({
      isValid: false,
      error: 'Food name is required',
    });
  });

  it('returns invalid for whitespace-only string', () => {
    expect(validateFoodInsightInput('   ')).toEqual({
      isValid: false,
      error: 'Food name is required',
    });
  });

  it('returns invalid when input exceeds 200 characters', () => {
    const longInput = 'a'.repeat(201);
    const result = validateFoodInsightInput(longInput);
    expect(result.isValid).toBe(false);
    expect(result.error).toMatch(/too long/i);
  });

  it('returns valid for exactly 200 characters', () => {
    const input = 'a'.repeat(200);
    expect(validateFoodInsightInput(input).isValid).toBe(true);
  });

  it('returns invalid for input containing "<"', () => {
    expect(validateFoodInsightInput('<script>alert(1)</script>')).toMatchObject({
      isValid: false,
    });
  });

  it('returns invalid for input containing ">"', () => {
    expect(validateFoodInsightInput('a > b')).toMatchObject({ isValid: false });
  });

  it('returns invalid for input containing "{"', () => {
    expect(validateFoodInsightInput('{"key":"val"}')).toMatchObject({ isValid: false });
  });

  it('returns invalid for input containing "("', () => {
    expect(validateFoodInsightInput('foo(bar)')).toMatchObject({ isValid: false });
  });

  it('returns valid for normal food name', () => {
    expect(validateFoodInsightInput('Greek Vanilla Yogurt')).toEqual({ isValid: true });
  });

  it('returns valid for food name with hyphens and apostrophes', () => {
    expect(validateFoodInsightInput("Lenny & Larry's Protein Cookie")).toEqual({ isValid: true });
  });
});

// ──────────────────────────────────────────────────────────────────────────────

const validResponse = {
  foodName: 'Chobani Greek Yogurt',
  summary: 'A summary.',
  betterChoiceGuidance: 'Eat plain yogurt.',
  importantCaveat: 'This is an estimate.',
  healthHaloRisk: 'medium' as const,
  likelyMarketingClaims: ['Low Fat', 'Natural'],
  potentialConcerns: ['Added sugar'],
  whatToCheckOnLabel: ['Look for added sugars'],
  nutritionalHighlights: {
    sugar: '12g',
    protein: '14g',
    fiber: '0g',
    sodium: '65mg',
    fat: '3g',
  },
};

describe('validateAIResponse', () => {
  it('returns true for a fully valid response', () => {
    expect(validateAIResponse(validResponse)).toBe(true);
  });

  it('returns false for null', () => {
    expect(validateAIResponse(null)).toBe(false);
  });

  it('returns false for a non-object primitive', () => {
    expect(validateAIResponse('string')).toBe(false);
    expect(validateAIResponse(42)).toBe(false);
  });

  it('returns false when a required string field is missing', () => {
    const { summary, ...rest } = validResponse;
    expect(validateAIResponse(rest)).toBe(false);
  });

  it('returns false when a required string field is not a string', () => {
    expect(validateAIResponse({ ...validResponse, summary: 123 })).toBe(false);
  });

  it('returns false when a required array field is missing', () => {
    const { likelyMarketingClaims, ...rest } = validResponse;
    expect(validateAIResponse(rest)).toBe(false);
  });

  it('returns false when an array field is a string instead of array', () => {
    expect(validateAIResponse({ ...validResponse, potentialConcerns: 'high sodium' })).toBe(false);
  });

  it('returns false for invalid healthHaloRisk value', () => {
    expect(validateAIResponse({ ...validResponse, healthHaloRisk: 'extreme' })).toBe(false);
  });

  it('accepts all four valid healthHaloRisk values', () => {
    for (const risk of ['low', 'medium', 'high', 'unclear']) {
      expect(validateAIResponse({ ...validResponse, healthHaloRisk: risk })).toBe(true);
    }
  });

  it('returns false when nutritionalHighlights is missing', () => {
    const { nutritionalHighlights, ...rest } = validResponse;
    expect(validateAIResponse(rest)).toBe(false);
  });

  it('returns false when a nutritionalHighlights field is not a string', () => {
    expect(
      validateAIResponse({
        ...validResponse,
        nutritionalHighlights: { ...validResponse.nutritionalHighlights, sugar: 12 },
      })
    ).toBe(false);
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('sanitizeText', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeText('')).toBe('');
  });

  it('escapes "<" to "&lt;"', () => {
    expect(sanitizeText('<script>')).toContain('&lt;');
  });

  it('escapes ">" to "&gt;"', () => {
    expect(sanitizeText('a > b')).toContain('&gt;');
  });

  it('escapes double quotes', () => {
    expect(sanitizeText('"hello"')).toContain('&quot;');
  });

  it('escapes single quotes', () => {
    expect(sanitizeText("it's")).toContain('&#039;');
  });

  it('leaves safe text unchanged', () => {
    expect(sanitizeText('Greek Yogurt Granola Bar')).toBe('Greek Yogurt Granola Bar');
  });
});
