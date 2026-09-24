"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The only entrance motion on the site: a short fade with a 12px
 * rise. Deliberately the same everywhere, so sections feel like
 * one document settling rather than a sequence of separate
 * animations competing for attention.
 *
 * framer-motion respects prefers-reduced-motion for transforms
 * via the global CSS override, and `once` means nothing re-plays
 * on scroll-back.
 */
export default function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
