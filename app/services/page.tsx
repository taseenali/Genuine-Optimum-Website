"use client";

import { motion, Variants } from "framer-motion";
import { Black_Ops_One, Quantico } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import MagneticButton from "@/components/MagneticButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";
import { SERVICES } from "@/lib/services";

const blackOpsOne = Black_Ops_One({
    weight: "400",
    subsets: ["latin"],
});

const quantico = Quantico({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function ServicesPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 w-full overflow-hidden">
            <ParticlesBackground particleCount={300} />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-20">
                    <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

                    {/* Hero */}
                    <section className="px-6 mb-24 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className={`text-4xl md:text-7xl font-extrabold text-[#a855f7] mb-6 ${blackOpsOne.className}`}>
                                OUR SERVICES
                            </h1>
                            <p className={`text-xl md:text-2xl text-gray-300 font-medium tracking-wide max-w-3xl mx-auto ${quantico.className}`}>
                                Engineering, marketing, data, and AI, running as one system instead of separate vendors.
                            </p>
                        </motion.div>
                    </section>

                    {/* Service Cards */}
                    <section className="px-6 mb-32 max-w-7xl mx-auto">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid gap-6 grid-cols-1 md:grid-cols-2"
                        >
                            {SERVICES.map((service) => (
                                <motion.div
                                    key={service.slug}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                                    onClick={() => router.push(`/services/${service.slug}`)}
                                    className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-xl transition-colors duration-300 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:bg-white/10 cursor-pointer flex flex-col"
                                >
                                    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 ${quantico.className}`}>
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-base flex-grow">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="mt-6 inline-flex items-center gap-2 text-purple-400 font-medium text-sm group-hover:text-purple-300 transition-colors"
                                    >
                                        Explore {service.shortTitle}
                                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>

                    {/* Closing CTA */}
                    <section className="px-6 mb-20 max-w-5xl mx-auto text-center relative z-20">
                        <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            className="relative group p-[1px] rounded-[2.5rem] overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 via-transparent to-blue-600 opacity-40 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]"></span>
                            <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-black/90 backdrop-blur-3xl overflow-hidden flex flex-col items-center justify-center border border-white/5">
                                <h2 className="text-lg md:text-xl font-light mb-6 leading-relaxed tracking-wide text-white">
                                    Not sure which service fits? Tell us about your business and we&apos;ll map the right path.
                                </h2>
                                <MagneticButton
                                    className="relative overflow-hidden group/btn bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
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
