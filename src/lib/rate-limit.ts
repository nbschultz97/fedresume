// Simple in-memory rate limiter (resets on deploy/restart — fine for Vercel serverless)
const rateLimitConfigs = {
  default: { windowMs: 60 * 1000, maxRequests: 5 },
  'free-generation': { windowMs: 60 * 1000, maxRequests: 3 }, // More restrictive for free tier
  'docx-download': { windowMs: 60 * 1000, maxRequests: 10 }, // More generous for paid downloads
  'checkout': { windowMs: 60 * 1000, maxRequests: 5 },
};

const rateLimitData = new Map<string, { count: number; resetAt: number }>();

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  rateLimitData.forEach((data, key) => {
    if (now > data.resetAt) {
      rateLimitData.delete(key);
    }
  });
}, 5 * 60 * 1000);

export function checkRateLimit(ip: string, operation: keyof typeof rateLimitConfigs = 'default'): { allowed: boolean; retryAfterMs?: number } {
  const config = rateLimitConfigs[operation];
  const key = `${ip}:${operation}`;
  const now = Date.now();
  const entry = rateLimitData.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitData.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true };
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true };
}
