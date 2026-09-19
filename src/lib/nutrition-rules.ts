import { PreferredDirection } from '@/types';

export function evaluateMetric(
  metricId: string,
  preferredDirection: PreferredDirection,
  valueA: number | null,
  valueB: number | null
): { winner: 'a' | 'b' | 'tie' | 'unknown'; margin: number | null; percentDiff: number | null; interpretation: string } {
  if (valueA === null || valueB === null) {
    return { winner: 'unknown', margin: null, percentDiff: null, interpretation: 'unknown' };
  }

  const margin = Math.abs(valueA - valueB);
  const maxVal = Math.max(Math.abs(valueA), Math.abs(valueB));
  const percentDiff = maxVal === 0 ? 0 : (margin / maxVal) * 100;

  let winner: 'a' | 'b' | 'tie' = 'tie';
  
  if (valueA === valueB) {
    winner = 'tie';
  } else if (preferredDirection === 'lower') {
    winner = valueA < valueB ? 'a' : 'b';
  } else if (preferredDirection === 'higher') {
    winner = valueA > valueB ? 'a' : 'b';
  } else {
    // context-dependent
    winner = 'tie'; // default to tie for context dependent, as we can't definitively say one is better
  }

  let magnitude = 'similar amounts of';
  if (percentDiff > 50) {
    magnitude = 'significantly more';
  } else if (percentDiff > 20) {
    magnitude = 'more';
  } else if (percentDiff > 5) {
    magnitude = 'slightly more';
  }

  let interpretation = '';
  if (winner === 'tie') {
    interpretation = 'similar amounts';
  } else {
    const higher = valueA > valueB ? 'A' : 'B';
    const lower = valueA < valueB ? 'A' : 'B';
    
    if (preferredDirection === 'lower') {
      interpretation = `${higher} has ${magnitude} than ${lower}`;
    } else if (preferredDirection === 'higher') {
      interpretation = `${higher} provides ${magnitude} than ${lower}`;
    } else {
      interpretation = `${higher} has ${magnitude} than ${lower}`;
    }
  }

  return { winner, margin, percentDiff, interpretation };
}
