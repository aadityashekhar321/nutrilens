export type { Food, FoodCategory, NutritionProfile, ServingSize } from './food';
export { FOOD_CATEGORY_LABELS } from './food';

export type {
  NutritionMetric,
  MetricGroup,
  PreferredDirection,
  MetricComparison,
  ComparisonChartData,
} from './nutrition';

export type {
  FoodInsightResponse,
  FoodInsightError,
  FoodInsightRequest,
  FoodInsightAPIResponse,
  InsightErrorCode,
} from './insight';

export type {
  LabelTerm,
  LabelGuide,
  SampleLabelData,
  WarningLevel,
} from './label';

export type {
  NutritionCulprit,
  AthleteMyth,
  MythCategory,
  FoodAlternative,
  EducationalSection,
  HealthHaloStep,
} from './education';
export { MYTH_CATEGORY_LABELS } from './education';

export type {
  FoodComparison,
  ComparisonResult,
  SearchResult,
  SearchResultType,
} from './comparison';
