"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import MagneticButton from "./MagneticButton";

export default function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, services: selectedServices })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      setSelectedServices([]);

      // Reset success state after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    }
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

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Spam Protection Honeypot */}
        <input 
          type="text" 
          id="website" 
          value={formData.website} 
          onChange={handleInputChange} 
          className="hidden" 
          tabIndex={-1} 
          autoComplete="off" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
              Name <span className="text-purple-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              disabled={status === 'loading'}
              placeholder="John Doe"
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
              Email <span className="text-purple-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              disabled={status === 'loading'}
              placeholder="john@example.com"
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
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
            value={formData.phone}
            onChange={handleInputChange}
            disabled={status === 'loading'}
            placeholder="+1 (555) 000-0000"
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
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
                disabled={status === 'loading'}
                onClick={() => toggleService(service)}
                className={`px-5 py-2.5 rounded-full border transition-all cursor-pointer focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
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
            Message <span className="text-purple-500">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            disabled={status === 'loading'}
            placeholder="Tell us about your project..."
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none disabled:opacity-50"
          ></textarea>
        </div>

        {/* Feedback Messages */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center"
            >
              Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center pt-4">
          <MagneticButton
            type="submit"
            disabled={status === 'loading'}
            className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}
