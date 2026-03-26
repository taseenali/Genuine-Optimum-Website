"use client";

import { motion } from "framer-motion";
import { Quantico } from "next/font/google";

const quantico = Quantico({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const reasons = [
    {
        title: "Engineering-first approach",
        description: "We focus on building reliable digital infrastructure that supports long-term growth.",
    },
    {
        title: "Marketing + technology integration",
        description: "Our solutions combine engineering with growth strategies.",
    },
    {
        title: "Scalable systems",
        description: "We design systems that evolve as your business grows.",
    },
    {
        title: "Long-term digital infrastructure",
        description: "Our goal is to build platforms that support sustainable digital transformation.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function WhyWorkWithUs() {
    return (
        <section className="px-6 py-24 max-w-7xl mx-auto">
            <div className="mb-16 inline-block">
                <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3 ${quantico.className}`}>
                    Why Work With Us
                </h2>
                <div className="w-full h-1 bg-white/20 relative rounded-full overflow-hidden">
                    <motion.div 
                        className="absolute top-0 bottom-0 w-20 bg-purple-600 rounded-full"
                        animate={{ 
                            left: ["0%", "100%"],
                            x: ["0%", "-100%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl space-y-8"
            >
                {reasons.map((reason, index) => (
                    <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="flex gap-6 items-start relative border-l border-white/10 pl-6"
                    >
                        <div className="flex-grow">
                            <h3 className={`text-lg md:text-xl font-bold text-white mb-1.5 ${quantico.className}`}>
                                {reason.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-2xl">
                                {reason.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
