import { MetricComparison } from '@/types';

export function generateExplanation(
  comparisons: MetricComparison[],
  foodAName: string,
  foodBName: string
): string {
  if (!comparisons || comparisons.length === 0) {
    return 'No metrics available for comparison.';
  }

  const statements: string[] = [];
  const notableDifferences = comparisons.filter(c => c.winner !== 'tie' && c.winner !== 'unknown' && c.percentDiff !== null && c.percentDiff > 10);

  if (notableDifferences.length === 0) {
    return `${foodAName} and ${foodBName} have very similar nutritional profiles based on the selected metrics.`;
  }

  // Sort by largest percentage difference to highlight the most significant changes
  notableDifferences.sort((a, b) => (b.percentDiff || 0) - (a.percentDiff || 0));

  // Take top 3 notable differences
  const topDifferences = notableDifferences.slice(0, 3);

  topDifferences.forEach((comp, index) => {
    const winnerName = comp.winner === 'a' ? foodAName : foodBName;
    const loserName = comp.winner === 'a' ? foodBName : foodAName;
    const higherName = (comp.valueA ?? 0) > (comp.valueB ?? 0) ? foodAName : foodBName;
    const lowerName = higherName === foodAName ? foodBName : foodAName;
    
    // Using magnitude of difference
    if (comp.percentDiff && comp.percentDiff > 150 && (comp.valueB !== 0 && comp.valueA !== 0)) {
      const multiplier = Math.round(Math.max(comp.valueA || 0, comp.valueB || 0) / Math.max(1, Math.min(comp.valueA || 0, comp.valueB || 0)));
      statements.push(`${higherName} has ${multiplier}× more ${comp.displayName.toLowerCase()} than ${lowerName}.`);
    } else if (comp.margin) {
      if (comp.preferredDirection === 'higher') {
         statements.push(`${higherName} provides ${comp.margin}${comp.unit} more ${comp.displayName.toLowerCase()} than ${lowerName}.`);
      } else {
         statements.push(`${higherName} contains ${comp.margin}${comp.unit} more ${comp.displayName.toLowerCase()} than ${lowerName}.`);
      }
    }
  });

  const ties = comparisons.filter(c => c.winner === 'tie');
  if (ties.length > 0) {
    const tieNames = ties.map(t => t.displayName.toLowerCase()).join(' and ');
    statements.push(`Both contain similar amounts of ${tieNames}.`);
  }

  return statements.join(' ');
}
