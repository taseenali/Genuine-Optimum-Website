import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCaseStudies, resolveClientLabel } from "@/lib/caseStudies";
import { SERVICES } from "@/lib/services";

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
    alternates: { canonical: "/work" },
};

function serviceLabel(slug: string): string {
    return SERVICES.find((s) => s.slug === slug)?.shortTitle ?? slug;
}

export default function WorkPage() {
    const studies = getAllCaseStudies();

    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs items={[{ label: "Work", href: "/work" }]} />

                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Case Studies</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Our Work</h1>
                        </div>

                        {studies.length === 0 ? (
                            <div className="text-center py-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
                                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                                    We&apos;re putting together detailed write-ups of recent engagements. Check back soon,
                                    or get in touch and we&apos;ll walk you through relevant examples directly.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 mb-10">
                                {studies.map((study) => {
                                    const clientLabel = resolveClientLabel(study);
                                    return (
                                        <Link
                                            key={study.slug}
                                            href={`/work/${study.slug}`}
                                            className="group block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-colors duration-300 hover:border-purple-500/40 hover:bg-white/10"
                                        >
                                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                                {study.title}
                                            </h2>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-3">{study.summary}</p>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600 text-xs">
                                                {clientLabel && <span>{clientLabel}</span>}
                                                {study.services.map((slug) => (
                                                    <span key={slug} className="text-purple-400/70">{serviceLabel(slug)}</span>
                                                ))}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
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
