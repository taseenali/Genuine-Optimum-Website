"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { Quantico } from "next/font/google";

const quantico = Quantico({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const teamMembers = [
    { name: "Alex Rivera", role: "Founder & CEO", image: null },
    { name: "Sarah Chen", role: "Lead Systems Architect", image: null },
    { name: "Marcus Thorne", role: "Head of AI Solutions", image: null },
    { name: "Elena Volkov", role: "Senior Web Engineer", image: null },
    { name: "Jordan Brooks", role: "Operations Director", image: null },
];

function StaffCard({ name, role, image }: { name: string, role: string, image: string | null }) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion values for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for rotation
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    // Transform rotation values - very subtle 5 degree max tilt
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    // Calculate mouse position relative to card center
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: "1000px" }}>
            <motion.div
                ref={cardRef}
                style={{
                    transformStyle: "preserve-3d",
                }}
                className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            >
                {/* Background Image/Placeholder */}
                <div className="absolute inset-0 z-0 transition-transform duration-700">
                    {image ? (
                        <img 
                            src={image} 
                            alt={name} 
                            className="w-full h-full object-cover grayscale transition-all duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                            <div className="flex flex-col items-center opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-[10px] uppercase tracking-widest font-bold">Photo Pending</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Overlays for depth and readability */}
                {/* 1. Main dark gradient from top to bottom */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />



                {/* Staff Content - Top Aligned */}
                <div 
                    className="absolute top-0 left-0 right-0 p-8 z-30" 
                    style={{ transform: "translateZ(40px)" }}
                >
                    <motion.div
                         initial={{ opacity: 0.8 }}
                         whileHover={{ opacity: 1 }}
                    >
                        <h3 className={`text-2xl font-bold text-white mb-0.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${quantico.className}`}>
                            {name}
                        </h3>
                        <p className="text-purple-400 font-bold text-[10px] tracking-[0.2em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {role}
                        </p>
                    </motion.div>
                </div>
                

            </motion.div>
        </div>
    );
}

export default function Team() {
    return (
        <section className="px-6 mb-32 max-w-7xl mx-auto">
            <div className="mb-16 inline-block">
                <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3 ${quantico.className}`}>
                    Our Global Team
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {teamMembers.map((member, index) => (
                    <StaffCard key={index} name={member.name} role={member.role} image={member.image} />
                ))}
            </div>
        </section>
    );
}
