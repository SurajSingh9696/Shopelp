const bucket = new Map();

export function rateLimit({ key, windowMs, max }) {
  const now = Date.now();
  const entry = bucket.get(key) || { count: 0, reset: now + windowMs };

  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + windowMs;
  }

  entry.count += 1;
  bucket.set(key, entry);

  return {
    allowed: entry.count <= max,
    remaining: Math.max(max - entry.count, 0),
    reset: entry.reset
  };
}
