"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function RelatedServices({ currentSlug }: { currentSlug: string }) {
    const related = SERVICES.filter((service) => service.slug !== currentSlug);

    return (
        <section className="px-6 mb-32 max-w-[1320px] mx-auto">
            <div className="mb-12 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-accent font-bold mb-4">One Connected System</p>
                <h2 className={`text-2xl md:text-3xl font-bold text-white`}>
                    Related Services
                </h2>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid gap-6 grid-cols-1 md:grid-cols-3"
            >
                {related.map((service) => (
                    <motion.div key={service.slug} variants={itemVariants}>
                        <Link
                            href={`/services/${service.slug}`}
                            className="group relative block h-full border border-line bg-panel p-7 transition-all duration-300 hover:border-line-3 hover:bg-panel-hover"
                        >
                            <h3 className={`text-lg font-bold text-white mb-2`}>
                                {service.shortTitle}
                            </h3>
                            <p className="text-muted text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>
                            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:text-accent-hi transition-colors">
                                Learn more
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
