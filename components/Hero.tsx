"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
            <div className="flex flex-col items-center z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white text-center max-w-[90vw] leading-tight break-words mb-4"
                >
                    Lets Talk Business
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-xl md:text-2xl font-medium text-gray-300 tracking-wide text-center"
                >
                    Build, Rank & Scale
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-10 w-full px-4"
                >
                    {/* Primary CTA */}
                    <MagneticButton className="bg-white text-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] w-full md:w-auto">
                        Get Started
                    </MagneticButton>

                    {/* Secondary CTA */}
                    <MagneticButton className="bg-white/5 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] w-full md:w-auto">
                        Learn More
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
