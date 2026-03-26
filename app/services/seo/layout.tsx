import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search Visibility & SEO | Genuine Optimum",
    description: "Build long-term organic growth and attract high-quality customers with our expert SEO strategies and search visibility systems.",
};

export default function SEOLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
