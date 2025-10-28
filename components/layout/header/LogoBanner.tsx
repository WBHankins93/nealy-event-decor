"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LogoBanner() {
  return (
    <div className="flex justify-center py-6">
      <Link href="/" className="group">
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-5xl font-playfair font-bold text-signature-gold tracking-tight">
            NEALY
          </span>
          <span className="text-sm font-montserrat tracking-[0.3em] text-charcoal-black uppercase mt-1">
            Event Decor
          </span>
        </motion.div>
      </Link>
    </div>
  );
}