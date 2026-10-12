import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import DemoVideo from "@/components/DemoVideo";
import {
    Container,
    PrimaryLink,
    SecondaryLink,
    SectionHead,
} from "@/components/ui";
import { PRODUCTS, getProduct, getNextProduct } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
    return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) return {};

    const title = `${product.name} | Genuine Optimum`;
    return {
        title,
        description: product.lead,
        openGraph: {
            title,
            description: product.lead,
            url: `${SITE_URL}/products/${slug}`,
            siteName: "Genuine Optimum",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: product.lead,
        },
        alternates: { canonical: `/products/${slug}` },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) notFound();

    const next = getNextProduct(slug);

    // SoftwareApplication rather than Product: these are systems we
    // operate, not catalogue items with a price and stock.
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: product.name,
        description: product.lead,
        url: `${SITE_URL}/products/${product.slug}`,
        applicationCategory: "BusinessApplication",
        publisher: {
            "@type": "Organization",
            name: "Genuine Optimum",
            url: SITE_URL,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            <main>
                {/* ── Hero ─────────────────────────────────────────── */}
                <section className="border-b border-line">
                    <Container>
                        <div className="border-b border-line py-4">
                            <Breadcrumbs
                                bare
                                items={[
                                    { label: "Products", href: "/products" },
                                    {
                                        label: product.name,
                                        href: `/products/${product.slug}`,
                                    },
                                ]}
                            />
                        </div>

                        <div className="grid grid-cols-1 items-end gap-14 py-16 lg:grid-cols-2">
                            <Reveal className="flex flex-col gap-5">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="font-mono text-[11.5px] text-dim">
                                        {product.context}
                                    </span>
                                </div>
                                <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] tracking-[-0.04em]">
                                    {product.name}
                                </h1>
                                <p className="max-w-[34ch] text-[19px] leading-[1.5] text-text">
                                    {product.lead}
                                </p>
                            </Reveal>

                            <Reveal delay={0.08} className="flex flex-col gap-5">
                                <p className="max-w-[46ch] text-base leading-relaxed text-muted">
                                    {product.audience}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <PrimaryLink href="#intro">
                                        {product.primaryCta}
                                    </PrimaryLink>
                                    <SecondaryLink href={`/contact?product=${product.slug}`}>
                                        {product.cta.action}
                                    </SecondaryLink>
                                </div>
                            </Reveal>
                        </div>
                    </Container>
                </section>

                {/* ── Introduction ─────────────────────────────────────────── */}
                <section id="intro" className="border-b border-line bg-bg-alt">
                    <Container className="py-20">
                        <Reveal>
                            <h2 className="pb-6 text-[clamp(1.5rem,2.6vw,2rem)] tracking-[-0.025em]">
                                {product.demo.heading}
                            </h2>
                        </Reveal>

                        {/* The frame hugs the video: its width is the height cap
                            (78vh) times 16/9, so a 16:9 clip fills it exactly, with
                            no bars, no crop and no fill. It centres when the page is
                            wider than that, and uses the full width when narrower. */}
                        <Reveal>
                            <div
                                className="mx-auto w-full"
                                style={{ maxWidth: "calc(78vh * 16 / 9)" }}
                            >
                                <DemoVideo
                                    src={product.demo.src}
                                    poster={product.demo.poster}
                                    cover={product.demo.cover}
                                    chrome={product.demo.chrome}
                                    label={
                                        product.demo.src
                                            ? `${product.name} introduction`
                                            : `${product.name} introduction. Expected in /public/videos, then set demo.src in lib/products.ts`
                                    }
                                />
                            </div>
                        </Reveal>

                    </Container>
                </section>

                {/* ── Features ─────────────────────────────────────── */}
                <section>
                    <Container className="grid grid-cols-1 items-start gap-14 py-24 lg:grid-cols-[minmax(0,360px)_1fr]">
                        <Reveal>
                            <SectionHead
                                eyebrow={product.features.section.eyebrow}
                                heading={product.features.section.heading}
                                intro={product.features.section.intro}
                            />
                        </Reveal>

                        {/* 1px gap over a line-coloured bed gives hairline dividers
                            between cells without doubling borders at the joins. */}
                        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
                            {product.features.items.map((item, i) => (
                                <Reveal key={item.title} delay={i * 0.04}>
                                    <div className="flex h-full flex-col gap-2.5 bg-panel p-7">
                                        <h3 className="text-[19px]">{item.title}</h3>
                                        <p className="text-[14.5px] leading-relaxed text-muted">
                                            {item.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* ── How it works ─────────────────────────────────── */}
                <section className="border-t border-line bg-bg-alt">
                    <Container className="grid grid-cols-1 items-start gap-14 py-24 lg:grid-cols-[minmax(0,360px)_1fr]">
                        <Reveal>
                            <SectionHead
                                eyebrow={product.mechanics.section.eyebrow}
                                heading={product.mechanics.section.heading}
                                intro={product.mechanics.section.intro}
                            />
                        </Reveal>

                        <div className="flex flex-col border-t border-line">
                            {product.mechanics.steps.map((step, i) => (
                                <Reveal key={step.marker} delay={i * 0.04}>
                                    <div className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-[92px_1fr] sm:gap-6">
                                        <div className="font-mono text-xs text-accent">
                                            {step.marker}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg">{step.title}</h3>
                                            <p className="max-w-[62ch] text-[15px] leading-relaxed text-muted">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* ── Closing ──────────────────────────────────────── */}
                <section className="border-t border-line">
                    <Container className="flex flex-col items-start gap-6 py-24">
                        <h2 className="max-w-[20ch] text-[clamp(2rem,4vw,2.875rem)] leading-[1.04]">
                            {product.cta.heading}
                        </h2>
                        <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted">
                            {product.cta.body}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <PrimaryLink href={`/contact?product=${product.slug}`}>
                                {product.cta.action}
                            </PrimaryLink>
                            <SecondaryLink href={`/products/${next.slug}`}>
                                Next: {next.name} &rarr;
                            </SecondaryLink>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />
        </>
    );
}
