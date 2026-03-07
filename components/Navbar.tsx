"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ShinyText from "./reactbits/ShinyText";
import ShinyOverlay from "./reactbits/ShinyOverlay";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled
        ? "bg-black/40 backdrop-blur-xl py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Column 1: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-lg sm:text-xl font-bold tracking-tighter text-white flex items-center gap-2 sm:gap-3 transition-transform hover:scale-105 duration-300 group">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                <Image
                  src="/gologo.webp"
                  alt="Genuine Optimum Logo"
                  fill
                  className="object-contain"
                  priority
                />
                {/* Shiny Overlay specifically masked to the logo image shape */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    maskImage: 'url(/gologo.webp)',
                    maskSize: 'contain',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    WebkitMaskImage: 'url(/gologo.webp)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat'
                  }}
                >
                  <ShinyOverlay
                    speed={2.9}
                    delay={0}
                    shineColor="#6600ff"
                    spread={35}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                  />
                </div>
              </div>
              <ShinyText
                text="Genuine Optimum"
                speed={2.9}
                delay={0}
                color="#ffffff"
                shineColor="#6600ff"
                spread={35}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </Link>
          </div>

          {/* Column 2: Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1 p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 px-5 py-2 rounded-full text-sm font-medium">
                Home
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 px-5 py-2 rounded-full text-sm font-medium">
                Services
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 px-5 py-2 rounded-full text-sm font-medium">
                Contact
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 px-5 py-2 rounded-full text-sm font-medium">
                About
              </Link>
            </div>
          </div>

          {/* Column 3: Spacer for layout balance */}
          <div className="hidden md:flex items-center justify-end min-w-[200px]">
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out bg-black/80 backdrop-blur-2xl border-b border-white/5 ${isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0 border-transparent"
          }`}
        id="mobile-menu"
      >
        <div className="px-6 space-y-2">
          <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-base font-medium transition-all">
            Home
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-base font-medium transition-all">
            Services
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-base font-medium transition-all">
            Contact
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-base font-medium transition-all">
            About
          </Link>
        </div>


      </div>
    </nav>
  );
}
