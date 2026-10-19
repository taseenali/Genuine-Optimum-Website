import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import StackGrid from "@/components/StackGrid";
import { Container, CtaBand, Tag } from "@/components/ui";
import { CAPABILITIES } from "@/lib/capabilities";
import { SITE_URL } from "@/lib/seo";

const TITLE = "Capabilities | Genuine Optimum";
const DESCRIPTION =
    "What Genuine Optimum builds: AI models and agents, data systems, web and app development, internal software, dashboards, automation, cloud and DevOps.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/capabilities`,
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
    return (
        <>
            <Navbar />

            <main>
                {/* ── Hero ─────────────────────────────────────────── */}
                <section className="border-b border-line">
                    <Container>
                        <div className="border-b border-line py-4">
                            <Breadcrumbs
                                bare
                                items={[{ label: "Capabilities", href: "/capabilities" }]}
                            />
                        </div>

                        <div className="grid grid-cols-1 items-end gap-14 py-16 lg:grid-cols-2">
                            <Reveal className="flex flex-col gap-5">
                                <div className="eyebrow">Capabilities</div>
                                <h1 className="text-[clamp(2.25rem,6vw,4.125rem)] leading-[1] tracking-[-0.04em]">
                                    What we can build for you
                                </h1>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted">
                                    The things we do regularly. Most projects combine
                                    three or four of them, because a model without a
                                    pipeline and an interface is not a system anyone can
                                    use.
                                </p>
                            </Reveal>
                        </div>
                    </Container>
                </section>

                {/* ── The disciplines ────────────────────────────────────── */}
                <section>
                    <Container className="py-16">
                        <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
                            {CAPABILITIES.map((capability, i) => (
                                <Reveal key={capability.number} delay={(i % 2) * 0.05}>
                                    <div className="flex h-full flex-col gap-3.5 bg-panel p-8 transition-colors hover:bg-panel-hover md:p-9">
                                        <div className="flex items-baseline gap-3.5">
                                            <span className="font-mono text-xs text-accent">
                                                {capability.number}
                                            </span>
                                            <h2 className="text-2xl tracking-[-0.02em]">
                                                {capability.title}
                                            </h2>
                                        </div>
                                        <p className="text-[15px] leading-relaxed text-muted">
                                            {capability.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {capability.tags.map((tag) => (
                                                <Tag key={tag}>{tag}</Tag>
                                            ))}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}

                            {/* Closing cell. With an odd number of disciplines the
                                last row of the two-column grid would otherwise
                                leave a hole showing the divider colour. */}
                            <Reveal>
                                <Link
                                    href="/contact"
                                    className="group flex h-full min-h-[200px] flex-col justify-between gap-6 bg-bg p-8 transition-colors hover:bg-panel md:p-9"
                                >
                                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                                        Not on the list?
                                    </span>
                                    <span className="flex flex-col gap-3">
                                        <span className="text-2xl tracking-[-0.02em]">
                                            Describe the problem instead
                                        </span>
                                        <span className="font-mono text-[12.5px] text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                                            Get in touch &rarr;
                                        </span>
                                    </span>
                                </Link>
                            </Reveal>
                        </div>
                    </Container>
                </section>

                {/* ── Stack ────────────────────────────────────────── */}
                <section className="border-t border-line bg-bg-alt">
                    <Container className="py-24">
                        <Reveal>
                            <div className="flex flex-wrap items-end justify-between gap-10 pb-10">
                                <div className="flex flex-col gap-3.5">
                                    <div className="eyebrow">Stack</div>
                                    <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] leading-[1.06]">
                                        Tools we work in daily
                                    </h2>
                                </div>
                                <p className="max-w-[36ch] font-mono text-xs leading-relaxed text-dim">
                                    Chosen per project. We do not start every build with
                                    the same four boxes.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal>
                            <StackGrid />
                        </Reveal>
                    </Container>
                </section>

                <CtaBand
                    heading="Not sure which of these you need?"
                    body="Describe the problem and we'll tell you what it actually takes, including when the answer is less than you expected."
                    action="Tell us about it"
                />
            </main>

            <Footer />
        </>
    );
}
