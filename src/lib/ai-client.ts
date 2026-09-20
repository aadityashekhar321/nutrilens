import { GoogleGenerativeAI } from '@google/generative-ai';
import { FoodInsightResponse, FoodInsightAPIResponse } from '@/types';
import { validateAIResponse } from './validators';

export async function getFoodInsight(foodName: string, brand?: string): Promise<FoodInsightAPIResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: { code: 'AI_UNAVAILABLE', message: 'API key not configured' }
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
You are a nutrition expert analyzing foods to help users understand what they are actually eating. 
Analyze the following food item:
Food Name: ${foodName}
${brand ? `Brand: ${brand}` : ''}

Provide your analysis strictly as a JSON object matching this TypeScript interface exactly:
interface FoodInsightResponse {
  foodName: string; // The standardized name of the food
  summary: string; // A 2-3 sentence summary of the food's nutritional profile
  healthHaloRisk: 'low' | 'medium' | 'high' | 'unclear'; // How likely is it perceived as healthier than it is?
  likelyMarketingClaims: string[]; // 2-3 claims often made about this food (e.g. "Natural", "Low Fat")
  potentialConcerns: string[]; // 2-3 things to watch out for (e.g. "Added sugars", "High sodium")
  nutritionalHighlights: {
    sugar: string; // e.g. "High (mostly added)" or "Low"
    protein: string;
    fiber: string;
    sodium: string;
    fat: string;
  };
  whatToCheckOnLabel: string[]; // 1-3 specific things to look for in the ingredients or nutrition facts
  betterChoiceGuidance: string; // 1-2 sentences on what a better alternative might be
  importantCaveat: string; // A note distinguishing estimates vs verified data, e.g., "This is an estimate for generic ${foodName}, check the label for exact values."
}

Respond ONLY with the JSON object. Do not include markdown code blocks or any other text.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting if the model still includes it despite instructions
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (e) {
      return {
        success: false,
        error: { code: 'MALFORMED_RESPONSE', message: 'Failed to parse AI response as JSON' }
      };
    }

    if (!validateAIResponse(parsedData)) {
      return {
        success: false,
        error: { code: 'MALFORMED_RESPONSE', message: 'AI response did not match expected schema' }
      };
    }

    return {
      success: true,
      data: parsedData
    };
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: 'Failed to communicate with AI service' }
    };
  }
}
