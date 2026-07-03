import type { NextConfig } from "next";

// Static security headers, applied to every route. A static (non-nonce)
// CSP is used here deliberately: nonce-based CSP requires per-request
// dynamic rendering (a nonce must be unique every request), which would
// force this entire statically-generated site into dynamic rendering —
// a bad trade for a marketing site with no other reason to need it.
//
// `script-src` must include 'unsafe-inline': Next.js App Router injects
// its own inline hydration bootstrap scripts (`self.__next_f.push(...)`)
// on every single page — this is unavoidable and unrelated to any code
// in this app. Verified empirically: a strict `script-src 'self'` with
// no 'unsafe-inline' blocks these and breaks hydration site-wide. This
// is a known, common limitation for static Next.js apps without nonce
// middleware, not a gap specific to this codebase. All other directives
// stay strict (no third-party origins, no eval, frame-ancestors none,
// object-src none) — this still blocks arbitrary third-party/injected
// <script src="..."> loading, which is real, meaningful protection even
// without full inline-script XSS coverage.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // va.vercel-scripts.com / cdn.vercel-insights.com are @vercel/analytics'
      // script-loading origins (dev and production respectively — verified
      // empirically; Vercel's platform proxies analytics through /_vercel/*
      // on the deployed domain, but the client script itself still loads
      // from these origins directly rather than being fully same-origin).
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.vercel-insights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Strict-Transport-Security is intentionally not set here — Vercel
  // applies HSTS at the platform/edge level by default. Verify with
  // `curl -I` against the live production URL rather than duplicating it
  // here (a conflicting/duplicate header is worse than none).
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
