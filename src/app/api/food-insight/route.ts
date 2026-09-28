import { NextResponse } from 'next/server';
import { getFoodInsight } from '@/lib/ai-client';
import { validateFoodInsightInput } from '@/lib/validators';
import { FoodInsightRequest, FoodInsightAPIResponse } from '@/types';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// --- Production Rate Limiter (Upstash Redis) ---
// Recommended for serverless/edge environments
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const upstashRatelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
    })
  : null;

// ─── Sliding-Window In-Memory Rate Limiter ───────────────────────────────────
// Note: This is per-instance. For multi-instance deployments (e.g. Vercel Edge),
// consider an external store like Upstash Redis via @upstash/ratelimit.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10;
const TIME_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_MAP_ENTRIES = 5_000;

function extractClientIp(request: Request): string {
  // x-forwarded-for can be a comma-separated list; take the first (client) IP only
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkFallbackRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter((ts) => now - ts < TIME_WINDOW_MS);

  if (recentTimestamps.length >= RATE_LIMIT) return false;

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  // Periodically purge stale entries to prevent unbounded memory growth
  if (rateLimitMap.size > MAX_MAP_ENTRIES) {
    for (const [key, tsList] of rateLimitMap.entries()) {
      if (tsList.every((ts) => now - ts >= TIME_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return true;
}

// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = extractClientIp(request);

    // Apply Rate Limiting: Dual approach (Upstash Redis -> In-Memory Fallback)
    if (upstashRatelimit) {
      const { success, limit, remaining, reset } = await upstashRatelimit.limit(ip);
      if (!success) {
        return NextResponse.json<FoodInsightAPIResponse>(
          { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
          {
            status: 429,
            headers: {
              'Retry-After': '60',
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString()
            },
          }
        );
      }
    } else {
      if (!checkFallbackRateLimit(ip)) {
        return NextResponse.json<FoodInsightAPIResponse>(
          { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
          {
            status: 429,
            headers: { 'Retry-After': '60' },
          }
        );
      }
    }

    const body: Partial<FoodInsightRequest> = await request.json();

    if (!body.foodName) {
      return NextResponse.json<FoodInsightAPIResponse>(
        { success: false, error: { code: 'EMPTY_INPUT', message: 'Food name is required' } },
        { status: 400 }
      );
    }

    // Validate foodName
    const foodValidation = validateFoodInsightInput(body.foodName);
    if (!foodValidation.isValid) {
      return NextResponse.json<FoodInsightAPIResponse>(
        { success: false, error: { code: 'EMPTY_INPUT', message: foodValidation.error || 'Invalid food name' } },
        { status: 400 }
      );
    }

    // Validate brand if provided (max 100 chars, no suspicious chars)
    if (body.brand) {
      if (body.brand.length > 100) {
        return NextResponse.json<FoodInsightAPIResponse>(
          { success: false, error: { code: 'EMPTY_INPUT', message: 'Brand name is too long (maximum 100 characters)' } },
          { status: 400 }
        );
      }
      const suspiciousPattern = /[<>{}()]/;
      if (suspiciousPattern.test(body.brand)) {
        return NextResponse.json<FoodInsightAPIResponse>(
          { success: false, error: { code: 'EMPTY_INPUT', message: 'Brand name contains invalid characters' } },
          { status: 400 }
        );
      }
    }

    const sanitizedFoodName = body.foodName.trim();
    const sanitizedBrand = body.brand ? body.brand.trim() : undefined;

    const result = await getFoodInsight(sanitizedFoodName, sanitizedBrand);

    if (!result.success) {
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
