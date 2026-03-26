"use client";

import { motion, Variants } from "framer-motion";
import { Black_Ops_One, Quantico } from "next/font/google";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Particles from "../../../components/Particles";
import MagneticButton from "../../../components/MagneticButton";
import { useRouter } from "next/navigation";

const blackOpsOne = Black_Ops_One({
    weight: "400",
    subsets: ["latin"],
});

const quantico = Quantico({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const capabilities = [
    {
        category: "Technical Foundation",
        items: [
            {
                title: "Technical SEO",
                description: "We audit and optimize your website architecture, page speed, crawlability, and technical foundations to ensure search engines can properly index and rank your site.",
            },
            {
                title: "On-Page Optimization",
                description: "We optimize content structure, keywords, metadata, and page relevance to maximize search performance.",
            },
        ],
    },
    {
        category: "Authority & Visibility",
        items: [
            {
                title: "Local SEO",
                description: "For service-based businesses, we improve local search visibility and map rankings to attract customers in your service area.",
            },
            {
                title: "Link Authority Development",
                description: "We build domain authority through strategic outreach, backlinks, and digital PR strategies.",
            },
        ],
    },
    {
        category: "Content Growth",
        items: [
            {
                title: "SEO Content Systems",
                description: "We develop scalable content frameworks that continuously attract organic traffic and build topical authority.",
            },
        ],
    },
];


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function SEOPage() {
    const router = useRouter();

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

                <main className="flex-grow pt-32 pb-20">
                    {/* Hero Section */}
                    <section className="px-6 mb-24 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className={`text-4xl md:text-7xl font-extrabold text-[#a855f7] mb-6 ${blackOpsOne.className}`}>
                                SEARCH VISIBILITY & SEO
                            </h1>
                            <p className={`text-xl md:text-2xl text-gray-300 font-medium tracking-wide max-w-3xl mx-auto ${quantico.className}`}>
                                Build long-term organic growth and attract high-quality customers.
                            </p>
                        </motion.div>
                    </section>

                    {/* Intro Section */}
                    <section className="px-6 mb-32 relative">
                        <div className="absolute inset-0 bg-transparent backdrop-blur-3xl border-y border-white/5 pointer-events-none -z-10"></div>
                        <div className="max-w-4xl mx-auto py-16 text-center">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="text-lg md:text-xl text-gray-400 leading-relaxed"
                            >
                                We design and implement search visibility systems that help businesses generate consistent traffic, leads, and brand authority. Our approach focuses on long-term growth by combining technical SEO, content strategy, and authority building.
                            </motion.p>
                        </div>
                    </section>

                    {/* Capabilities (Cards) */}
                    <section className="px-6 mb-32 max-w-7xl mx-auto">
                        <div className="mb-16 inline-block">
                            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3 ${quantico.className}`}>
                                Our Capabilities
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
                            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {capabilities.map((group, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-8 relative z-10 ${quantico.className} text-purple-400`}>
                                        {group.category}
                                    </h3>

                                    <div className="space-y-8 relative z-10 flex-grow">
                                        {group.items.map((item, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-400 leading-relaxed text-sm md:text-base pl-3.5 border-l border-white/10">
                                                    {item.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                        </motion.div>
                    </section>

                    {/* Closing Section */}
                    <section className="px-6 mb-20 max-w-5xl mx-auto text-center relative z-20">
                        {/* Background glow drop */}
                        <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full -z-10 pointer-events-none transition-opacity duration-700"></div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            className="relative group p-[1px] rounded-[2.5rem] overflow-hidden"
                        >
                            {/* Animated gradient border */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 via-transparent to-blue-600 opacity-40 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]"></span>
                            
                            <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-black/90 backdrop-blur-3xl overflow-hidden flex flex-col items-center justify-center border border-white/5">
                                {/* Subtle decorative top/bottom lines */}
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50"></div>
                                <div className="absolute right-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>
                                
                                {/* Inner animated glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-700"></div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className="relative z-10"
                                >
                                    <h2 className="text-lg md:text-xl font-light mb-6 leading-relaxed tracking-wide text-white">
                                        Our SEO strategies are built for sustainable growth, helping businesses build strong digital visibility that compounds over time.
                                    </h2>
                                    
                                    <div className="mt-8 flex justify-center">
                                        <MagneticButton
                                            className="relative overflow-hidden group/btn bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                                            onClick={() => router.push('/contact')}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Start Your SEO Journey
                                                <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:text-purple-600 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            {/* Button hover effect overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-indigo-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                        </MagneticButton>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
