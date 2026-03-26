import { Metadata } from "next";

export const metadata: Metadata = {
    title: "High-Performance Website Development | Genuine Optimum",
    description: "Modern websites engineered for performance, conversion, and scalability. Expert React, Next.js, and E-commerce solutions.",
};

export default function WebDevLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
