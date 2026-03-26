import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Custom Application Engineering | Genuine Optimum",
    description: "Custom software solutions that automate operations and enable digital products. Expert Mobile, Web, and SaaS development.",
};

export default function CustomAppsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
