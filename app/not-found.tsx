import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container, PrimaryLink, SecondaryLink } from "@/components/ui";

// Next answers a missing page with a real 404 status already; this makes the
// page that goes with it useful (a way back) and marks it noindex so it can
// never be indexed as if it were content.
export const metadata: Metadata = {
    title: "Page not found | Genuine Optimum",
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main>
                <Container className="flex flex-col items-start gap-6 py-28">
                    <div className="eyebrow">Error 404</div>
                    <h1 className="max-w-[18ch] text-[clamp(2.25rem,6vw,4.125rem)] leading-[1] tracking-[-0.04em]">
                        That page doesn&apos;t exist
                    </h1>
                    <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted">
                        The link may be old, or the address mistyped. These are the places most
                        people are looking for.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <PrimaryLink href="/">Go to the home page</PrimaryLink>
                        <SecondaryLink href="/products">Browse our products</SecondaryLink>
                        <SecondaryLink href="/contact">Contact us</SecondaryLink>
                    </div>
                </Container>
            </main>
            <Footer />
        </>
    );
}
