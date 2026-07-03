import { Metadata } from "next";

const TITLE = "Industries We Work With | Genuine Optimum";
const DESCRIPTION =
    "Local service businesses, e-commerce brands, startups, technology companies, and professional services — see how our connected approach applies to your industry.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://genuineoptimum.com/industries",
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function IndustriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
