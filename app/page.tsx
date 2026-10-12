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
import { CAPABILITIES } from "@/lib/capabilities";

/** What the home page says about the products, without naming any of
 *  them, so the section stays true as the range grows. */
const PRODUCT_POINTS = [
    {
        title: "Built around one industry",
        body: "Each product starts from a real workflow in a specific trade, not from a generic template with the labels changed.",
    },
    {
        title: "Meet it before you call",
        body: "Every product has its own page with a short introductory video, so you can get a feel for what it does before you talk to anyone.",
    },
    {
        title: "Close, but not exact?",
        body: "If a product fits most of what you need, we can adapt it or build the missing part around it.",
    },
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
                                    product people use it through. Some of those products
                                    we build and run for ourselves.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <PrimaryLink href="/contact">Start a project</PrimaryLink>
                                    <SecondaryLink href="/products">
                                        Explore products
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
                        {/* 16:9 footage shown whole. The height cap keeps it from
                            filling a tall monitor; spare width becomes page-coloured
                            bars rather than cropping the picture. */}
                        <DemoVideo
                            src="/videos/GO_reel_v4.webm"
                            label="Genuine Optimum product reel"
                            aspect="16 / 9"
                            fit="contain"
                            maxHeight="78vh"
                            showControl={false}
                            ambient
                            bleed
                        />
                    </div>
                </section>

                {/* ── Products ─────────────────────────────────────── */}
                <section>
                    <Container className="grid grid-cols-1 items-start gap-14 py-24 md:py-28 lg:grid-cols-[minmax(0,460px)_1fr]">
                        <Reveal className="flex flex-col gap-5">
                            <div className="eyebrow">Our products</div>
                            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.06]">
                                Software we build for the way different businesses work
                            </h2>
                            <p className="max-w-[44ch] text-base leading-relaxed text-muted">
                                Alongside client projects, we build and run our own
                                products for specific industries. The range keeps
                                growing, and every product has its own page with an
                                introductory video.
                            </p>
                            <div className="pt-2">
                                <PrimaryLink href="/products">Browse our products</PrimaryLink>
                            </div>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <ul className="m-0 flex list-none flex-col border-t border-line p-0">
                                {PRODUCT_POINTS.map((point) => (
                                    <li
                                        key={point.title}
                                        className="grid grid-cols-1 gap-2 border-b border-line py-7 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-10"
                                    >
                                        <h3 className="text-[19px]">{point.title}</h3>
                                        <p className="text-[15px] leading-relaxed text-muted">
                                            {point.body}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
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
