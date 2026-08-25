import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCaseStudies, getCaseStudySource, resolveClientLabel } from "@/lib/caseStudies";
import { caseStudyJsonLd } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

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

function serviceLabel(slug: string): string {
    return SERVICES.find((s) => s.slug === slug)?.shortTitle ?? slug;
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
    const clientLabel = resolveClientLabel(meta);

    const jsonLd = caseStudyJsonLd(meta.title, meta.summary, slug, meta.date, meta.dateModified);

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

                    <article className="max-w-3xl mx-auto">
                        <div className="mb-10">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-4">
                                {clientLabel && <span className="text-gray-400">{clientLabel}</span>}
                                {meta.industry && <span className="text-gray-600">· {meta.industry}</span>}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{meta.title}</h1>
                            <div className="flex flex-wrap gap-2">
                                {meta.services.map((slug) => (
                                    <span
                                        key={slug}
                                        className="text-xs uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1"
                                    >
                                        {serviceLabel(slug)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {meta.outcomes && meta.outcomes.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                {meta.outcomes.map((outcome, i) => (
                                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                                        <p className="text-white text-base leading-snug">{outcome}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="blog-article">
                            <MDXRemote source={content} />
                        </div>

                        {meta.testimonial && (
                            <blockquote className="mt-12 border-l-2 border-purple-500 pl-6 py-2">
                                <p className="text-xl text-gray-200 italic leading-relaxed">&ldquo;{meta.testimonial.quote}&rdquo;</p>
                                {meta.testimonial.author && (
                                    <footer className="mt-3 text-sm text-gray-500">{meta.testimonial.author}</footer>
                                )}
                            </blockquote>
                        )}
                    </article>
                </main>

                <Footer />
            </div>
        </div>
    );
}
