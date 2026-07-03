import { Metadata } from "next";
import { serviceJsonLd, serviceOpenGraph } from "@/lib/seo";

const TITLE = "Search Visibility & SEO | Genuine Optimum";
const DESCRIPTION =
    "Build long-term organic growth and attract high-quality customers with our expert SEO strategies and search visibility systems.";
const SLUG = "seo";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: serviceOpenGraph(TITLE, DESCRIPTION, SLUG),
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const jsonLd = serviceJsonLd("SEO", DESCRIPTION, SLUG);

export default function SEOLayout({
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
