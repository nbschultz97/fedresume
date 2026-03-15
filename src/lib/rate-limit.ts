// Simple in-memory rate limiter (resets on deploy/restart — fine for Vercel serverless)
const windowMs = 60 * 1000; // 1 minute window
const maxRequests = 5; // max requests per IP per window

const ipRequests = new Map<string, { count: number; resetAt: number }>();

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequests.entries()) {
    if (now > data.resetAt) {
      ipRequests.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true };
}
