"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LogoBanner() {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center py-3 overflow-hidden bg-pearl-white">
      {/* Decorative Gold Lines - Left Side - GETS CUT OFF AT EDGE */}
      <div className="absolute left-0 top-0 bottom-0 right-1/2 mr-32 flex items-center justify-end overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={`left-${i}`}
            style={{ width: '48px', height: '100%', marginRight: '4px', flexShrink: 0, opacity: 0.3 }}
            className="bg-signature-gold"
          />
        ))}
      </div>

      {/* Decorative Gold Lines - Right Side - GETS CUT OFF AT EDGE */}
      <div className="absolute right-0 top-0 bottom-0 left-1/2 ml-32 flex items-center justify-start overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={`right-${i}`}
            style={{ width: '48px', height: '100%', marginLeft: '4px', flexShrink: 0, opacity: 0.3 }}
            className="bg-signature-gold"
          />
        ))}
      </div>

      {/* Logo - Centered */}
      <Link href="/" className="group relative z-10">
        <motion.div
          className="flex flex-col items-center bg-pearl-white px-8 py-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-4xl md:text-5xl font-playfair font-bold text-signature-gold tracking-tight">
            NEALY
          </span>
          <span className="text-xs font-montserrat tracking-[0.3em] text-charcoal-black uppercase mt-1">
            Event Decor
          </span>
        </motion.div>
      </Link>
    </div>
  );
}