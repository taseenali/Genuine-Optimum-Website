import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CaseStudyBody from "@/components/CaseStudyBody";
import CaseStudyModalRoute from "@/components/CaseStudyModalRoute";
import { getAllCaseStudies, getCaseStudySource } from "@/lib/caseStudies";
import { caseStudyJsonLd } from "@/lib/seo";

export function generateStaticParams() {
    return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudySource(slug);
    if (!study) return {};

    const title = `${study.meta.title} | Genuine Optimum Work`;
    return {
        title,
        description: study.meta.summary,
        openGraph: {
            title,
            description: study.meta.summary,
            url: `https://genuineoptimum.com/work/${slug}`,
            siteName: "Genuine Optimum",
            type: "article",
        },
        twitter: { card: "summary_large_image", title, description: study.meta.summary },
        alternates: { canonical: `/work/${slug}` },
    };
}

export default async function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const study = getCaseStudySource(slug);
    if (!study) notFound();

    const { meta, content } = study;

    const jsonLd = caseStudyJsonLd(meta.title, meta.summary, slug, meta.date, meta.dateModified);

    // standaloneHtml case studies render as the same fixed-overlay modal
    // used from /work, so a direct link or a page refresh looks identical
    // to clicking through from the work grid rather than falling back to a
    // differently-styled full page underneath it.
    if (meta.standaloneHtml) {
        return (
            <div className="relative min-h-screen bg-black text-white font-sans w-full">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow" />
                    <Footer />
                </div>
                <CaseStudyModalRoute src={meta.standaloneHtml} />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs
                        items={[
                            { label: "Work", href: "/work" },
                            { label: meta.title, href: `/work/${slug}` },
                        ]}
                    />

                    <div className="max-w-3xl mx-auto">
                        <CaseStudyBody meta={meta} content={content} />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
