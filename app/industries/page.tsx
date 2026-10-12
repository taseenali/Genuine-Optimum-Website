"use client";

import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";
import { INDUSTRIES } from "@/lib/industries";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function IndustriesPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-bg text-white font-sans selection:bg-accent/20 w-full overflow-hidden">

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pb-20">
                    <Breadcrumbs items={[{ label: "Industries", href: "/industries" }]} />

                    <section className="px-6 mb-24 max-w-[var(--page-max)] mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className={`text-4xl md:text-7xl font-medium text-accent mb-6`}>
                                INDUSTRIES WE WORK WITH
                            </h1>
                            <p className={`text-xl md:text-2xl text-muted font-medium tracking-wide max-w-3xl mx-auto`}>
                                The same connected approach (engineering, SEO, and AI) applied to what matters in your specific vertical.
                            </p>
                        </motion.div>
                    </section>

                    <section className="px-6 mb-32 max-w-5xl mx-auto space-y-8">
                        {INDUSTRIES.map((industry, index) => (
                            <motion.div
                                key={industry.slug}
                                id={industry.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                variants={itemVariants}
                                className="scroll-mt-32 relative border border-line bg-panel p-8 md:p-10"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 flex-shrink-0 bg-accent/20 border border-line-2 flex items-center justify-center text-accent">
                                        {industry.icon}
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
                                            0{index + 1}
                                        </span>
                                        <h2 className={`text-2xl md:text-3xl font-bold text-white mt-2 mb-3`}>
                                            {industry.title}
                                        </h2>
                                        <p className="text-muted leading-relaxed text-base md:text-lg">
                                            {industry.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </section>

                    {/* Closing CTA */}
                    <section className="px-6 mb-20 max-w-5xl mx-auto text-center relative z-20">
                        <div className="absolute inset-0 bg-accent/20 hidden rounded-full -z-10 pointer-events-none"></div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            className="relative group p-[1px] overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent via-transparent to-accent opacity-40 group-hover:opacity-100 transition-opacity duration-700"></span>
                            <div className="relative p-8 md:p-12 bg-bg/90 overflow-hidden flex flex-col items-center justify-center border border-line">
                                <h2 className="text-lg md:text-xl font-light mb-6 leading-relaxed tracking-wide text-white">
                                    Don&apos;t see your exact industry? We still want to hear about it.
                                </h2>
                                <MagneticButton
                                    className="relative overflow-hidden group/btn rounded-control bg-accent text-on-accent px-6 py-2.5 font-medium text-sm transition-all duration-300 hover:scale-105"
                                    onClick={() => router.push('/contact')}
                                >
                                    <span className="relative z-10">Claim Free Consultation</span>
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
