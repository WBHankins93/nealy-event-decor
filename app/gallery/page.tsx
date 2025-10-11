"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Events" },
    { id: "weddings", label: "Weddings" },
    { id: "corporate", label: "Corporate" },
    { id: "galas", label: "Galas" },
    { id: "custom", label: "Custom Fabrication" },
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-forest-green text-pearl-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-signature-gold mb-6">
              Portfolio
            </h1>
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto">
              Explore our collection of breathtaking events and custom creations. 
              Each piece tells a unique story of luxury and imagination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-pearl-light sticky top-24 z-40 border-b border-signature-gold/20">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 font-montserrat tracking-wide uppercase text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-signature-gold text-charcoal-black"
                    : "bg-transparent text-charcoal-black border-2 border-signature-gold/30 hover:border-signature-gold"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <GalleryGrid activeFilter={activeFilter} />

      {/* CTA Section */}
      <section className="section-padding bg-wine-burgundy text-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="heading-lg text-signature-gold">
              Let&apos;s Create Your Vision
            </h2>
            <p className="body-lg text-pearl-white/90">
              Ready to bring your event to life with custom décor that&apos;s uniquely yours?
            </p>
            <motion.a
              href="/contact"
              className="btn-primary inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}