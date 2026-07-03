export interface ServiceSummary {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
}

export const SERVICES: ServiceSummary[] = [
    {
        slug: "seo",
        title: "Search Visibility & SEO",
        shortTitle: "SEO",
        description:
            "Build long-term organic growth and attract high-quality customers with expert SEO strategies and search visibility systems.",
    },
    {
        slug: "web-development",
        title: "High-Performance Website Development",
        shortTitle: "Web Development",
        description:
            "Modern websites built with React and Next.js, engineered for performance, conversion, and scale, including e-commerce platforms.",
    },
    {
        slug: "custom-applications",
        title: "Custom Application Engineering",
        shortTitle: "Custom Applications",
        description:
            "Custom software that automates operations and powers digital products, across mobile, web, and SaaS platforms.",
    },
    {
        slug: "ai-data-systems",
        title: "AI & Data Systems",
        shortTitle: "AI & Data Systems",
        description:
            "Smarter decision-making through AI integration, automation, and data infrastructure built to fit how you operate.",
    },
];
