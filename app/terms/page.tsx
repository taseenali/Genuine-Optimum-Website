import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Terms of Service | Genuine Optimum",
    description: "The terms governing your use of the Genuine Optimum website.",
};

export default function TermsPage() {
    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Terms of Service</h1>
                        <p className="text-gray-500 text-sm mb-12">Last updated: July 2026</p>

                        <div className="space-y-10 text-gray-300 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                                <p>
                                    These Terms of Service (&quot;Terms&quot;) govern your use of genuineoptimum.com
                                    (the &quot;Site&quot;), operated by Genuine Optimum. By accessing or using the Site,
                                    you agree to be bound by these Terms. If you do not agree, please do not use the Site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">2. Use of the Site</h2>
                                <p>
                                    The Site is provided to give visitors information about Genuine Optimum&apos;s
                                    services and to allow prospective clients to request a consultation. You agree to
                                    use the Site only for lawful purposes and not to submit false, misleading, or
                                    malicious content through our contact form or any other feature.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">3. No Public Pricing / No Binding Offer</h2>
                                <p>
                                    Content on the Site (including service descriptions, process overviews, and any
                                    illustrative examples) is provided for general informational purposes only and
                                    does not constitute a binding quote, offer, or guarantee of results. Actual project
                                    scope, pricing, and deliverables are established separately in a written agreement
                                    between Genuine Optimum and the client.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
                                <p>
                                    All content on the Site (including text, graphics, logos, and design) is the
                                    property of Genuine Optimum or its licensors and is protected by applicable
                                    intellectual property laws. You may not reproduce, distribute, or create derivative
                                    works from Site content without our prior written consent.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Links</h2>
                                <p>
                                    The Site may contain links to third-party websites. We are not responsible for the
                                    content, accuracy, or practices of any linked third-party site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">6. Disclaimer of Warranties</h2>
                                <p>
                                    The Site is provided &quot;as is&quot; without warranties of any kind, express or
                                    implied. We do not warrant that the Site will be uninterrupted, error-free, or
                                    free of harmful components.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
                                <p>
                                    To the fullest extent permitted by law, Genuine Optimum shall not be liable for any
                                    indirect, incidental, or consequential damages arising from your use of the Site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">8. Changes to These Terms</h2>
                                <p>
                                    We may revise these Terms from time to time. Continued use of the Site after changes
                                    are posted constitutes acceptance of the revised Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">9. Contact Us</h2>
                                <p>
                                    Questions about these Terms can be sent through our{" "}
                                    <a href="/contact" className="text-purple-400 hover:text-purple-300 underline">
                                        contact page
                                    </a>.
                                </p>
                            </section>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
