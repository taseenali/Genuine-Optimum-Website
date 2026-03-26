"use client";

import { motion } from "framer-motion";
import { Black_Ops_One, Quantico } from "next/font/google";
import MagneticButton from "./MagneticButton";
import { useRouter } from "next/navigation";


const blackOpsOne = Black_Ops_One({
    weight: "400",
    subsets: ["latin"],
});

const quantico = Quantico({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function Hero() {
    const router = useRouter();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 bg-transparent">
            <div className="flex flex-col items-center z-10 w-full max-w-[1200px] pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#a855f7] text-center max-w-[90vw] leading-tight break-words mb-4 ${blackOpsOne.className}`}
                >
                    Digital Solutions
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`text-xl md:text-2xl font-medium text-gray-300 tracking-wide text-center max-w-2xl mx-auto ${quantico.className}`}
                >
                    Genuine Optimum is a digital engineering and growth systems company that builds scalable technology infrastructure for modern businesses.                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="text-base md:text-lg text-gray-400 mt-4 text-center max-w-2xl px-4"
                >
                    Book Your Free Consultation to See What Your Business Is Truly Capable Of!!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-10 w-full px-4 pointer-events-auto"
                >
                    {/* Primary CTA */}
                    <MagneticButton
                        className="bg-white text-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] w-full md:w-auto"
                        onClick={() => {
                            const section = document.getElementById('process');
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        Execution Process
                    </MagneticButton>

                    {/* Secondary CTA */}
                    <MagneticButton
                        className="bg-white/5 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] w-full md:w-auto"
                        onClick={() => router.push('/contact')}
                    >
                        Claim Free Consultation
                    </MagneticButton>

                </motion.div>
            </div>
        </section>
    );
}
