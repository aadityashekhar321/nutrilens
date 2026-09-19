export type MetricGroup = 'key' | 'other';
export type PreferredDirection = 'lower' | 'higher' | 'context-dependent';

export interface NutritionMetric {
  id: string;
  displayName: string;
  shortName: string;
  unit: string;
  preferredDirection: PreferredDirection;
  group: MetricGroup;
  description: string;
  interpretationRule: string;
  colorClass: string;
}

export interface MetricComparison {
  metricId: string;
  displayName: string;
  unit: string;
  valueA: number | null;
  valueB: number | null;
  winner: 'a' | 'b' | 'tie' | 'unknown';
  margin: number | null;
  percentDiff: number | null;
  interpretation: string;
  preferredDirection: PreferredDirection;
}

export interface ComparisonChartData {
  metric: string;
  displayName: string;
  unit: string;
  foodA: number;
  foodB: number;
  foodAName: string;
  foodBName: string;
  winner: 'a' | 'b' | 'tie' | 'unknown';
}
