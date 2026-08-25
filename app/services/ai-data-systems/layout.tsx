import { Metadata } from "next";
import { serviceJsonLd, serviceOpenGraph } from "@/lib/seo";

const TITLE = "AI & Data Systems | Genuine Optimum";
const DESCRIPTION =
    "Smarter decision-making powered by intelligent systems. We integrate AI and data into your operations for automation and insights.";
const SLUG = "ai-data-systems";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: serviceOpenGraph(TITLE, DESCRIPTION, SLUG),
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: `/services/${SLUG}` },
};

const jsonLd = serviceJsonLd("AI & Data Systems", DESCRIPTION, SLUG);

export default function AIDataLayout({
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
