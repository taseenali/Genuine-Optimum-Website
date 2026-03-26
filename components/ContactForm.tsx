"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import MagneticButton from "./MagneticButton";

export default function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
 
  const services = [
    "Web Development",
    "SEO Optimization",
    "Custom Software",
    "AI & Data Systems",
    "Not Sure Yet"
  ];
 
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
    >
      <div className="mb-10 text-center">
        <div className="inline-block py-2">
          <h2 className="text-4xl font-bold mb-4">
            <ShinyText
              text="Get in Touch"
              speed={3}
              color="#ffffff"
              shineColor="#a855f7"
              spread={100}
            />
          </h2>
        </div>
        <p className="text-gray-400 text-lg">
          Have a project in mind? Let's build something extraordinary together.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-300 ml-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+1 (555) 000-0000"
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-300 ml-1 block">
            Service
          </label>
          <div className="flex flex-wrap gap-3">
            {services.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`px-5 py-2.5 rounded-full border transition-all cursor-pointer focus:outline-none text-sm ${
                  selectedServices.includes(service)
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-purple-500/50 hover:text-white"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex justify-center pt-4">
          <MagneticButton
            className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Send Message
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}
