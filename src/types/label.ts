export type WarningLevel = 'low' | 'medium' | 'high';

export interface LabelTerm {
  id: string;
  term: string;
  icon: string;
  whatItUsuallyMeans: string;
  whatItDoesNotGuarantee: string;
  whatToCheckInstead: string;
  warningLevel: WarningLevel;
}

export interface LabelGuide {
  id: string;
  field: string;
  icon: string;
  whyItMatters: string;
  whatToLookFor: string;
  exampleInterpretation: string;
  tipText: string;
}

export interface SampleLabelData {
  productName: string;
  servingSize: string;
  servingsPerContainer: string;
  calories: number;
  totalFat: { value: number; unit: string; dv: number };
  saturatedFat: { value: number; unit: string; dv: number };
  transFat: { value: number; unit: string };
  cholesterol: { value: number; unit: string; dv: number };
  sodium: { value: number; unit: string; dv: number };
  totalCarbs: { value: number; unit: string; dv: number };
  dietaryFiber: { value: number; unit: string; dv: number };
  totalSugars: { value: number; unit: string };
  addedSugars: { value: number; unit: string; dv: number };
  protein: { value: number; unit: string };
  ingredients: string;
}
