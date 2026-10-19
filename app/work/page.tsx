import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import WorkGrid, { WorkCard } from "@/components/WorkGrid";
import KitBuilderCard from "@/components/KitBuilderCard";
import { Container, CtaBand } from "@/components/ui";
import { getAllCaseStudies, resolveClientLabel } from "@/lib/caseStudies";
import { SITE_URL } from "@/lib/seo";

const TITLE = "Work | Genuine Optimum";
const DESCRIPTION =
    "Client projects by Genuine Optimum: a 3D sports kit configurator, marketing sites and storefronts, and internal tools, alongside the AI and data work.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/work`,
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/work" },
};

/** The kit builder catalogue: the original PDF, and one image per page for the viewer. */
const KIT_BUILDER_CATALOGUE = "/case-study-html/custom-kit-builder-portfolio-v4.pdf";
const KIT_BUILDER_PAGES = Array.from(
    { length: 6 },
    (_, i) => `/case-study-html/kit-builder-catalogue/page-${i + 1}.jpg`
);

function toCard(study: ReturnType<typeof getAllCaseStudies>[number]): WorkCard {
    return {
        slug: study.slug,
        title: study.title,
        summary: study.summary,
        services: study.services,
        clientLabel: resolveClientLabel(study),
        standaloneHtml: study.standaloneHtml,
        coverImage: study.coverImage,
        coverPosition: study.coverPosition,
    };
}

export default function WorkPage() {
    // Products have their own pages now, so this page carries only the
    // client engagements.
    const templates = getAllCaseStudies()
        .filter((s) => s.kind === "template")
        .map(toCard);

    return (
        <>
            <Navbar />

            <main>
                {/* ── Hero ─────────────────────────────────────────── */}
                <section className="border-b border-line">
                    <Container>
                        <div className="border-b border-line py-4">
                            <Breadcrumbs bare items={[{ label: "Work", href: "/work" }]} />
                        </div>

                        <div className="grid grid-cols-1 items-end gap-14 py-16 lg:grid-cols-2">
                            <Reveal className="flex flex-col gap-5">
                                <div className="eyebrow">Work</div>
                                <h1 className="text-[clamp(2.25rem,6vw,4.125rem)] leading-[1] tracking-[-0.04em]">
                                    Featured Work
                                </h1>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted">
                                    A selection of what we&apos;ve designed and built, from
                                    a 3D configurator to storefronts and marketing sites.
                                    Each entry covers the problem and what we shipped.
                                </p>
                            </Reveal>
                        </div>
                    </Container>
                </section>

                {/* ── Kit builder ──────────────────────────────────── */}
                <section id="kit-builder" className="scroll-mt-[66px] border-b border-line">
                    <Container className="py-16">
                        {/* The same horizontal card as the storefront entries below:
                            preview on the left, write-up on the right, 80% wide and
                            left-aligned. Height follows the copy here, since this one
                            has two paragraphs. */}
                        <Reveal>
                            <KitBuilderCard
                                pdfHref={KIT_BUILDER_CATALOGUE}
                                thumbnail="/case-study-html/thumbnails/custom-kit-builder-portfolio.jpg"
                                pages={KIT_BUILDER_PAGES}
                            >
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-dim">
                                    <span>Sportswear</span>
                                    <span aria-hidden>·</span>
                                    <span>Web app &amp; 3D</span>
                                    <span aria-hidden>·</span>
                                    <span>Design &amp; build</span>
                                </div>
                                <h2 className="text-[19px] leading-[1.2] tracking-[-0.02em]">
                                    3D sports kit builder
                                </h2>
                                <p className="max-w-[56ch] text-[14px] leading-relaxed text-muted">
                                    A browser configurator for designing team kits on a
                                    live 3D model. Customers pick a base pattern, set
                                    colours per panel, add sponsor placements and player
                                    names, and rotate the garment to check it before
                                    ordering.
                                </p>
                                <p className="max-w-[56ch] text-[14px] leading-relaxed text-muted">
                                    The output is not just a picture: each configuration
                                    exports as production-ready artwork with the correct
                                    panel separations, which removed the back-and-forth
                                    between the sales team and the print floor.
                                </p>
                            </KitBuilderCard>
                        </Reveal>
                    </Container>
                </section>

                {/* ── Websites & storefronts ───────────────────────── */}
                <section
                    id="websites"
                    className="scroll-mt-[66px] border-b border-line bg-bg-alt"
                >
                    <Container className="py-20">
                        <Reveal>
                            <div className="flex flex-wrap items-end justify-between gap-10 pb-10">
                                <div className="flex max-w-[46ch] flex-col gap-4">
                                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-dim">
                                        <span>Web</span>
                                        <span aria-hidden>·</span>
                                        <span>Multiple clients</span>
                                    </div>
                                    <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05]">
                                        Websites &amp; storefronts
                                    </h2>
                                    <p className="text-[16.5px] leading-relaxed text-muted">
                                        Marketing sites and small web apps for service
                                        businesses and technology companies: fast on
                                        mobile, and handed over with a CMS the client&apos;s
                                        own team can run. Technical SEO is part of the
                                        build rather than a later add-on.
                                    </p>
                                </div>
                                <p className="max-w-[30ch] font-mono text-xs leading-relaxed text-dim">
                                    Open any card to walk through the full build.
                                </p>
                            </div>
                        </Reveal>

                        {templates.length > 0 ? (
                            <Reveal>
                                <WorkGrid templates={templates} />
                            </Reveal>
                        ) : (
                            <div className="border border-line bg-panel p-16 text-center">
                                <p className="mx-auto max-w-[52ch] text-muted">
                                    We&apos;re putting together detailed write-ups of recent
                                    engagements. Get in touch and we&apos;ll walk you through
                                    relevant examples directly.
                                </p>
                            </div>
                        )}
                    </Container>
                </section>

                <CtaBand
                    heading="Your project could be the next entry."
                    body="Tell us what you're trying to build and we'll say plainly whether we're the right people for it."
                    action="Start a conversation"
                />
            </main>

            <Footer />
        </>
    );
}
