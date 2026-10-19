import type { NextConfig } from "next";

// Static security headers, applied to every route. A static (non-nonce)
// CSP is used here deliberately: nonce-based CSP requires per-request
// dynamic rendering (a nonce must be unique every request), which would
// force this entire statically-generated site into dynamic rendering,
// a bad trade for a marketing site with no other reason to need it.
//
// `script-src` must include 'unsafe-inline': Next.js App Router injects
// its own inline hydration bootstrap scripts (`self.__next_f.push(...)`)
// on every single page: this is unavoidable and unrelated to any code
// in this app. Verified empirically: a strict `script-src 'self'` with
// no 'unsafe-inline' blocks these and breaks hydration site-wide. This
// is a known, common limitation for static Next.js apps without nonce
// middleware, not a gap specific to this codebase. All other directives
// stay strict (no third-party origins, no eval, frame-ancestors none,
// object-src none): this still blocks arbitrary third-party/injected
// <script src="..."> loading, which is real, meaningful protection even
// without full inline-script XSS coverage.
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // va.vercel-scripts.com / cdn.vercel-insights.com are @vercel/analytics'
      // script-loading origins (dev and production respectively, verified
      // empirically; Vercel's platform proxies analytics through /_vercel/*
      // on the deployed domain, but the client script itself still loads
      // from these origins directly rather than being fully same-origin).
      // 'unsafe-eval' is added only in dev: Next.js/React's dev-mode
      // debugging (HMR, stack reconstruction) requires eval(); production
      // builds never use it, so it's dropped from the prod CSP below.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://cdn.vercel-insights.com`,
      // fonts.googleapis.com/fonts.gstatic.com: the /work case-study embeds
      // (public/case-study-html/*.html, framed via iframe) each carry their
      // own Google Fonts link to preserve that portfolio's real typography
      // rather than falling back to the site's own fonts.
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data:",
      "font-src 'self' https://fonts.gstatic.com",
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
  // Strict-Transport-Security is intentionally not set here: Vercel
  // applies HSTS at the platform/edge level by default. Verify with
  // `curl -I` against the live production URL rather than duplicating it
  // here (a conflicting/duplicate header is worse than none).
];

// The case-study embeds (public/case-study-html/*.html) are framed via
// <iframe> from our own /work pages. The blanket policy above sets
// frame-ancestors 'none' and X-Frame-Options: DENY, which would block that
// same-origin framing too - Next.js applies header rules additively per
// path, so a same-key override on a second matching rule doesn't replace
// the first, it stacks (and CSP/X-Frame-Options enforce the union, i.e.
// the most restrictive result). The catch-all below excludes this path so
// only the same-origin-permissive block underneath applies to it.
// The General Contracting case study is a different export shape than the
// other embeds (a self-executing "bundler" that reconstructs its DOM at
// runtime: it loads its own scripts from blob: URLs it creates itself, and
// its embedded fonts are inlined as data: URIs) - both schemes need
// allowing on script-src/font-src for that one to run, scoped to this path.
const caseStudyEmbedHeaders = securityHeaders.map((header) => {
  if (header.key === "Content-Security-Policy") {
    return {
      ...header,
      value: header.value
        .replace("frame-ancestors 'none'", "frame-ancestors 'self'")
        .replace(/script-src ([^;]+)/, (_match, rest) => `script-src ${rest} blob:`)
        .replace(
          "font-src 'self' https://fonts.gstatic.com",
          "font-src 'self' https://fonts.gstatic.com data: blob:"
        ),
    };
  }
  if (header.key === "X-Frame-Options") {
    return { ...header, value: "SAMEORIGIN" };
  }
  return header;
});

// Videos and the case-study images are large and rarely change, but their
// file names are not content-hashed like the app's own JavaScript, so they
// cannot be cached forever. A day in the browser, then a week of serving the
// old copy while a fresh one is fetched, keeps repeat visits off the network
// and still picks up a replaced file within a day. Next's default for files
// in /public is max-age=0, which makes the browser ask again every time.
const assetCacheHeaders = [
  { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework in a response header.
  poweredByHeader: false,
  // Put the (small, 10 KB gzipped) stylesheet in the page itself instead of
  // as a separate render-blocking request, so the first paint does not wait
  // for a CSS round trip.
  async headers() {
    return [
      { source: "/videos/:path*", headers: assetCacheHeaders },
      { source: "/gologo.webp", headers: assetCacheHeaders },
      { source: "/icon-:size.png", headers: assetCacheHeaders },
      { source: "/icon-maskable-:size.png", headers: assetCacheHeaders },
      { source: "/case-study-html/thumbnails/:path*", headers: assetCacheHeaders },
      { source: "/case-study-html/kit-builder-catalogue/:path*", headers: assetCacheHeaders },
      {
        source: "/case-study-html/:path*",
        headers: caseStudyEmbedHeaders,
      },
      {
        source: "/((?!case-study-html/).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
