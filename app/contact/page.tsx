import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/ui";
import { SITE_URL } from "@/lib/seo";

const TITLE = "Contact | Genuine Optimum";
const DESCRIPTION =
    "Tell us what you're trying to build. A reply within one business day from an engineer, a 30-minute call, then a written scope with cost and timeline.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/contact`,
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/contact" },
};

const NEXT_STEPS = [
    {
        number: "01",
        text: "A reply within one business day, from an engineer rather than a sales inbox.",
    },
    {
        number: "02",
        text: "A 30-minute call to understand the problem and your current systems.",
    },
    {
        number: "03",
        text: "A written scope with cost and timeline, or an honest no if we're the wrong fit.",
    },
];

export default function ContactPage() {
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
                                items={[{ label: "Contact", href: "/contact" }]}
                            />
                        </div>

                        <div className="grid grid-cols-1 items-end gap-14 py-16 lg:grid-cols-2">
                            <Reveal className="flex flex-col gap-5">
                                <div className="eyebrow">Contact</div>
                                <h1 className="text-[clamp(2.25rem,6vw,4.125rem)] leading-[1] tracking-[-0.04em]">
                                    Tell us what you&apos;re trying to build
                                </h1>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted">
                                    Everything below the first two fields is optional. The
                                    more you fill in, the more specific our first reply
                                    can be.
                                </p>
                            </Reveal>
                        </div>
                    </Container>
                </section>

                {/* ── Form + sidebar ───────────────────────────────── */}
                <section>
                    <Container className="grid grid-cols-1 items-start gap-14 py-16 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
                        <Suspense
                            fallback={
                                <div className="h-[600px] border border-line bg-panel" />
                            }
                        >
                            <ContactForm />
                        </Suspense>

                        <aside className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3.5 border border-line bg-panel p-7">
                                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                                    Direct
                                </div>
                                <a
                                    href="mailto:contact@genuineoptimum.com"
                                    className="text-[17px] text-accent transition-colors hover:text-accent-hi"
                                >
                                    contact@genuineoptimum.com
                                </a>
                                <p className="text-[14.5px] leading-relaxed text-muted">
                                    Prefer to skip the form? Email us with the same detail
                                    and you&apos;ll get the same reply.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 border border-line p-7">
                                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                                    What happens next
                                </div>
                                {NEXT_STEPS.map((step) => (
                                    <div
                                        key={step.number}
                                        className="grid grid-cols-[28px_1fr] gap-3"
                                    >
                                        <span className="font-mono text-[11px] text-accent">
                                            {step.number}
                                        </span>
                                        <span className="text-[14.5px] leading-relaxed text-muted">
                                            {step.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2.5 border border-line p-7">
                                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                                    Availability
                                </div>
                                <p className="text-[15px] leading-relaxed text-muted">
                                    Taking on new projects now. We work across US, UK, and
                                    EU hours.
                                </p>
                            </div>
                        </aside>
                    </Container>
                </section>
            </main>

            <Footer />
        </>
    );
}
