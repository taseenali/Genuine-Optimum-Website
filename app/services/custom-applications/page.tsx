"use client";

import Navbar from "../../../components/Navbar";
import Reveal from "@/components/Reveal";
import Footer from "../../../components/Footer";
import MagneticButton from "../../../components/MagneticButton";
import RelatedServices from "../../../components/RelatedServices";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useRouter } from "next/navigation";

const systems = [
    {
        title: "Mobile Applications",
        description: "Custom mobile apps designed for iOS and Android platforms.",
    },
    {
        title: "Web Applications",
        description: "Advanced browser-based platforms built around how your business actually works.",
    },
    {
        title: "SaaS Platforms",
        description: "Subscription-based software products designed for scalable distribution.",
    },
    {
        title: "Internal Business Systems",
        description: "Custom tools that improve operational efficiency and team productivity.",
    },
];

export default function CustomAppsPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-bg text-white font-sans selection:bg-accent/20 w-full overflow-hidden">

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pb-20">
                    <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Custom Applications", href: "/services/custom-applications" }]} />

                    {/* Hero Section */}
                    <section className="px-6 mb-24 max-w-[var(--page-max)] mx-auto">
                        <div className="text-center">
                            <h1 className={`text-4xl md:text-7xl font-medium text-accent mb-6`}>
                                APPLICATION ENGINEERING
                            </h1>
                            <p className={`text-xl md:text-2xl text-muted font-medium tracking-wide max-w-3xl mx-auto`}>
                                Custom software solutions that automate operations and enable digital products.
                            </p>
                        </div>
                    </section>

                    {/* Intro Section */}
                    <section className="px-6 mb-32 relative">
                        <div className="absolute inset-0 bg-transparent border-y border-line pointer-events-none -z-10"></div>
                        <div className="max-w-4xl mx-auto py-16 text-center">
                            <Reveal as="p" className="text-lg md:text-xl text-muted leading-relaxed">
                                We build custom applications designed to streamline business processes, automate workflows, and support scalable digital products.
                            </Reveal>
                        </div>
                    </section>

                    {/* Systems Section */}
                    <section className="px-6 mb-32 max-w-[var(--page-max)] mx-auto">
                        <div className="mb-16 inline-block">
                            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3`}>
                                Systems We Build
                            </h2>
                            <div className="w-full h-1 bg-panel-hover relative rounded-full overflow-hidden">
                                <div className="absolute top-0 bottom-0 w-20 bg-accent rounded-full bar-sweep" />
                            </div>
                        </div>

                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {systems.map((system, index) => (
                                <Reveal delay={index * 0.1} key={index} className="relative border border-line bg-panel p-8 transition-all duration-300 flex flex-col h-full">
                                    <h3 className={`text-xl font-bold text-white mb-4 relative z-10`}>
                                        {system.title}
                                    </h3>
                                    <p className="text-muted leading-relaxed relative z-10">
                                        {system.description}
                                    </p>
                                </Reveal>
                            ))}
                        </div>
                    </section>

                    <RelatedServices currentSlug="custom-applications" />

                    {/* Closing Section */}
                    <section className="px-6 mb-20 max-w-5xl mx-auto text-center relative z-20">
                        {/* Background glow drop */}
                        <div className="absolute inset-0 bg-accent/20 hidden rounded-full -z-10 pointer-events-none transition-opacity duration-700"></div>

                        <Reveal className="relative group p-[1px] overflow-hidden">
                            {/* Animated gradient border */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent via-transparent to-accent opacity-40 group-hover:opacity-100 transition-opacity duration-700"></span>

                            <div className="relative p-8 md:p-12 bg-bg/90 overflow-hidden flex flex-col items-center justify-center border border-line">
                                {/* Subtle decorative top/bottom lines */}
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50"></div>
                                <div className="absolute right-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50"></div>

                                {/* Inner animated glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-accent/10 to-accent/10 rounded-full hidden -z-10 group-hover:from-accent/20 group-hover:to-accent/20 transition-all duration-700"></div>

                                <Reveal from="scale" delay={0.1} className="relative z-10">
                                    <h2 className="text-lg md:text-xl font-light mb-6 leading-relaxed tracking-wide text-white">
                                        Our engineering team designs software that fits your existing business processes and holds up as you grow.
                                    </h2>
                                    
                                    <div className="mt-8 flex justify-center">
                                        <MagneticButton
                                            className="relative overflow-hidden group/btn rounded-control bg-accent text-on-accent px-6 py-2.5 font-medium text-sm transition-all duration-300 hover:scale-105"
                                            onClick={() => router.push('/contact?service=custom-applications')}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Start Your Application
                                                <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:text-accent transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            {/* Button hover effect overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hi opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                        </MagneticButton>
                                    </div>
                                </Reveal>
                            </div>
                        </Reveal>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
