export interface FoodInsightResponse {
  foodName: string;
  summary: string;
  healthHaloRisk: 'low' | 'medium' | 'high' | 'unclear';
  likelyMarketingClaims: string[];
  potentialConcerns: string[];
  nutritionalHighlights: {
    sugar: string;
    protein: string;
    fiber: string;
    sodium: string;
    fat: string;
  };
  whatToCheckOnLabel: string[];
  betterChoiceGuidance: string;
  importantCaveat: string;
}

export type InsightErrorCode =
  | 'EMPTY_INPUT'
  | 'INPUT_TOO_LONG'
  | 'RATE_LIMITED'
  | 'AI_UNAVAILABLE'
  | 'MALFORMED_RESPONSE'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface FoodInsightError {
  code: InsightErrorCode;
  message: string;
}

export interface FoodInsightRequest {
  foodName: string;
  brand?: string;
}

export interface FoodInsightAPIResponse {
  success: boolean;
  data?: FoodInsightResponse;
  error?: FoodInsightError;
}
