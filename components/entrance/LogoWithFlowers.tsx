"use client";

import { motion } from "framer-motion";

export default function LogoWithFlowers() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1.5,
        delay: 1.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="relative text-center z-40"
    >
      {/* Decorative wildflowers - Top Left */}
      <motion.div
        initial={{ opacity: 0, rotate: -20, x: -20 }}
        animate={{ opacity: 1, rotate: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute -top-12 -left-16 md:-left-24"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-70">
          {/* Wildflower 1 */}
          <circle cx="30" cy="30" r="8" fill="#F6C6CD" opacity="0.8" />
          <circle cx="22" cy="25" r="6" fill="#F6C6CD" opacity="0.6" />
          <circle cx="38" cy="25" r="6" fill="#F6C6CD" opacity="0.6" />
          <circle cx="26" cy="36" r="5" fill="#F6C6CD" opacity="0.6" />
          <circle cx="34" cy="36" r="5" fill="#F6C6CD" opacity="0.6" />
          <circle cx="30" cy="30" r="3" fill="#D4AF37" />
          <line x1="30" y1="38" x2="30" y2="60" stroke="#2C3E28" strokeWidth="2" />
          
          {/* Small bud */}
          <circle cx="50" cy="50" r="4" fill="#B8D4A8" opacity="0.7" />
          <line x1="50" y1="54" x2="50" y2="68" stroke="#2C3E28" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Decorative wildflowers - Top Right */}
      <motion.div
        initial={{ opacity: 0, rotate: 20, x: 20 }}
        animate={{ opacity: 1, rotate: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute -top-12 -right-16 md:-right-24"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-70">
          {/* Wildflower 2 */}
          <circle cx="50" cy="30" r="7" fill="#B8D4A8" opacity="0.8" />
          <circle cx="43" cy="26" r="5" fill="#B8D4A8" opacity="0.6" />
          <circle cx="57" cy="26" r="5" fill="#B8D4A8" opacity="0.6" />
          <circle cx="46" cy="35" r="5" fill="#B8D4A8" opacity="0.6" />
          <circle cx="54" cy="35" r="5" fill="#B8D4A8" opacity="0.6" />
          <circle cx="50" cy="30" r="3" fill="#D4AF37" />
          <line x1="50" y1="37" x2="50" y2="58" stroke="#2C3E28" strokeWidth="2" />
          
          {/* Small bud */}
          <circle cx="30" cy="48" r="4" fill="#9CAF88" opacity="0.7" />
          <line x1="30" y1="52" x2="30" y2="65" stroke="#2C3E28" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Main Logo Text */}
      <div className="relative">
        <motion.h1
          className="text-8xl md:text-[11rem] lg:text-[13rem] font-playfair font-bold text-pearl-white tracking-tight"
          style={{
            textShadow: "0 2px 40px rgba(212, 175, 55, 0.4)",
          }}
        >
          NEALY
        </motion.h1>

        {/* Gold shimmer effect */}
        <motion.div
          initial={{ x: "-200%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.8,
            delay: 2.3,
            ease: "easeInOut",
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.6) 50%, transparent 100%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="mt-4 text-base md:text-lg tracking-[0.3em] uppercase text-pearl-white/90 font-montserrat"
      >
        Event Decor
      </motion.p>

      {/* Tagline with floral accent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.2 }}
        className="mt-6 flex items-center justify-center space-x-4"
      >
        {/* Small flower accent left */}
        <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-60">
          <circle cx="10" cy="10" r="3" fill="#D4AF37" />
          <circle cx="6" cy="8" r="2" fill="#F6C6CD" opacity="0.8" />
          <circle cx="14" cy="8" r="2" fill="#F6C6CD" opacity="0.8" />
          <circle cx="8" cy="13" r="2" fill="#F6C6CD" opacity="0.8" />
          <circle cx="12" cy="13" r="2" fill="#F6C6CD" opacity="0.8" />
        </svg>

        <p className="text-sm md:text-base text-pearl-white/70 font-playfair italic">
          Designing Dreams, One Event at a Time
        </p>

        {/* Small flower accent right */}
        <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-60">
          <circle cx="10" cy="10" r="3" fill="#D4AF37" />
          <circle cx="6" cy="8" r="2" fill="#B8D4A8" opacity="0.8" />
          <circle cx="14" cy="8" r="2" fill="#B8D4A8" opacity="0.8" />
          <circle cx="8" cy="13" r="2" fill="#B8D4A8" opacity="0.8" />
          <circle cx="12" cy="13" r="2" fill="#B8D4A8" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Decorative wildflowers - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2"
      >
        <svg width="120" height="60" viewBox="0 0 120 60" className="opacity-60">
          {/* Small meadow flowers cluster */}
          <circle cx="40" cy="20" r="5" fill="#9CAF88" opacity="0.7" />
          <circle cx="60" cy="18" r="6" fill="#F6C6CD" opacity="0.7" />
          <circle cx="80" cy="22" r="5" fill="#B8D4A8" opacity="0.7" />
          <line x1="40" y1="25" x2="40" y2="50" stroke="#2C3E28" strokeWidth="1.5" opacity="0.5" />
          <line x1="60" y1="24" x2="60" y2="50" stroke="#2C3E28" strokeWidth="1.5" opacity="0.5" />
          <line x1="80" y1="27" x2="80" y2="50" stroke="#2C3E28" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}