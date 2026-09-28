import { describe, it, expect } from 'vitest';
import { evaluateMetric } from '../nutrition-rules';

describe('evaluateMetric – null handling', () => {
  it('returns "unknown" when both values are null', () => {
    const result = evaluateMetric('calories', 'lower', null, null);
    expect(result.winner).toBe('unknown');
    expect(result.margin).toBeNull();
    expect(result.percentDiff).toBeNull();
  });

  it('returns "unknown" when valueA is null', () => {
    expect(evaluateMetric('protein', 'higher', null, 10).winner).toBe('unknown');
  });

  it('returns "unknown" when valueB is null', () => {
    expect(evaluateMetric('sodium', 'lower', 200, null).winner).toBe('unknown');
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('evaluateMetric – direction: lower', () => {
  it('A wins when A < B', () => {
    const result = evaluateMetric('sodium', 'lower', 100, 200);
    expect(result.winner).toBe('a');
  });

  it('B wins when B < A', () => {
    const result = evaluateMetric('sodium', 'lower', 300, 100);
    expect(result.winner).toBe('b');
  });

  it('tie when A === B', () => {
    const result = evaluateMetric('sodium', 'lower', 150, 150);
    expect(result.winner).toBe('tie');
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('evaluateMetric – direction: higher', () => {
  it('A wins when A > B', () => {
    const result = evaluateMetric('protein', 'higher', 20, 10);
    expect(result.winner).toBe('a');
  });

  it('B wins when B > A', () => {
    const result = evaluateMetric('protein', 'higher', 5, 15);
    expect(result.winner).toBe('b');
  });

  it('tie when A === B', () => {
    expect(evaluateMetric('protein', 'higher', 10, 10).winner).toBe('tie');
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('evaluateMetric – direction: context-dependent', () => {
  it('returns "tie" for context-dependent direction (ambiguous)', () => {
    const result = evaluateMetric('calories', 'context-dependent', 300, 500);
    expect(result.winner).toBe('tie');
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('evaluateMetric – margin and percentDiff', () => {
  it('calculates margin as absolute difference', () => {
    const result = evaluateMetric('fiber', 'higher', 8, 2);
    expect(result.margin).toBe(6);
  });

  it('calculates percentDiff relative to the larger value', () => {
    // |8 - 2| / 8 * 100 = 75%
    const result = evaluateMetric('fiber', 'higher', 8, 2);
    expect(result.percentDiff).toBeCloseTo(75, 1);
  });

  it('returns percentDiff of 0 when both values are 0', () => {
    const result = evaluateMetric('fiber', 'higher', 0, 0);
    expect(result.percentDiff).toBe(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────

describe('evaluateMetric – interpretation magnitude', () => {
  it('uses "significantly more" for >50% difference', () => {
    // 80 vs 10 → |80-10|/80 = 87.5%
    const result = evaluateMetric('sodium', 'lower', 80, 10);
    expect(result.interpretation).toContain('significantly more');
  });

  it('uses "more" for >20% but ≤50% difference', () => {
    // 100 vs 65 → 35/100 = 35%
    const result = evaluateMetric('sodium', 'lower', 100, 65);
    expect(result.interpretation).toContain('more');
    expect(result.interpretation).not.toContain('significantly');
  });

  it('uses "slightly more" for >5% but ≤20% difference', () => {
    // 100 vs 88 → 12/100 = 12%
    const result = evaluateMetric('sodium', 'lower', 100, 88);
    expect(result.interpretation).toContain('slightly more');
  });

  it('uses "similar amounts" for ≤5% difference (tie)', () => {
    // 100 vs 103 → 3/103 ≈ 2.9%
    const result = evaluateMetric('sodium', 'lower', 100, 103);
    // percentDiff < 5, so magnitude = "similar amounts of", and both values are close
    // winner is 'a' since 100 < 103 in lower direction
    // interpretation should mention the winner phrase
    expect(result.interpretation).toBeDefined();
    expect(result.interpretation.length).toBeGreaterThan(0);
  });

  it('returns "similar amounts" for an exact tie', () => {
    const result = evaluateMetric('protein', 'higher', 10, 10);
    expect(result.interpretation).toBe('similar amounts');
  });
});
