import { Metadata } from "next";

const TITLE = "About Us | Genuine Optimum";
const DESCRIPTION =
    "How Genuine Optimum works: an engineering-first approach that treats web development, SEO, and custom software as one connected system, judged on real business outcomes rather than vanity metrics.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://genuineoptimum.com/about",
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/about" },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
