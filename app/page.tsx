import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import DemoVideo from "@/components/DemoVideo";
import ConstellationField from "@/components/ConstellationField";
import ServicesGrid from "@/components/ServicesGrid";
import ExecutionProcess from "@/components/ExecutionProcess";
import {
    Container,
    CtaBand,
    PrimaryLink,
    SecondaryLink,
} from "@/components/ui";
import { PRODUCTS } from "@/lib/products";
import { CAPABILITIES } from "@/lib/capabilities";

/** The four facts in the bar above the headline. The last one carries the accent. */
const STATUS_BAR = [
    "Software house — est. 2023",
    "AI & data systems · product engineering",
    "Clients in US, UK & EU",
];

export default function Home() {
    // The hero lists the first four capabilities as a quick index into
    // the capabilities page rather than repeating their descriptions.
    const heroCapabilities = CAPABILITIES.slice(0, 4);

    return (
        <>
            <Navbar />

            <main>
                {/* ── Hero ─────────────────────────────────────────── */}
                <section className="border-b border-line">
                    {/* Scoped to the type block, so nothing renders behind
                        the opaque reel further down the section. */}
                    <div className="relative">
                    <ConstellationField />

                    <Container className="relative z-10">
                        <div className="grid grid-cols-1 border-b border-line sm:grid-cols-2 lg:grid-cols-4">
                            {STATUS_BAR.map((item) => (
                                <div
                                    key={item}
                                    className="py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-dim"
                                >
                                    {item}
                                </div>
                            ))}
                            <div className="py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                                Open for new work
                            </div>
                        </div>

                        <Reveal>
                            <h1 className="max-w-[16ch] py-14 text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.94] tracking-[-0.045em] md:py-[72px]">
                                We build the models,{" "}
                                <span className="text-dim">pipelines and products</span>{" "}
                                that run the work.
                            </h1>
                        </Reveal>

                        <div className="grid grid-cols-1 items-start gap-14 pb-16 lg:grid-cols-2">
                            <Reveal className="flex max-w-[52ch] flex-col gap-6">
                                <p className="text-lg leading-relaxed text-muted">
                                    Genuine Optimum is a software house working on applied
                                    AI and data infrastructure. We take on the whole
                                    system: the model, the data it runs on, and the
                                    product people use it through. Three of them we built
                                    for ourselves.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <PrimaryLink href="/contact">Start a project</PrimaryLink>
                                    <SecondaryLink href={`/products/${PRODUCTS[0].slug}`}>
                                        See a demo
                                    </SecondaryLink>
                                </div>
                            </Reveal>

                            <Reveal delay={0.08}>
                                <div className="flex flex-col border-t border-line">
                                    {heroCapabilities.map((capability) => (
                                        <Link
                                            key={capability.number}
                                            href="/capabilities"
                                            className="group grid grid-cols-[46px_1fr_auto] items-center gap-4 border-b border-line px-1 py-4 transition-colors hover:bg-panel"
                                        >
                                            <span className="font-mono text-[11px] text-dim">
                                                {capability.number}
                                            </span>
                                            <span className="text-base text-text">
                                                {capability.title}
                                            </span>
                                            <span className="font-mono text-xs text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                                                &rarr;
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </Container>
                    </div>

                    {/* Full-bleed reel cutting across all three products. */}
                    <div className="border-t border-line bg-bg-alt">
                        <DemoVideo
                            label="Screen capture across Dispatch OS, AI Voice Agent, and Construction Finance Suite. Expected at /public/videos/reel.mp4"
                            aspect="24 / 9"
                        />
                    </div>
                </section>

                {/* ── Products ─────────────────────────────────────── */}
                <section>
                    <Container className="py-24 md:py-28">
                        <Reveal>
                            <div className="flex flex-wrap items-end justify-between gap-10 pb-10">
                                <div className="flex flex-col gap-3.5">
                                    <div className="eyebrow">Our products</div>
                                    <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.06]">
                                        Three systems we own and run
                                    </h2>
                                </div>
                                <p className="max-w-[34ch] font-mono text-xs leading-relaxed text-dim">
                                    Each has its own page with a demo you can watch.
                                </p>
                            </div>
                        </Reveal>

                        <div className="flex flex-col border-t border-line">
                            {PRODUCTS.map((product, i) => (
                                <Reveal key={product.slug} delay={i * 0.05}>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="group grid grid-cols-1 items-center gap-6 border-b border-line px-1 py-8 transition-colors hover:bg-panel lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:gap-10"
                                    >
                                        <div className="flex flex-wrap items-baseline gap-3.5">
                                            <span className="text-[28px] leading-tight tracking-[-0.02em]">
                                                {product.name}
                                            </span>
                                            {product.flagship ? (
                                                <span className="rounded-control bg-accent px-1.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-on-accent">
                                                    FLAGSHIP
                                                </span>
                                            ) : null}
                                        </div>
                                        <p className="text-[15.5px] leading-relaxed text-muted">
                                            {product.summary}
                                        </p>
                                        <span className="font-mono text-[12.5px] text-accent transition-transform duration-200 lg:justify-self-end lg:group-hover:translate-x-0.5">
                                            View product &rarr;
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </Container>
                </section>

                <ServicesGrid />

                <ExecutionProcess />

                <CtaBand
                    heading="Tell us what your systems can't do yet."
                    body="Thirty minutes, no pitch deck. You'll leave with a view on whether the problem is worth solving with AI at all."
                    action="Get in touch"
                />
            </main>

            <Footer />
        </>
    );
}
