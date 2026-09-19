import { NextResponse } from 'next/server';
import { getFoodInsight } from '@/lib/ai-client';
import { validateFoodInsightInput, sanitizeText } from '@/lib/validators';
import { FoodInsightRequest, FoodInsightAPIResponse } from '@/types';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10;
const TIME_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps older than the time window
  const recentTimestamps = timestamps.filter(ts => now - ts < TIME_WINDOW_MS);
  
  if (recentTimestamps.length >= RATE_LIMIT) {
    return false;
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  
  // Periodically clean up the map to prevent memory leaks in a real app, 
  // but this is sufficient for a simple implementation
  
  return true;
}
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
               
    if (!checkRateLimit(ip)) {
      return NextResponse.json<FoodInsightAPIResponse>(
        { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
        { status: 429 }
      );
    }

    const body: Partial<FoodInsightRequest> = await request.json();
    
    if (!body.foodName) {
      return NextResponse.json<FoodInsightAPIResponse>(
        { success: false, error: { code: 'EMPTY_INPUT', message: 'Food name is required' } },
        { status: 400 }
      );
    }

    const validation = validateFoodInsightInput(body.foodName);
    if (!validation.isValid) {
      return NextResponse.json<FoodInsightAPIResponse>(
        { success: false, error: { code: 'EMPTY_INPUT', message: validation.error || 'Invalid input' } },
        { status: 400 }
      );
    }

    const sanitizedFoodName = sanitizeText(body.foodName);
    const sanitizedBrand = body.brand ? sanitizeText(body.brand) : undefined;

    const result = await getFoodInsight(sanitizedFoodName, sanitizedBrand);
    
    if (!result.success) {
      // Map AI errors to HTTP status codes
      const status = result.error?.code === 'AI_UNAVAILABLE' ? 503 : 500;
      return NextResponse.json<FoodInsightAPIResponse>(result, { status });
    }

    return NextResponse.json<FoodInsightAPIResponse>(result);
    
  } catch (error) {
    console.error('Food Insight API Error:', error);
    return NextResponse.json<FoodInsightAPIResponse>(
      { success: false, error: { code: 'UNKNOWN_ERROR', message: 'An unexpected error occurred' } },
      { status: 500 }
    );
  }
}
