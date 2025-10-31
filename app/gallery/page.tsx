"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Events" },
    { id: "blue-sofa", label: "Blue Sofa Lounge" },
    { id: "italian-romance", label: "Italian Romance" },
    { id: "wedding-highlights", label: "Wedding Highlights" },
  ];

  return (
    <div className="pt-24">
      {/* Hero Section with Luxury Design */}
      <section className="relative section-padding bg-gradient-to-b from-forest-green to-forest-green/95 text-pearl-white overflow-hidden">
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
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-block px-6 py-2 border border-signature-gold/30 rounded-full text-signature-gold font-montserrat text-sm tracking-widest uppercase">
                Our Portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-signature-gold">
              Gallery
            </h1>
            
            {/* Description */}
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of breathtaking events and custom creations. 
              Each piece tells a unique story of luxury and imagination.
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

      {/* Filter Section - Sticky with Luxury Design */}
      <section className="sticky top-24 z-40 bg-pearl-light/95 backdrop-blur-md border-b border-signature-gold/20 shadow-lg">
        <div className="container-custom py-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative px-8 py-3 font-montserrat tracking-wide uppercase text-sm 
                  transition-all duration-300 rounded-full overflow-hidden group
                  ${
                    activeFilter === filter.id
                      ? "bg-signature-gold text-charcoal-black shadow-lg scale-105"
                      : "bg-transparent text-charcoal-black border-2 border-signature-gold/30 hover:border-signature-gold hover:shadow-md"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated Background for inactive buttons */}
                {activeFilter !== filter.id && (
                  <span className="absolute inset-0 bg-signature-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                )}
                
                <span className="relative z-10">{filter.label}</span>

                {/* Active Indicator */}
                {activeFilter === filter.id && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-signature-gold rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Filter Count Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-charcoal-black/60 font-montserrat">
              Showing{" "}
              <span className="text-signature-gold font-semibold">
                {activeFilter === "all" ? "all collections" : filters.find(f => f.id === activeFilter)?.label}
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <GalleryGrid activeFilter={activeFilter} />

      {/* CTA Section with Luxury Design */}
      <section className="relative section-padding bg-gradient-to-br from-wine-burgundy via-wine-burgundy/95 to-charcoal-black text-pearl-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            {/* Decorative Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-signature-gold/20 text-signature-gold"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </motion.div>

            <h2 className="heading-lg text-signature-gold">
              Let&apos;s Create Your Vision
            </h2>
            
            <p className="body-lg text-pearl-white/90 leading-relaxed">
              Ready to bring your event to life with custom décor that&apos;s uniquely yours? 
              Our team specializes in transforming spaces into unforgettable experiences.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <motion.a
                href="/contact"
                className="inline-block px-10 py-4 bg-signature-gold text-charcoal-black font-montserrat font-semibold tracking-wide uppercase rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
              </motion.a>
            </motion.div>

            {/* Decorative Bottom Border */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4 pt-8"
            >
              <div className="w-24 h-px bg-signature-gold/50" />
              <div className="w-3 h-3 bg-signature-gold rounded-full" />
              <div className="w-24 h-px bg-signature-gold/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}