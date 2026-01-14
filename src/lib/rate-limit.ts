/**
 * Simple in-memory rate limiter
 * 
 * NOTE: For production with multiple instances, use @upstash/ratelimit with Redis
 * This implementation works for single-instance deployments
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

interface RateLimitConfig {
  /** Maximum number of requests */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

/**
 * Check rate limit for a given identifier
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const key = identifier;

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // Create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: config.limit - 1,
      resetIn: config.windowSeconds,
    };
  }

  if (entry.count >= config.limit) {
    return {
      success: false,
      remaining: 0,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  entry.count++;
  return {
    success: true,
    remaining: config.limit - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Rate limit presets
 */
export const rateLimits = {
  // Lead submission: 5 per minute per IP
  leadSubmission: { limit: 5, windowSeconds: 60 },
  // Login attempts: 5 per 15 minutes per IP
  login: { limit: 5, windowSeconds: 15 * 60 },
  // API requests: 100 per minute per IP
  api: { limit: 100, windowSeconds: 60 },
} as const;

/**
 * Get client IP from headers (works with proxies)
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
