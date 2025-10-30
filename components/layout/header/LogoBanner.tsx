"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LogoBanner() {
  return (
    <div className="relative flex justify-center py-4">
      {/* Decorative Gold Lines - Left Side extending to edge */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.3, scaleY: 1 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="w-16 h-full bg-signature-gold"
          />
        ))}
      </div>

      {/* Decorative Gold Lines - Right Side extending to edge */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.3, scaleY: 1 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="w-16 h-full bg-signature-gold"
          />
        ))}
      </div>

      {/* Logo - Centered */}
      <Link href="/" className="group relative z-10">
        <motion.div
          className="flex flex-col items-center"
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