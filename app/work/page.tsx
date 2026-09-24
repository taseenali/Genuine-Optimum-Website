import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import WorkGrid, { WorkCard } from "@/components/WorkGrid";
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

/** Facts shown beside the kit builder write-up. */
const KIT_BUILDER_META = [
    { label: "Role", value: "Design & build" },
    { label: "Stack", value: "Three.js, React" },
    { label: "Output", value: "Print-ready artwork" },
];

/**
 * Slots for past work that has no write-up yet. Filling in `title`
 * and `description` is all it takes to publish one.
 */
const ALSO_SHIPPED = [
    { number: "01", title: "Project slot", description: "Add a title and two lines." },
    { number: "02", title: "Project slot", description: "Add a title and two lines." },
    { number: "03", title: "Project slot", description: "Add a title and two lines." },
    { number: "04", title: "Project slot", description: "Add a title and two lines." },
];

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
                                    Things we built for other people
                                </h1>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted">
                                    Client projects across configurators, storefronts,
                                    marketing sites, and internal tools. Each entry says
                                    what the problem was and what we shipped.
                                </p>
                            </Reveal>
                        </div>
                    </Container>
                </section>

                {/* ── Kit builder ──────────────────────────────────── */}
                <section id="kit-builder" className="scroll-mt-[66px] border-b border-line">
                    <Container className="py-20">
                        <div className="grid grid-cols-1 items-start gap-11 lg:grid-cols-2">
                            <Reveal>
                                <figure className="m-0 border border-line-2 bg-panel">
                                    <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
                                        <span
                                            aria-hidden
                                            className="size-2 shrink-0 rounded-full bg-accent"
                                        />
                                        <span className="font-mono text-[11px] text-dim">
                                            kit configurator — live 3D
                                        </span>
                                    </div>
                                    <div className="slot flex aspect-4/3 items-center justify-center p-6">
                                        <p className="text-center font-mono text-[12.5px] leading-relaxed text-dim">
                                            [ product shot or short loop ]
                                            <br />
                                            3D jersey with colours applied
                                        </p>
                                    </div>
                                </figure>
                            </Reveal>

                            <Reveal delay={0.08} className="flex flex-col gap-5">
                                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-dim">
                                    <span>Sportswear</span>
                                    <span aria-hidden>·</span>
                                    <span>Web app &amp; 3D</span>
                                </div>
                                <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05]">
                                    3D sports kit builder
                                </h2>
                                <p className="max-w-[60ch] text-[16.5px] leading-relaxed text-muted">
                                    A browser configurator for designing team kits on a
                                    live 3D model. Customers pick a base pattern, set
                                    colours per panel, add sponsor placements and player
                                    names, and rotate the garment to check it before
                                    ordering.
                                </p>
                                <p className="max-w-[60ch] text-[16.5px] leading-relaxed text-muted">
                                    The output is not just a picture: each configuration
                                    exports as production-ready artwork with the correct
                                    panel separations, which removed the back-and-forth
                                    between the sales team and the print floor.
                                </p>

                                <div className="mt-1 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
                                    {KIT_BUILDER_META.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex flex-col gap-1.5 bg-panel p-5"
                                        >
                                            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
                                                {item.label}
                                            </div>
                                            <div className="text-[14.5px]">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
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

                {/* ── Also shipped ─────────────────────────────────── */}
                <section className="border-b border-line">
                    <Container className="py-20">
                        <Reveal>
                            <div className="flex flex-wrap items-end justify-between gap-8 pb-8">
                                <h2 className="text-[clamp(1.5rem,2.8vw,2.125rem)] tracking-[-0.03em]">
                                    Also shipped
                                </h2>
                                <p className="max-w-[34ch] font-mono text-[11.5px] leading-relaxed text-dim">
                                    Slots ready for the rest of the back catalogue.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
                            {ALSO_SHIPPED.map((item, i) => (
                                <Reveal key={item.number} delay={i * 0.04}>
                                    <div className="flex h-full min-h-[150px] flex-col gap-2.5 bg-panel p-7">
                                        <div className="font-mono text-[11px] text-accent">
                                            {item.number}
                                        </div>
                                        <div className="text-lg">{item.title}</div>
                                        <p className="text-[14.5px] leading-relaxed text-dim">
                                            {item.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
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
