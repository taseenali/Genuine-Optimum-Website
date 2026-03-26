"use client";

import { motion, Variants } from "framer-motion";
import { Black_Ops_One, Quantico } from "next/font/google";
import { FiMapPin, FiShoppingCart, FiSend, FiCpu, FiBriefcase } from "react-icons/fi";

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
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function Industries() {
    const industries = [
        {
            title: "Local Service Businesses",
            description: "Plumbers, clinics, law firms, and agencies that need to dominate local search and convert nearby customers.",
            icon: <FiMapPin className="w-7 h-7" />,
        },
        {
            title: "E-Commerce Brands",
            description: "Online stores looking to scale with optimized storefronts, automated fulfillment, and data-driven marketing.",
            icon: <FiShoppingCart className="w-7 h-7" />,
        },
        {
            title: "Startups",
            description: "Early-stage companies that need to move fast — from MVP development to growth infrastructure.",
            icon: <FiSend className="w-7 h-7" />,
        },
        {
            title: "Technology Companies",
            description: "SaaS platforms, dev tools, and tech firms needing scalable architecture, AI integration, and technical SEO.",
            icon: <FiCpu className="w-7 h-7" />,
        },
        {
            title: "Professional Services",
            description: "Consulting firms, financial advisors, and B2B companies that need credibility online and efficient client systems.",
            icon: <FiBriefcase className="w-7 h-7" />,
        }
    ];

    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Backdrop Blur layer */}
            <div className="absolute inset-0 bg-transparent backdrop-blur-3xl border-y border-white/5 pointer-events-none -z-10"></div>

            {/* Section glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
                <div className="w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/8 via-transparent to-indigo-500/8 blur-[120px] opacity-60"></div>
            </div>

            <div className={`max-w-7xl mx-auto relative z-10 ${quantico.className}`}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Who We Serve</p>
                    <h2 className={`text-3xl md:text-5xl font-bold text-white ${blackOpsOne.className} tracking-tight`}>
                        Industries We Work With
                    </h2>
                </motion.div>

                {/* Top row: 3 cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 max-w-5xl mx-auto"
                >
                    {industries.slice(0, 3).map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-left backdrop-blur-xl overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                        {item.icon}
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom row: 2 cards centered */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl md:max-w-[calc(66.666%+0.75rem)] mx-auto"
                >
                    {industries.slice(3).map((item, i) => (
                        <motion.div
                            key={i + 3}
                            variants={itemVariants}
                            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-left backdrop-blur-xl overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                        {item.icon}
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

