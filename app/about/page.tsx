"use client";

import { motion } from "framer-motion";
import { Black_Ops_One, Quantico } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

const blackOpsOne = Black_Ops_One({
    weight: "400",
    subsets: ["latin"],
});

const quantico = Quantico({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 w-full overflow-hidden">
            {/* Background Particles */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={["#ffffff"]}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={2}
                />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-20 relative z-10">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h1 className={`text-4xl md:text-6xl font-extrabold text-[#a855f7] mb-8 uppercase tracking-wider ${blackOpsOne.className}`}>
                                About Genuine Optimum
                            </h1>
                            <div className={`space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed ${quantico.className}`}>
                                <p>
                                    At Genuine Optimum, we build digital systems that help businesses grow with clarity and efficiency.
                                </p>
                                <p>
                                    We specialize in web development, SEO, and custom software solutions — not as separate services, but as a connected approach to solving real business problems. Every project we take on is designed to improve performance, simplify operations, and create long-term value.
                                </p>
                            </div>
                        </motion.div>

                        <div className={`mt-32 space-y-32 ${quantico.className}`}>
                            {/* What We Do */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
                            >
                                <div className="md:w-1/3">
                                    <h2 className={`text-4xl md:text-5xl text-[#a855f7] uppercase tracking-wide ${blackOpsOne.className} sticky top-32`}>
                                        What We Do
                                    </h2>
                                </div>
                                <div className="md:w-2/3 space-y-8 text-xl text-gray-300">
                                    <p className="text-2xl md:text-3xl text-white font-medium leading-tight">
                                        We don’t just create websites or run campaigns. <br className="hidden md:block"/>
                                        We build systems that work together.
                                    </p>
                                    <div className="pl-6 border-l-2 border-[#a855f7]/50 space-y-6">
                                        <p>Websites that are fast, scalable, and conversion-focused</p>
                                        <p>SEO strategies that bring the right audience</p>
                                        <p>Custom software that automates and streamlines operations</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Our Approach */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-start md:text-right"
                            >
                                <div className="md:w-1/3 flex md:justify-end">
                                    <h2 className={`text-4xl md:text-5xl text-[#a855f7] uppercase tracking-wide ${blackOpsOne.className} sticky top-32`}>
                                        Our Approach
                                    </h2>
                                </div>
                                <div className="md:w-2/3 space-y-8 text-xl text-gray-300 flex flex-col md:items-end">
                                    <p className="text-2xl md:text-3xl text-white font-medium leading-tight">
                                        We focus on practical solutions, not unnecessary complexity.
                                    </p>
                                    <p className="text-gray-400">Every decision is based on:</p>
                                    <div className="md:pr-6 md:border-r-2 md:border-l-0 pl-6 border-l-2 md:pl-0 border-[#a855f7]/50 space-y-6 text-left md:text-right">
                                        <p>Business goals</p>
                                        <p>User experience</p>
                                        <p>Performance and scalability</p>
                                    </div>
                                    <p className="text-white mt-8 text-2xl">We keep things simple, efficient, and results-driven.</p>
                                </div>
                            </motion.div>

                            {/* Why Choose Us */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
                            >
                                <div className="md:w-1/3">
                                    <h2 className={`text-4xl md:text-5xl text-[#a855f7] uppercase tracking-wide ${blackOpsOne.className} sticky top-32`}>
                                        Why Choose Us
                                    </h2>
                                </div>
                                <div className="md:w-2/3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                                        <div>
                                            <h3 className={`text-white text-2xl mb-3 font-bold ${blackOpsOne.className} tracking-wider`}>01. Execution</h3>
                                            <p className="text-gray-400 text-xl leading-relaxed">Clear and structured execution from start to finish.</p>
                                        </div>
                                        <div>
                                            <h3 className={`text-white text-2xl mb-3 font-bold ${blackOpsOne.className} tracking-wider`}>02. Outcomes</h3>
                                            <p className="text-gray-400 text-xl leading-relaxed">Focus on real business outcomes over vanity metrics.</p>
                                        </div>
                                        <div>
                                            <h3 className={`text-white text-2xl mb-3 font-bold ${blackOpsOne.className} tracking-wider`}>03. Scalability</h3>
                                            <p className="text-gray-400 text-xl leading-relaxed">Long-term scalable solutions that grow with you.</p>
                                        </div>
                                        <div>
                                            <h3 className={`text-white text-2xl mb-3 font-bold ${blackOpsOne.className} tracking-wider`}>04. Reliability</h3>
                                            <p className="text-gray-400 text-xl leading-relaxed">Clean, modern, and reliable systems built to last.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Our Goal */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="text-center pt-24 pb-16 relative"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent"></div>
                                <h2 className={`text-4xl md:text-5xl text-[#a855f7] mb-12 uppercase tracking-widest ${blackOpsOne.className}`}>Our Goal</h2>
                                <p className="text-2xl md:text-4xl leading-relaxed text-white max-w-4xl mx-auto font-light">
                                    To help businesses move from fragmented tools and slow processes <br className="hidden md:block"/>
                                    to connected systems that <span className="text-[#a855f7] font-bold">drive real growth</span>.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
