import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CaseStudyBody from "@/components/CaseStudyBody";
import CaseStudyModalRoute from "@/components/CaseStudyModalRoute";
import { Container } from "@/components/ui";
import { getAllCaseStudies, getCaseStudySource, resolveClientLabel } from "@/lib/caseStudies";
import { SERVICES } from "@/lib/services";
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

    // Search results cut a title off at about 60 characters. Keep the brand
    // suffix when it fits and drop it when the case study's own title is long.
    const withBrand = `${study.meta.title} | Genuine Optimum`;
    const title = withBrand.length <= 62 ? withBrand : study.meta.title;
    return {
        title,
        description: study.meta.summary,
        openGraph: {
            title,
            description: study.meta.summary,
            url: `https://www.genuineoptimum.com/work/${slug}`,
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
            <div className="relative min-h-screen bg-bg text-white font-sans w-full">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    {/* The design itself is an iframe, which search engines do not
                        read as part of this page. This block is the page's own text:
                        what it is, for whom, and what we did. The overlay opens over it. */}
                    <main className="flex-grow pb-24">
                        <Breadcrumbs
                            items={[
                                { label: "Work", href: "/work" },
                                { label: meta.title, href: `/work/${slug}` },
                            ]}
                        />
                        <Container className="flex flex-col gap-5 py-10">
                            <div className="eyebrow">Case study</div>
                            <h1 className="max-w-[24ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em]">
                                {meta.title}
                            </h1>
                            <p className="max-w-[60ch] text-[17px] leading-relaxed text-muted">
                                {meta.summary}
                            </p>
                            <dl className="flex flex-wrap gap-x-10 gap-y-3 pt-2 font-mono text-[12px] text-dim">
                                {resolveClientLabel(meta) ? (
                                    <div>
                                        <dt className="text-faint">Client</dt>
                                        <dd>{resolveClientLabel(meta)}</dd>
                                    </div>
                                ) : null}
                                {meta.industry ? (
                                    <div>
                                        <dt className="text-faint">Industry</dt>
                                        <dd>{meta.industry}</dd>
                                    </div>
                                ) : null}
                                {meta.services.length > 0 ? (
                                    <div>
                                        <dt className="text-faint">Services</dt>
                                        <dd>
                                            {meta.services
                                                .map((slug) => SERVICES.find((x) => x.slug === slug)?.shortTitle ?? slug)
                                                .join(", ")}
                                        </dd>
                                    </div>
                                ) : null}
                            </dl>
                        </Container>
                    </main>
                    <Footer />
                </div>
                <CaseStudyModalRoute src={meta.standaloneHtml} />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-bg text-white font-sans w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pb-24">
                    <Breadcrumbs
                        items={[
                            { label: "Work", href: "/work" },
                            { label: meta.title, href: `/work/${slug}` },
                        ]}
                    />

                    <div className="max-w-3xl mx-auto px-6">
                        <CaseStudyBody meta={meta} content={content} />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
