"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PartingForestLeft from "./PartingForestLeft";
import PartingForestRight from "./PartingForestRight";
import MeadowGlow from "./MeadowGlow";
import LogoWithFlowers from "./LogoWithFlowers";

interface EntranceOverlayProps {
  onComplete: () => void;
}

export default function EntranceOverlay({ onComplete }: EntranceOverlayProps) {
  const [showSkip, setShowSkip] = useState(false);

  // Show skip button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-complete after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Meadow Glow Background - Pulses invitingly */}
      <MeadowGlow />

      {/* Parting Forest - Left Panel */}
      <PartingForestLeft />

      {/* Parting Forest - Right Panel */}
      <PartingForestRight />

      {/* Logo with Wildflower Accents - Center */}
      <div className="relative z-40 flex items-center justify-center">
        <LogoWithFlowers />
      </div>

      {/* Skip Button */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={onComplete}
          className="absolute bottom-8 right-8 text-pearl-white/50 hover:text-pearl-white/90 text-xs tracking-widest uppercase transition-colors duration-300 z-[10000] font-montserrat"
        >
          Skip Intro
        </motion.button>
      )}
    </motion.div>
  );
}