import { FiMapPin, FiShoppingCart, FiSend, FiCpu, FiBriefcase } from "react-icons/fi";

export interface IndustrySummary {
    slug: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

export const INDUSTRIES: IndustrySummary[] = [
    {
        slug: "local-service-businesses",
        title: "Local Service Businesses",
        description:
            "Plumbers, clinics, law firms, and agencies that need to dominate local search and convert nearby customers.",
        icon: <FiMapPin className="w-7 h-7" />,
    },
    {
        slug: "e-commerce-brands",
        title: "E-Commerce Brands",
        description:
            "Online stores looking to scale with optimized storefronts, automated fulfillment, and data-driven marketing.",
        icon: <FiShoppingCart className="w-7 h-7" />,
    },
    {
        slug: "startups",
        title: "Startups",
        description:
            "Early-stage companies that need to move fast, from MVP development to growth infrastructure.",
        icon: <FiSend className="w-7 h-7" />,
    },
    {
        slug: "technology-companies",
        title: "Technology Companies",
        description:
            "SaaS platforms, dev tools, and tech firms needing scalable architecture, AI integration, and technical SEO.",
        icon: <FiCpu className="w-7 h-7" />,
    },
    {
        slug: "professional-services",
        title: "Professional Services",
        description:
            "Consulting firms, financial advisors, and B2B companies that need credibility online and efficient client systems.",
        icon: <FiBriefcase className="w-7 h-7" />,
    },
];
