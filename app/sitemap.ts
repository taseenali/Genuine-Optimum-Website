import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://genuineoptimum.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes = [
        "",
        "/about",
        "/contact",
        "/blog",
        "/privacy",
        "/terms",
        "/services",
        "/services/seo",
        "/services/web-development",
        "/services/custom-applications",
        "/services/ai-data-systems",
        "/industries",
        "/faq",
        "/work",
    ];

    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
    }));

    const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...staticEntries, ...blogEntries];
}
