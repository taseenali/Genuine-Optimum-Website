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
    offset: ["start 0.65", "end 0.25"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.floor(latest * 6) - 1;
    setActiveStep(Math.min(Math.max(step, -1), 4));
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const markerTop = useTransform(scrollYProgress, [0, 0.95], ["2%", "90%"]);

  const nodes = [
    {
      title: "Discovery & Business Understanding",
      desc: "We analyze your business goals, technology landscape, and growth opportunities to map a clear path forward.",
      number: "01",
      icon: <FiSearch className="w-5 h-5" />,
    },
    {
      title: "Strategy & System Architecture",
      desc: "We design a scalable system architecture tailored to your technical requirements and business needs.",
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

        {/* ═══════════════ 2.5D ROAD LAYOUT ═══════════════ */}
        <div className="relative">

          {/* ── THE ROAD ── */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-20 md:w-24 z-0">
            {/* Road surface with 3D inset shadow */}
            <div
              className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-neutral-800/30 via-neutral-800/50 to-neutral-800/30"
              style={{
                boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.4), inset 6px 0 12px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.3)'
              }}
            />
            {/* Road edge lines */}
            <div className="absolute left-1 top-4 bottom-4 w-[1px] bg-white/[0.06] rounded-full" />
            <div className="absolute right-1 top-4 bottom-4 w-[1px] bg-white/[0.06] rounded-full" />
            {/* Road center dashed line */}
            <div
              className="absolute left-1/2 -translate-x-[0.5px] top-6 bottom-6 w-[2px] rounded-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 14px, transparent 14px, transparent 32px)'
              }}
            />
            {/* Animated progress glow overlay */}
            <motion.div
              className="absolute inset-x-1 top-0 rounded-[40px] overflow-hidden"
              style={{ height: progressHeight }}
            >
              <div className="w-full h-full bg-gradient-to-b from-purple-500/25 via-purple-400/15 to-purple-500/25 rounded-[40px]" />
              {/* Glow edge */}
              <div className="absolute inset-0 rounded-[40px]" style={{ boxShadow: '0 0 40px rgba(168,85,247,0.2)' }} />
            </motion.div>
          </div>

          {/* ── 3D CAR MARKER ── */}
          <motion.div
            className="absolute left-8 md:left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            style={{ top: markerTop }}
          >
            <div className="relative flex flex-col items-center" style={{ transform: 'rotate(180deg) translateY(20px)' }}>
              {/* Car body container */}
              <div className="relative" style={{ width: '34px', height: '70px' }}>

                {/* Wheels */}
                <div className="absolute top-[12px] -left-[2px] w-[4px] h-[14px] bg-black rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                <div className="absolute top-[12px] -right-[2px] w-[4px] h-[14px] bg-black rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                <div className="absolute bottom-[12px] -left-[2px] w-[4px] h-[14px] bg-black rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                <div className="absolute bottom-[12px] -right-[2px] w-[4px] h-[14px] bg-black rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />

                {/* Main Body */}
                <div
                  className="absolute inset-0 rounded-[14px_14px_12px_12px] bg-gradient-to-b from-purple-400 via-purple-600 to-purple-900 overflow-hidden"
                  style={{
                    boxShadow: '0 10px 20px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.5), inset 0 -2px 5px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.4)'
                  }}
                >
                  {/* Metallic highlight down the center */}
                  <div className="absolute inset-x-[25%] top-0 bottom-0 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[1px]" />
                </div>

                {/* Hood details (creases) */}
                <div className="absolute top-[8px] left-[8px] w-[1px] h-[16px] bg-white/20 shadow-[1px_0_0_rgba(0,0,0,0.2)]" style={{ transform: 'rotate(10deg)' }} />
                <div className="absolute top-[8px] right-[8px] w-[1px] h-[16px] bg-white/20 shadow-[-1px_0_0_rgba(0,0,0,0.2)]" style={{ transform: 'rotate(-10deg)' }} />

                {/* Front Windshield */}
                <div
                  className="absolute top-[24px] left-[3px] right-[3px] h-[14px] rounded-[6px_6px_2px_2px] bg-gradient-to-b from-cyan-900 to-black overflow-hidden"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)' }}
                >
                  {/* Reflection */}
                  <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-white/10 skew-x-[25deg]" />
                </div>

                {/* Cabin / Roof */}
                <div
                  className="absolute top-[38px] left-[5px] right-[5px] h-[16px] rounded-[3px] bg-gradient-to-b from-purple-500 to-purple-800"
                  style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)' }}
                >
                  <div className="absolute inset-x-[20%] top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Rear Window */}
                <div
                  className="absolute top-[54px] left-[4px] right-[4px] h-[6px] rounded-[1px_1px_4px_4px] bg-gradient-to-t from-cyan-900 to-black overflow-hidden"
                  style={{ boxShadow: 'inset 0 -1px 2px rgba(255,255,255,0.2)' }}
                >
                  {/* Reflection */}
                  <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-white/10 skew-x-[-20deg]" />
                </div>

                {/* Headlights */}
                <div className="absolute top-[3px] left-[4px] w-[6px] h-[4px] bg-white rounded-full" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.9), 0 -5px 15px rgba(168,255,255,0.8)', transform: 'rotate(-10deg)' }} />
                <div className="absolute top-[3px] right-[4px] w-[6px] h-[4px] bg-white rounded-full" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.9), 0 -5px 15px rgba(168,255,255,0.8)', transform: 'rotate(10deg)' }} />
                
                {/* Headlight Beams */}
                <div className="absolute -top-[30px] left-[2px] right-[2px] h-[34px] bg-gradient-to-t from-white/30 via-cyan-100/10 to-transparent blur-[4px] rounded-t-[20px] pointer-events-none" />

                {/* Taillights */}
                <div className="absolute bottom-[2px] left-[4px] w-[6px] h-[3px] bg-red-500 rounded-full" style={{ boxShadow: '0 2px 8px rgba(239,68,68,0.9)' }} />
                <div className="absolute bottom-[2px] right-[4px] w-[6px] h-[3px] bg-red-500 rounded-full" style={{ boxShadow: '0 2px 8px rgba(239,68,68,0.9)' }} />

                {/* Mirrors */}
                <div className="absolute top-[26px] -left-[3px] w-[4px] h-[6px] rounded-l-[3px] bg-gradient-to-b from-purple-400 to-purple-600" style={{ transform: 'skewY(-30deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
                <div className="absolute top-[26px] -right-[3px] w-[4px] h-[6px] rounded-r-[3px] bg-gradient-to-b from-purple-400 to-purple-600" style={{ transform: 'skewY(30deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />

              </div>

              {/* Ground shadow beneath car */}
              <div
                className="w-8 h-3 rounded-[50%] bg-purple-500/30 blur-md mt-1"
              />
              {/* Glow trail behind car */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-transparent via-purple-500/20 to-purple-500/5 blur-sm"
              />
            </div>
          </motion.div>

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
