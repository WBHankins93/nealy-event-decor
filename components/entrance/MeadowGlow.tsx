"use client";

import { motion } from "framer-motion";

export default function MeadowGlow() {
  return (
    <>
      {/* Background meadow gradient - always visible */}
      <div className="absolute inset-0 meadow-gradient-animated" />

      {/* Pulsing golden glow in center - teases what's beyond */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div
          className="w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0) 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Subtle light rays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, 
              rgba(212, 175, 55, 0.1) 0%, 
              transparent 50%),
            radial-gradient(ellipse at 30% 40%, 
              rgba(156, 175, 136, 0.08) 0%, 
              transparent 40%),
            radial-gradient(ellipse at 70% 60%, 
              rgba(184, 212, 168, 0.08) 0%, 
              transparent 40%)
          `,
        }}
      />
    </>
  );
}