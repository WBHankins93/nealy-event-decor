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
      setIsScrolled(window.scrollY > 100);
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
      {/* Top Navigation Bar - FULL WIDTH */}
      <TopNav 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isScrolled={isScrolled}
      />

      {/* Logo Banner - FULL WIDTH - Hide when scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LogoBanner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar - Contained - Hide when scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            className="container-custom"
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BottomNav />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-pearl-white/98 backdrop-blur-md border-t border-signature-gold/20"
          >
            <nav className="container-custom py-8 space-y-6">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-montserrat tracking-wide uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
              >
                Home
              </Link>
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