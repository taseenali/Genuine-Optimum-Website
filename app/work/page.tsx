import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WorkGrid, { WorkCard } from "@/components/WorkGrid";
import { getAllCaseStudies, resolveClientLabel } from "@/lib/caseStudies";

const TITLE = "Our Work | Genuine Optimum";
const DESCRIPTION =
    "Website templates and products built by Genuine Optimum: web development, SEO, custom software, and AI & data systems engagements.";

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
    alternates: { canonical: "/work" },
};

function toCard(study: ReturnType<typeof getAllCaseStudies>[number]): WorkCard {
    return {
        slug: study.slug,
        title: study.title,
        summary: study.summary,
        services: study.services,
        clientLabel: resolveClientLabel(study),
        standaloneHtml: study.standaloneHtml,
        coverImage: study.coverImage,
    };
}

export default function WorkPage() {
    const studies = getAllCaseStudies();
    const templates = studies.filter((s) => s.kind === "template").map(toCard);
    const products = studies.filter((s) => s.kind === "product").map(toCard);

    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs items={[{ label: "Work", href: "/work" }]} />

                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Our Work</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Templates &amp; Products</h1>
                        </div>

                        {studies.length === 0 ? (
                            <div className="text-center py-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
                                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                                    We&apos;re putting together detailed write-ups of recent engagements. Check back soon,
                                    or get in touch and we&apos;ll walk you through relevant examples directly.
                                </p>
                            </div>
                        ) : (
                            <WorkGrid products={products} templates={templates} />
                        )}

                        <div className="text-center">
                            <Link
                                href="/contact"
                                className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                            >
                                Claim Free Consultation
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
