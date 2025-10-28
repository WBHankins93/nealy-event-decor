"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import TopNav from "./header/TopNav";
import LogoBanner from "./header/LogoBanner";
import BottomNav from "./header/BottomNav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-pearl-white/95 backdrop-blur-md shadow-lg"
          : "bg-pearl-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-custom relative">
        {/* Top Navigation Bar */}
        <TopNav />

        {/* Logo Banner */}
        <LogoBanner />

        {/* Bottom Navigation Bar */}
        <BottomNav />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden absolute top-1/2 right-4 -translate-y-1/2 p-2 text-charcoal-black hover:text-signature-gold transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-pearl-white/98 backdrop-blur-md border-t border-signature-gold/20"
          >
            <nav className="container-custom py-8 space-y-6">
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-montserrat tracking-wide uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-montserrat tracking-wide uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
              >
                Gallery
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-montserrat tracking-wide uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
              >
                Services
              </Link>
              <Link
                href="/rentals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-montserrat tracking-wide uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
              >
                Rentals
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-montserrat tracking-wide uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}