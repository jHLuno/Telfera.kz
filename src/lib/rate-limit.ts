/**
 * Simple in-memory rate limiter
 * 
 * ⚠️ LIMITATIONS:
 * - Data is lost on server restart/redeploy
 * - Not shared across multiple server instances (horizontal scaling)
 * - Memory grows with unique identifiers (IPs, emails)
 * 
 * For production with multiple instances, consider:
 * - @upstash/ratelimit with Redis (serverless-friendly)
 * - Redis with ioredis
 * - PostgreSQL-based rate limiting
 * 
 * This implementation is suitable for:
 * - Single-instance deployments
 * - Development/staging environments
 * - Low-traffic applications
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Using WeakRef-friendly Map for better memory management
const rateLimitStore = new Map<string, RateLimitEntry>();

// Track store size for monitoring
let lastCleanupSize = 0;

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
        cleanedCount++;
      }
    }
    
    // Log if store is growing significantly (potential memory issue)
    const currentSize = rateLimitStore.size;
    if (currentSize > 10000 && currentSize > lastCleanupSize * 1.5) {
      console.warn(`[RateLimit] Store size: ${currentSize} entries. Consider using Redis.`);
    }
    lastCleanupSize = currentSize;
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
