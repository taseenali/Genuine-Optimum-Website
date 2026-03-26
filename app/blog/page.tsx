"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MagneticButton from '@/components/MagneticButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function BlogUnderConstruction() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 w-full overflow-hidden">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className={`flex-grow flex flex-col items-center justify-center relative pt-32 pb-20 ${inter.className}`}>
                    {/* Background Glows */}
                    <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                    <div className="absolute bottom-[20%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

                    <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center">
                        
                        {/* Under Construction Pill */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
                            <span className="text-sm font-medium text-purple-200 tracking-wider">Under Construction</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
                        >
                            Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Great</span><br className="hidden md:block"/> is Coming.
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                        >
                            We’re busy crafting insightful articles, guides, and engineering logs. 
                            Our blog is currently under construction, but check back soon to explore our thoughts on technology and design.
                        </motion.p>

                        {/* Go Back Home Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <MagneticButton
                                onClick={() => router.push('/')}
                                className="relative overflow-hidden group/btn bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 mx-auto"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <svg className="w-3.5 h-3.5 group-hover/btn:-translate-x-1 transition-all duration-300 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    Return Home
                                </span>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            </MagneticButton>
                        </motion.div>

                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
