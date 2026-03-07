"use client"

import { motion, Variants } from "framer-motion"

const features = [
    {
        title: "SEO Optimization",
        description: "Rank higher and drive qualified traffic with data-driven SEO strategies.",
    },
    {
        title: "Custom Web Development",
        description: "Fast, scalable, and modern websites built with cutting-edge technologies.",
    },
    {
        title: "Software Applications",
        description: "Custom software solutions designed to solve real business problems.",
    },
]

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

export default function FeatureGrid() {
    return (
        <section className="relative py-28 px-6">
            {/* Blur glass background layer */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-y border-white/10 pointer-events-none z-0"></div>

            {/* Section depth glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
                <div className="w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-cyan-500/10 blur-[100px] opacity-60"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Powerful Digital Solutions
                    </h2>

                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        We help businesses build, optimize, and scale their digital presence
                        with modern technology and data-driven strategies.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8 grid-cols-1 md:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            className="group relative rounded-2xl border border-white/10 bg-white/5 p-10 min-h-[180px] flex flex-col justify-center backdrop-blur-xl transition-colors duration-300 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:bg-white/10"
                        >
                            {/* Inner card glow on hover */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 pointer-events-none z-0"></div>

                            <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400 text-lg leading-relaxed relative z-10">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
