import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { Container, CtaBand } from "@/components/ui";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

const TITLE = "Products | Genuine Optimum";
const DESCRIPTION =
    "Software products built and run by Genuine Optimum for specific industries, including logistics dispatch, voice AI, and construction finance.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/products`,
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/products" },
};

export default function ProductsPage() {
    return (
        <>
            <Navbar />

            <main>
                <section className="border-b border-line">
                    <Container>
                        <div className="border-b border-line py-4">
                            <Breadcrumbs bare items={[{ label: "Products", href: "/products" }]} />
                        </div>

                        <div className="grid grid-cols-1 items-end gap-14 py-16 lg:grid-cols-2">
                            <Reveal className="flex flex-col gap-5">
                                <div className="eyebrow">Products</div>
                                <h1 className="text-[clamp(2.25rem,6vw,4.125rem)] leading-[1] tracking-[-0.04em]">
                                    Software we build and run
                                </h1>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted">
                                    Products for specific industries, each with its own
                                    page and an introductory video. More are on the way.
                                </p>
                            </Reveal>
                        </div>
                    </Container>
                </section>

                <section>
                    <Container className="py-16">
                        <div className="flex flex-col border-t border-line">
                            {PRODUCTS.map((product, i) => (
                                <Reveal key={product.slug} delay={i * 0.05}>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="group grid grid-cols-1 items-center gap-6 border-b border-line px-1 py-8 transition-colors hover:bg-panel lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:gap-10"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-wrap items-baseline gap-3.5">
                                                <span className="text-[28px] leading-tight tracking-[-0.02em]">
                                                    {product.name}
                                                </span>
                                            </div>
                                            <span className="font-mono text-[11.5px] text-dim">
                                                {product.context}
                                            </span>
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

                <CtaBand
                    heading="Need something built for your business?"
                    body="If none of these fit, we build custom systems too. Tell us what you're trying to do."
                    action="Get in touch"
                />
            </main>

            <Footer />
        </>
    );
}
