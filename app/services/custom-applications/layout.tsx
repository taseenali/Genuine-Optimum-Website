import { Metadata } from "next";
import { serviceJsonLd, serviceOpenGraph } from "@/lib/seo";

const TITLE = "Custom Application Engineering | Genuine Optimum";
const DESCRIPTION =
    "Custom software solutions that automate operations and enable digital products. Expert Mobile, Web, and SaaS development.";
const SLUG = "custom-applications";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: serviceOpenGraph(TITLE, DESCRIPTION, SLUG),
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: `/services/${SLUG}` },
};

const jsonLd = serviceJsonLd("Custom Software Development", DESCRIPTION, SLUG);

export default function CustomAppsLayout({
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
