"use client";

import { motion } from "framer-motion";
import { Quantico } from "next/font/google";
import Carousel from "./Carousel";
import { FiEyeOff, FiLayout, FiSettings, FiDatabase, FiServer, FiTrendingUp, FiZap, FiLayers, FiCpu, FiCode, FiTarget } from "react-icons/fi";

const quantico = Quantico({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function MissionSection() {
    const problemItems = [
        {
            title: "Low Online Visibility",
            description: "Struggling to be found by target audience.",
            id: 1,
            icon: <FiEyeOff className="carousel-icon" />,
            bgImage: '/Low-online-visibility.webp'
        },
        {
            title: "Outdated Websites",
            description: "Legacy designs that fail to engage or convert.",
            id: 2,
            icon: <FiLayout className="carousel-icon" />,
            bgImage: '/Outdated-website-design.webp'
        },
        {
            title: "Lack of Automation",
            description: "Manual processes slowing down operations.",
            id: 3,
            icon: <FiSettings className="carousel-icon" />,
            bgImage: '/Lack-of-automation.webp'
        },
        {
            title: "Poor Data Utilization",
            description: "Missing out on actionable insights.",
            id: 4,
            icon: <FiDatabase className="carousel-icon" />,
            bgImage: '/Poor-data-utalization.webp'
        },
        {
            title: "Inefficient Systems",
            description: "Fragmented tools creating bottlenecks.",
            id: 5,
            icon: <FiServer className="carousel-icon" />,
            bgImage: '/Fragmented-systems.webp'
        }
    ];

    const helpItems = [
        {
            title: "Grow Online Visibility",
            description: "Strategic SEO, content marketing, and digital campaigns that put your brand in front of the right audience — consistently.",
            icon: <FiTrendingUp className="w-7 h-7" />,
            stat: "3x",
            statLabel: "avg. traffic growth",
            bgImage: '/Grow-Online-Visibility.webp'
        },
        {
            title: "Automate Operations",
            description: "Replace repetitive tasks with intelligent workflows. From invoicing to customer onboarding — we build systems that run while you sleep.",
            icon: <FiZap className="w-7 h-7" />,
            stat: "60%",
            statLabel: "time saved on ops",
            bgImage: '/Automate-Operations.webp'
        },
        {
            title: "Build Scalable Platforms",
            description: "Cloud-native web apps, SaaS platforms, and internal tools engineered to handle growth without breaking.",
            icon: <FiLayers className="w-7 h-7" />,
            stat: "99.9%",
            statLabel: "uptime guaranteed",
            bgImage: '/Scalable-platforms.webp'
        },
        {
            title: "Leverage Data & AI",
            description: "Turn raw data into competitive advantage. Custom dashboards, predictive models, and AI copilots tailored to your business.",
            icon: <FiCpu className="w-7 h-7" />,
            stat: "10x",
            statLabel: "faster insights",
            bgImage: '/Data-Systems-AI.webp'
        }
    ];

    const combinesItems = [
        {
            title: "Engineering",
            description: "Full-stack development with modern frameworks, cloud infrastructure, and DevOps best practices.",
            icon: <FiCode className="w-6 h-6" />
        },
        {
            title: "Marketing",
            description: "Data-driven growth strategies, SEO, paid media, and conversion optimization.",
            icon: <FiTarget className="w-6 h-6" />
        },
        {
            title: "Data Systems",
            description: "Scalable pipelines, real-time analytics, and business intelligence platforms.",
            icon: <FiDatabase className="w-6 h-6" />
        },
        {
            title: "Artificial Intelligence",
            description: "Machine learning models, NLP, computer vision, and intelligent automation.",
            icon: <FiCpu className="w-6 h-6" />
        }
    ];

    return (
        <section className="relative py-28 px-6 overflow-hidden">
            {/* Unified Backdrop Blur layer */}
            <div className="absolute inset-0 bg-transparent backdrop-blur-3xl border-y border-white/5 pointer-events-none -z-10"></div>
            
            {/* Section Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] pointer-events-none -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className={`max-w-4xl mx-auto text-center relative z-10 ${quantico.className}`}>
                
                {/* Problems Part */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Mobile Only: Logo positioned above heading */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        whileInView={{ 
                            opacity: 1, 
                            scale: 1, 
                            rotate: 0,
                            transition: { duration: 1, ease: "easeOut" }
                        }}
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 3, 0]
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 1 },
                            scale: { duration: 1 }
                        }}
                        viewport={{ once: true }}
                        className="w-24 h-24 mx-auto mb-6 block sm:hidden pointer-events-none"
                    >
                        <img 
                            src="/problem-solving.webp" 
                            alt="Problem Solving Accent" 
                            className="w-full h-auto object-contain opacity-90"
                        />
                    </motion.div>

                    <div className="relative inline-block mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
                            Problems We Solve
                        </h2>
                        {/* Static/Decorative Image from Resources */}
                        <motion.div
                            initial={{ opacity: 0, x: 40, scale: 0.5, rotate: 10 }}
                            whileInView={{ 
                                opacity: 1, 
                                x: 0, 
                                scale: 1, 
                                rotate: 0,
                                transition: { duration: 1, ease: "easeOut" }
                            }}
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 1 },
                                x: { duration: 1 },
                                scale: { duration: 1 }
                            }}
                            viewport={{ once: true }}
                            className="absolute -right-24 md:-right-36 -top-4 md:-top-10 w-24 md:w-36 h-24 md:h-36 pointer-events-none z-0 hidden sm:block"
                        >
                            <img 
                                src="/problem-solving.webp" 
                                alt="Problem Solving Accent" 
                                className="w-full h-auto object-contain opacity-80"
                            />
                        </motion.div>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6 tracking-wide leading-relaxed">
                        Businesses today struggle with fragmented technology and inefficient systems.
                    </p>

                    <p className="text-lg text-purple-400 font-bold mb-12 tracking-wider">
                        Key Challenges:
                    </p>

                    <div className="w-full flex justify-center mb-20" style={{ height: '350px', position: 'relative' }}>
                        <Carousel
                            items={problemItems}
                            baseWidth={330}
                            autoplay
                            autoplayDelay={2000}
                            pauseOnHover
                            loop
                            round={false}
                        />
                    </div>

                    <p className="text-xl md:text-2xl text-purple-300 font-bold mb-16 max-w-2xl mx-auto">
                        Our services are designed to solve these problems through modern digital infrastructure.
                    </p>
                </motion.div>

                {/* ═══════════════ WHAT WE BUILD FOR YOU ═══════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="border-t border-white/5 pt-20"
                >
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">What We Build For You</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                            Systems designed to help you
                        </h3>
                    </motion.div>

                    {/* Help Items — Premium Icon Cards with Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28 max-w-5xl mx-auto">
                        {helpItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
                                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-left backdrop-blur-xl overflow-hidden"
                            >
                                {/* Background Image */}
                                {item.bgImage && (
                                    <div 
                                        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 pointer-events-none transition-opacity duration-500"
                                        style={{ backgroundImage: `url(${item.bgImage})` }}
                                    />
                                )}
                                {/* Overlay */}
                                {item.bgImage && (
                                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
                                )}

                                <div className="relative z-10">
                                    {/* Icon */}
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
                    </div>

                    {/* ═══════════════ OUR DISCIPLINES ═══════════════ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Our Core Disciplines</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                            We combine four pillars
                        </h3>
                    </motion.div>

                    {/* Disciplines Grid with Connectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-20 max-w-5xl mx-auto">
                        {combinesItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Connector line (hidden on first item and mobile) */}
                                {i > 0 && (
                                    <div className="hidden lg:block absolute -left-0 top-8 w-[1px] h-10 bg-gradient-to-b from-purple-500/40 to-transparent"></div>
                                )}

                                {/* Pillar Card */}
                                <div className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] w-full mx-2">
                                    {/* Numbered badge */}
                                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px] font-black text-purple-300 tracking-wider">
                                        0{i + 1}
                                    </div>

                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-white/10 flex items-center justify-center text-purple-400 mx-auto mb-4">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">{item.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                                </div>

                                {/* "+" connector between items */}
                                {i < combinesItems.length - 1 && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 items-center justify-center text-purple-400 text-xs font-black z-10"
                                    >
                                        +
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* ═══════════════ CLOSING STATEMENT ═══════════════ */}
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1.2 }}
                        className="relative py-8"
                    >
                        {/* Pulsing glow behind text */}
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-cyan-500/10 blur-3xl pointer-events-none"
                        ></motion.div>

                        <p className="relative z-10 text-3xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                            To deliver real<br />business growth.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
