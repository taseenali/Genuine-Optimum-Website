// Lightweight in-memory sliding-window rate limiter.
//
// This is a courtesy speed bump against naive scripted abuse, NOT a real
// distributed limiter: state lives in process memory, resets on every
// serverless cold start, and each concurrent function instance keeps its
// own independent counter. Under load, the *effective* global limit is
// higher than the configured per-instance limit. That's an acceptable
// trade for a solo-founder, low-traffic marketing site. If real abuse
// ever shows up, the correct upgrade is Vercel's own Firewall / Rate
// Limiting feature, not a bigger version of this file.
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

    if (timestamps.length >= limit) {
        hits.set(key, timestamps);
        return true;
    }

    timestamps.push(now);
    hits.set(key, timestamps);
    return false;
}
