import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { PRODUCTS } from "@/lib/products";

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
        "/capabilities",
        "/products",
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

    // Products sit just under the home page: they are the pages we most
    // want ranking, ahead of the marketing and content routes.
    const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
        url: `${BASE_URL}/products/${product.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
    }));

    const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudies().map((study) => ({
        url: `${BASE_URL}/work/${study.slug}`,
        lastModified: new Date(study.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticEntries, ...productEntries, ...blogEntries, ...caseStudyEntries];
}
