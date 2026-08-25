import { Metadata } from "next";
import { serviceJsonLd, serviceOpenGraph } from "@/lib/seo";

const TITLE = "High-Performance Website Development | Genuine Optimum";
const DESCRIPTION =
    "Modern websites engineered for performance, conversion, and scalability. Expert React, Next.js, and E-commerce solutions.";
const SLUG = "web-development";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: serviceOpenGraph(TITLE, DESCRIPTION, SLUG),
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: `/services/${SLUG}` },
};

const jsonLd = serviceJsonLd("Web Development", DESCRIPTION, SLUG);

export default function WebDevLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
        </>
    );
}
