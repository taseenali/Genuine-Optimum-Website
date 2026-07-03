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
            "Modern websites engineered for performance, conversion, and scalability — built with React, Next.js, and e-commerce platforms.",
    },
    {
        slug: "custom-applications",
        title: "Custom Application Engineering",
        shortTitle: "Custom Applications",
        description:
            "Custom software solutions that automate operations and enable digital products — mobile, web, and SaaS platforms.",
    },
    {
        slug: "ai-data-systems",
        title: "AI & Data Systems",
        shortTitle: "AI & Data Systems",
        description:
            "Smarter decision-making powered by intelligent systems — AI integration, automation, and data infrastructure.",
    },
];
