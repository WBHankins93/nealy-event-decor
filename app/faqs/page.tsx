"use client";

import { motion } from "framer-motion";

export default function FAQsPage() {
  return (
    <div className="pt-24">
      {/* Luxury Hero */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-gradient-to-b from-forest-green to-forest-green/95 text-pearl-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine-burgundy rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-block px-6 py-2 border border-signature-gold/30 rounded-full text-signature-gold font-montserrat text-sm tracking-widest uppercase">
                Help Center
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-signature-gold">
              Frequently Asked Questions
            </h1>
            
            {/* Description */}
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our services and process
            </p>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="w-16 h-px bg-signature-gold/50" />
              <div className="w-2 h-2 bg-signature-gold rounded-full" />
              <div className="w-16 h-px bg-signature-gold/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Content - Add your FAQ content here */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom max-w-4xl">
          <p className="text-center text-charcoal-black/60">FAQ content coming soon...</p>
        </div>
      </section>
    </div>
  );
}