import type { MetadataRoute } from "next";

const BASE_URL = "https://genuineoptimum.com";

export default function robots(): MetadataRoute.Robots {
    return {
        // Allow-all by default, including AI training crawlers (GPTBot,
        // ClaudeBot, CCBot, etc.) as well as AI search/answer-engine
        // crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot,
        // Google-Extended, etc.). This is intentional, not an oversight.
        //
        // The 2026 industry-common posture is "block training, allow
        // search" (opt out of training while staying eligible for
        // AI-search citations, via each provider's separate training vs.
        // search user-agent tokens). That pattern is for sites that don't
        // want their content used for model training. This site's explicit
        // goal is the opposite: being cited by AI answer engines depends
        // on those models actually knowing about the site, which training
        // access supports. Do NOT "fix" this into an opt-out split without
        // revisiting that goal first.
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
