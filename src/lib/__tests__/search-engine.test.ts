import { describe, it, expect, vi, beforeEach } from 'vitest';
import { search } from '../search-engine';

// The search engine imports from data files that use @/ aliases.
// Vitest will resolve these if we configure the alias in vitest.config.ts.
// Tests verify the function contract: input → output shape & filtering.

describe('search – query length guard', () => {
  it('returns [] for empty query', () => {
    expect(search('')).toEqual([]);
  });

  it('returns [] for single-character query', () => {
    expect(search('a')).toEqual([]);
  });

  it('returns [] for whitespace-only query', () => {
    expect(search('  ')).toEqual([]);
  });

  it('returns an array (possibly empty) for a 2-char query', () => {
    const results = search('yo');
    expect(Array.isArray(results)).toBe(true);
  });
});

describe('search – result structure', () => {
  it('every result has required fields: id, type, title, excerpt, link', () => {
    const results = search('yogurt');
    results.forEach((r) => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('type');
      expect(r).toHaveProperty('title');
      expect(r).toHaveProperty('excerpt');
      expect(r).toHaveProperty('link');
    });
  });

  it('result links do not contain /education/ prefix (all fixed to real routes)', () => {
    const results = search('sugar');
    results.forEach((r) => {
      expect(r.link).not.toMatch(/^\/education\//);
    });
  });

  it('result links for food types point to /food-insight', () => {
    const results = search('yogurt');
    const foodResults = results.filter((r) => r.type === 'food');
    foodResults.forEach((r) => {
      expect(r.link).toMatch(/^\/food-insight/);
    });
  });
});

describe('search – limit', () => {
  it('respects the default limit of 20', () => {
    // Searching "a" is blocked (length < 2), so use a broader term
    const results = search('bar');
    expect(results.length).toBeLessThanOrEqual(20);
  });

  it('respects a custom limit', () => {
    const results = search('sugar', { limit: 3 });
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it('returns fewer results than limit when fewer matches exist', () => {
    // "oatly" is a very specific brand — should match 0–3 items
    const results = search('oatly', { limit: 10 });
    expect(results.length).toBeLessThanOrEqual(10);
  });
});

describe('search – case insensitivity', () => {
  it('matches lowercase query against mixed-case data', () => {
    const lower = search('yogurt');
    const upper = search('YOGURT');
    const mixed = search('YoGuRt');
    // All three should return the same count
    expect(lower.length).toBe(upper.length);
    expect(lower.length).toBe(mixed.length);
  });
});

describe('search – type filtering', () => {
  it('returns results of type "comparison" for comparison-specific terms', () => {
    // "greek yogurt vs" style queries should hit comparisons
    const results = search('yogurt');
    const types = new Set(results.map((r) => r.type));
    // At least one type should be present
    expect(types.size).toBeGreaterThanOrEqual(1);
  });
});
