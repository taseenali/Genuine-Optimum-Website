export const SITE_URL = "https://genuineoptimum.com";
export const SITE_NAME = "Genuine Optimum";

export function serviceJsonLd(serviceType: string, description: string, slug: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType,
        description,
        url: `${SITE_URL}/services/${slug}`,
        provider: {
            "@type": "ProfessionalService",
            name: SITE_NAME,
            url: SITE_URL,
        },
    };
}

export function serviceOpenGraph(title: string, description: string, slug: string) {
    return {
        title,
        description,
        url: `${SITE_URL}/services/${slug}`,
        siteName: SITE_NAME,
        type: "website" as const,
    };
}

export function blogPostingJsonLd(
    title: string,
    description: string,
    slug: string,
    datePublished: string,
    dateModified?: string
) {
    const url = `${SITE_URL}/blog/${slug}`;
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified ?? datePublished,
        // Attributed to the organization, not an invented individual —
        // this project doesn't publish fabricated author identities.
        author: {
            "@type": "Organization",
            name: SITE_NAME,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/gologo.webp`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
    };
}
