"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { useRouter } from "next/navigation";
import { FiSearch, FiCpu, FiCode, FiCheckCircle, FiSend } from 'react-icons/fi';

export default function Roadmap() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Safely expands the offset bounds so scrolling to the bottom of 
    // a short page guarantees we reach 1.0 safely inside the viewport.
    offset: ["start 0.6", "end 0.9"],
  });

  // Clamp raw progress robustly to prevent overscroll/bounce issues on mobile
  const clampedProgress = useTransform(scrollYProgress, (v) => Math.min(Math.max(v, 0), 1));

  useMotionValueEvent(clampedProgress, "change", (latest) => {
    // Explicit discrete locking based on solid percentage brackets, 
    // replacing drift-prone mathematical multiplications.
    let step = -1;
    if (latest >= 0.05) step = 0;
    if (latest >= 0.25) step = 1;
    if (latest >= 0.45) step = 2;
    if (latest >= 0.65) step = 3;
    if (latest >= 0.85) step = 4; // Safely catches final step well before 1.0!
    
    setActiveStep(step);
  });

  const progressHeight = useTransform(clampedProgress, [0, 1], ["0%", "100%"]);

  const nodes = [
    {
      title: "Discovery & Business Understanding",
      desc: "We analyze your business goals, technology landscape, and growth opportunities to map a clear path forward.",
      number: "01",
      icon: <FiSearch className="w-5 h-5" />,
    },
    {
      title: "Strategy & System Architecture",
      desc: "We design a scalable system architecture that fits your technical requirements and business needs.",
      number: "02",
      icon: <FiCpu className="w-5 h-5" />,
    },
    {
      title: "Development & Implementation",
      desc: "Our engineers build and integrate the required systems, platforms, and digital infrastructure.",
      number: "03",
      icon: <FiCode className="w-5 h-5" />,
    },
    {
      title: "Testing & Optimization",
      desc: "We rigorously test performance, security, and functionality to ensure enterprise-grade reliability.",
      number: "04",
      icon: <FiCheckCircle className="w-5 h-5" />,
    },
    {
      title: "Deployment & Long-Term Support",
      desc: "We deploy the final system and provide ongoing support, monitoring, and optimization for sustained growth.",
      number: "05",
      icon: <FiSend className="w-5 h-5" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="w-full py-20 flex flex-col items-center relative z-10 px-6 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-transparent backdrop-blur-xl border-y border-white/10 pointer-events-none z-0" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-cyan-500/10 blur-[100px] opacity-60" />
      </div>

      <div className="w-full max-w-6xl relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">How We Work</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Our Execution Process
          </h2>
        </motion.div>

        {/* ═══════════════ TIMELINE LAYOUT ═══════════════ */}
        <div className="relative">

          {/* ── TIMELINE TRACK ── */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] z-0 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 bg-purple-400 rounded-full"
              style={{ height: progressHeight }}
            />
          </div>

          {/* ── PROCESS NODES ── */}
          <div className="relative z-10 flex flex-col gap-16 md:gap-24 py-8">
            {nodes.map((node, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activeStep >= i;

              return (
                <div
                  key={i}
                  className={`relative flex items-center min-h-[160px] ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* ── Road Node Marker (3D cylinder) ── */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="relative"
                    >
                      {/* Main circle */}
                      <div
                        className={`w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center transition-all duration-700 border-2 ${
                          isActive
                            ? 'bg-gradient-to-br from-purple-500/40 to-indigo-600/30 border-purple-400 text-white'
                            : 'bg-neutral-900 border-neutral-600 text-neutral-500'
                        }`}
                        style={{
                          boxShadow: isActive
                            ? '0 0 35px rgba(168,85,247,0.5), 0 10px 30px rgba(0,0,0,0.6), inset 0 -4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)'
                            : '0 10px 25px rgba(0,0,0,0.5), inset 0 -4px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        <span className="text-xl font-black tracking-wider">{node.number}</span>
                      </div>
                      {/* 3D base shadow (ellipse beneath the circle) */}
                      <div
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-[50%] blur-sm transition-all duration-700 ${
                          isActive ? 'bg-purple-500/30' : 'bg-black/30'
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* ── Content Card (3D-elevated) ── */}
                  <div className={`w-full pl-24 md:pl-0 md:w-[44%] ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    >
                      <div
                        className={`relative p-6 md:p-7 rounded-2xl border transition-all duration-700 ${
                          isActive
                            ? 'bg-white/[0.05] border-purple-500/25'
                            : 'bg-white/[0.02] border-white/5'
                        }`}
                        style={{
                          boxShadow: isActive
                            ? '0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.08), 0 0 50px rgba(168,85,247,0.06)'
                            : '0 20px 50px rgba(0,0,0,0.4)',
                          transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                          transition: 'transform 0.7s ease, box-shadow 0.7s ease',
                        }}
                      >
                        {/* 3D platform shadow beneath card */}
                        <div className="absolute -bottom-3 left-4 right-4 h-6 bg-black/25 rounded-2xl blur-lg -z-10" />

                        {/* Step icon + label */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-700 ${
                              isActive
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                : 'bg-white/5 text-neutral-500 border border-white/5'
                            }`}
                          >
                            {node.icon}
                          </div>
                          <span
                            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-700 ${
                              isActive ? 'text-purple-400' : 'text-neutral-600'
                            }`}
                          >
                            Step {node.number}
                          </span>
                        </div>

                        <h3
                          className={`text-lg font-bold mb-2 transition-colors duration-700 ${
                            isActive ? 'text-white' : 'text-neutral-400'
                          }`}
                        >
                          {node.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed transition-colors duration-700 ${
                            isActive ? 'text-gray-300' : 'text-neutral-600'
                          }`}
                        >
                          {node.desc}
                        </p>

                        {/* Connector line from card to road (desktop) */}
                        <div
                          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] w-10 transition-all duration-700 ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-500/50 to-transparent'
                              : 'bg-white/5'
                          } ${isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full rotate-180'}`}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Call to Action ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex justify-center mt-16"
        >
          <MagneticButton
            className="bg-white text-black px-9 py-3.5 rounded-full font-bold text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
            onClick={() => router.push('/contact')}
          >
            Book Now
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
