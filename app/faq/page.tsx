import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const TITLE = "Frequently Asked Questions | Genuine Optimum";
const DESCRIPTION =
    "Answers to common questions about working with Genuine Optimum: process, timelines, industries served, and how engagements start.";
const SITE_URL = "https://genuineoptimum.com";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/faq`,
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const faqs = [
    {
        question: "What does Genuine Optimum actually do?",
        answer:
            "We build digital systems for businesses. Web development, SEO, custom software, and AI & data systems are handled as one connected approach, not as separate, disconnected services.",
    },
    {
        question: "How does an engagement start?",
        answer:
            "It starts with a free consultation. You tell us about your business and what's not working, and we map out which service (or combination of services) actually fits, before any scope or agreement is discussed.",
    },
    {
        question: "Do you work with businesses my size?",
        answer:
            "We work with local service businesses, e-commerce brands, startups, technology companies, and professional services firms. Project scope reflects where your business actually is, not a one-size-fits-all package.",
    },
    {
        question: "How long does a typical project take?",
        answer:
            "It depends on scope. A landing page moves faster than a custom platform, and during the consultation we walk through our execution process (Discovery, Strategy, Development, Testing, Deployment) so you get a realistic timeline before any work begins.",
    },
    {
        question: "Do I need to commit to a long-term contract?",
        answer:
            "No. Every engagement is scoped to the project at hand. Ongoing support and optimization are available if you want them, but nothing is bundled by default.",
    },
    {
        question: "Can I hire you for just one service, like SEO or a website?",
        answer:
            "Yes. Our services are designed to work well together, but each one (SEO, web development, custom applications, AI & data systems) stands on its own and can be engaged independently.",
    },
    {
        question: "What happens after I submit the contact form?",
        answer:
            "Your message goes directly to our team. We review the details (including which service you're interested in) and follow up to schedule your free consultation.",
    },
    {
        question: "Do you offer ongoing support after launch?",
        answer:
            "Yes. Our execution process includes deployment and long-term support as the final step, covering monitoring and optimization after a project goes live.",
    },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

export default function FAQPage() {
    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Questions</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h1>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 open:bg-white/[0.07]"
                                >
                                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-lg font-semibold text-white">
                                        {faq.question}
                                        <svg
                                            className="w-5 h-5 flex-shrink-0 text-purple-400 transition-transform duration-300 group-open:rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <p className="mt-4 text-gray-400 leading-relaxed">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
