import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI & Data Systems | Genuine Optimum",
    description: "Smarter decision-making powered by intelligent systems. We integrate AI and data into your operations for automation and insights.",
};

export default function AIDataLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
