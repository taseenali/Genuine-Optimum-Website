import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Privacy Policy | Genuine Optimum",
    description: "How Genuine Optimum collects, uses, and protects information submitted through this website.",
};

export default function PrivacyPage() {
    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Privacy Policy</h1>
                        <p className="text-gray-500 text-sm mb-12">Last updated: July 2026</p>

                        <div className="space-y-10 text-gray-300 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                                <p>
                                    Genuine Optimum (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
                                    This Privacy Policy explains what information we collect through genuineoptimum.com
                                    (the &quot;Site&quot;), how we use it, and the choices you have. By using the Site, you
                                    agree to the practices described here.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                                <p className="mb-3">We collect information in the following ways:</p>
                                <ul className="list-disc list-inside space-y-2 text-gray-400">
                                    <li>
                                        <span className="text-gray-300">Information you provide directly</span> — when you
                                        submit our contact form, we collect your name, email address, phone number
                                        (optional), the service(s) you&apos;re interested in, and any message you write.
                                    </li>
                                    <li>
                                        <span className="text-gray-300">Automatically collected information</span> — like
                                        most websites, our hosting and analytics providers may collect standard technical
                                        data such as IP address, browser type, device type, and pages visited, used only
                                        in aggregate to understand site performance.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">3. How We Use Information</h2>
                                <p className="mb-3">We use the information we collect to:</p>
                                <ul className="list-disc list-inside space-y-2 text-gray-400">
                                    <li>Respond to your inquiry and follow up about the services you asked about</li>
                                    <li>Operate, maintain, and improve the Site</li>
                                    <li>Understand aggregate traffic and performance trends</li>
                                    <li>Detect and prevent spam or abuse of our contact form</li>
                                </ul>
                                <p className="mt-3">
                                    We do not sell, rent, or trade your personal information to third parties for their
                                    marketing purposes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">4. How We Share Information</h2>
                                <p>
                                    Contact form submissions are delivered to us via our email service provider so we can
                                    respond to you directly. We may also use privacy-conscious analytics and hosting
                                    infrastructure providers (for example, our hosting platform) to operate the Site.
                                    These providers process data only on our behalf and are not permitted to use it for
                                    their own purposes. We do not share your information with any other third party
                                    except where required by law.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">5. Cookies &amp; Tracking</h2>
                                <p>
                                    We may use minimal, privacy-focused analytics to understand how visitors use the
                                    Site (such as page views and Core Web Vitals performance data). We do not use
                                    invasive tracking or sell data to advertising networks.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
                                <p>
                                    We retain contact form submissions only as long as necessary to respond to your
                                    inquiry and maintain reasonable business records. You may request deletion of your
                                    information at any time (see Section 8).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
                                <p>
                                    Depending on your location, you may have the right to request access to, correction
                                    of, or deletion of your personal information, or to object to certain processing.
                                    To exercise any of these rights, contact us using the details in Section 9.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">8. Children&apos;s Privacy</h2>
                                <p>
                                    The Site is not directed to children under 16, and we do not knowingly collect
                                    personal information from children.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">9. Contact Us</h2>
                                <p>
                                    If you have questions about this Privacy Policy or how we handle your information,
                                    please reach out through our{" "}
                                    <a href="/contact" className="text-purple-400 hover:text-purple-300 underline">
                                        contact page
                                    </a>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-3">10. Changes to This Policy</h2>
                                <p>
                                    We may update this Privacy Policy from time to time. Changes will be posted on this
                                    page with an updated revision date.
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
