import { FoodInsightResponse } from '@/types';

export function validateFoodInsightInput(input: string): { isValid: boolean; error?: string } {
  if (!input || input.trim() === '') {
    return { isValid: false, error: 'Food name is required' };
  }

  if (input.length > 200) {
    return { isValid: false, error: 'Input is too long (maximum 200 characters)' };
  }

  // Basic check for suspicious characters (very simple XSS prevention on input)
  const suspiciousPattern = /[<>{}()]/;
  if (suspiciousPattern.test(input)) {
    return { isValid: false, error: 'Input contains invalid characters' };
  }

  return { isValid: true };
}

export function validateAIResponse(data: any): data is FoodInsightResponse {
  if (!data || typeof data !== 'object' || data === null) return false;

  const requiredStringFields = [
    'foodName',
    'summary',
    'betterChoiceGuidance',
    'importantCaveat'
  ];

  for (const field of requiredStringFields) {
    if (typeof data[field] !== 'string' || data[field].trim() === '') return false;
  }

  const requiredArrayFields = [
    'likelyMarketingClaims',
    'potentialConcerns',
    'whatToCheckOnLabel'
  ];

  for (const field of requiredArrayFields) {
    if (!Array.isArray(data[field]) || data[field].length === 0) return false;
    // Ensure every element is a non-empty string
    if (!data[field].every((item: unknown) => typeof item === 'string' && (item as string).trim() !== '')) return false;
  }

  if (!['low', 'medium', 'high', 'unclear'].includes(data.healthHaloRisk)) {
    return false;
  }

  // Explicit null guard — typeof null === 'object' in JS
  if (
    !data.nutritionalHighlights ||
    typeof data.nutritionalHighlights !== 'object' ||
    data.nutritionalHighlights === null ||
    Array.isArray(data.nutritionalHighlights)
  ) {
    return false;
  }

  const highlightFields = ['sugar', 'protein', 'fiber', 'sodium', 'fat'];
  for (const field of highlightFields) {
    if (typeof data.nutritionalHighlights[field] !== 'string' || data.nutritionalHighlights[field].trim() === '') return false;
  }

  return true;
}

export function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
