"use client";

import { motion } from "framer-motion";

export default function PartingForestLeft() {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{
        duration: 2,
        delay: 1,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for elegant movement
      }}
      className="absolute top-0 left-0 bottom-0 w-1/2 overflow-hidden z-30"
      style={{
        background: "linear-gradient(to right, #0a1a0a 0%, #1a2e1a 100%)",
      }}
    >
      {/* Layer 1: Back layer - Large leaves */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`back-${i}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${80 + Math.random() * 60}px`,
              height: `${100 + Math.random() * 80}px`,
            }}
          >
            {/* Fern frond */}
            <svg viewBox="0 0 100 120" className="w-full h-full" style={{ filter: "blur(2px)" }}>
              <path
                d="M50,10 Q30,40 20,60 Q15,80 18,100 M50,10 Q70,40 80,60 Q85,80 82,100 M50,10 L50,100"
                stroke="#2C3E28"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              {/* Leaflets */}
              {[...Array(6)].map((_, idx) => (
                <ellipse
                  key={idx}
                  cx={30 + (idx % 2) * 40}
                  cy={20 + idx * 13}
                  rx="15"
                  ry="8"
                  fill="#2C3E28"
                  opacity="0.5"
                  transform={`rotate(${idx % 2 === 0 ? -30 : 30} ${30 + (idx % 2) * 40} ${20 + idx * 13})`}
                />
              ))}
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Layer 2: Mid layer - Detailed foliage */}
      <div className="absolute inset-0 opacity-70">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`mid-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 90}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 40}px`,
              height: `${60 + Math.random() * 50}px`,
            }}
          >
            {/* Botanical leaf */}
            <svg viewBox="0 0 60 80" className="w-full h-full">
              <path
                d="M30,5 Q45,25 48,45 Q50,65 45,78 Q30,75 30,5 Z"
                fill="#1a2e1a"
                opacity="0.8"
              />
              <path
                d="M30,5 Q15,25 12,45 Q10,65 15,78 Q30,75 30,5 Z"
                fill="#2C3E28"
                opacity="0.7"
              />
              {/* Vein detail */}
              <path
                d="M30,10 L30,75"
                stroke="#014421"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Layer 3: Front layer - Sharp silhouettes */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`front-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 30}px`,
              height: `${40 + Math.random() * 40}px`,
            }}
          >
            {/* Small detailed leaves */}
            <svg viewBox="0 0 40 50" className="w-full h-full">
              <ellipse
                cx="20"
                cy="25"
                rx="18"
                ry="22"
                fill="#0a1a0a"
                opacity="0.9"
              />
              <path
                d="M20,5 Q28,15 30,25 Q28,35 20,45 Q12,35 10,25 Q12,15 20,5"
                fill="#1a2e1a"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Edge gradient for seamless blend */}
      <div
        className="absolute top-0 right-0 bottom-0 w-32"
        style={{
          background: "linear-gradient(to left, rgba(26, 46, 26, 0) 0%, rgba(26, 46, 26, 0.8) 100%)",
        }}
      />
    </motion.div>
  );
}