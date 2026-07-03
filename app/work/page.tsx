import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const TITLE = "Our Work | Genuine Optimum";
const DESCRIPTION =
    "Case studies from Genuine Optimum's web development, SEO, custom software, and AI & data systems engagements.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://genuineoptimum.com/work",
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function WorkPage() {
    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs items={[{ label: "Work", href: "/work" }]} />

                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Case Studies</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Work</h1>

                        <div className="py-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
                            <p className="text-gray-400 text-lg max-w-xl mx-auto">
                                We&apos;re putting together detailed write-ups of recent engagements. Check back soon,
                                or get in touch and we&apos;ll walk you through relevant examples directly.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                        >
                            Claim Free Consultation
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
