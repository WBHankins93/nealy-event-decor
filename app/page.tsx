"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import EntranceOverlay from "@/components/entrance/EntranceOverlay";

export default function HomePage() {
  // Always show entrance on page load
  const [showEntrance, setShowEntrance] = useState(true);

  const handleEntranceComplete = () => {
    setShowEntrance(false);
  };

  return (
    <>
      {/* Entrance Overlay */}
      <AnimatePresence mode="wait">
        {showEntrance && (
          <EntranceOverlay onComplete={handleEntranceComplete} />
        )}
      </AnimatePresence>

      {/* Main Homepage Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showEntrance ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="pt-24"
      >
        <HeroSection />
        
        {/* Introduction Section */}
        <section className="section-padding bg-pearl-light">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <h2 className="heading-lg text-forest-green">
                Luxury Fabrication for Unforgettable Moments
              </h2>
              <p className="body-lg text-charcoal-black/80 leading-relaxed">
                At Nealy, we believe every event is a canvas for creating dreams. 
                From elegant weddings to grand galas, our custom fabrication and 
                premium rentals transform your vision into breathtaking reality.
              </p>
              <Link href="/about" className="btn-secondary inline-block">
                Our Story
              </Link>
            </motion.div>
          </div>
        </section>

        <FeaturedWork />

        {/* Services Overview */}
        <section className="section-padding bg-forest-green text-pearl-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="heading-lg text-signature-gold mb-6">
                What We Create
              </h2>
              <p className="body-lg text-pearl-white/80 max-w-3xl mx-auto">
                From concept to creation, we craft custom event elements that leave lasting impressions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Custom Arches",
                  description: "Dramatic statement pieces tailored to your aesthetic and venue",
                },
                {
                  title: "Luxury Bars",
                  description: "Bespoke bar designs that become conversation centerpieces",
                },
                {
                  title: "Décor Rentals",
                  description: "Curated collections of premium furniture and accent pieces",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-pearl-white/5 backdrop-blur-sm p-8 rounded-lg border border-signature-gold/20 hover:border-signature-gold/50 transition-all duration-300"
                >
                  <h3 className="heading-sm text-signature-gold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-pearl-white/80">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link href="/services" className="btn-primary inline-block">
                Explore Services
              </Link>
            </motion.div>
          </div>
        </section>

        <TestimonialsCarousel />

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
                Ready to Create Something Unforgettable?
              </h2>
              <p className="body-lg text-pearl-white/90">
                Let&apos;s bring your vision to life with custom décor that tells your unique story
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Start Your Project
                </Link>
                <Link href="/gallery" className="btn-secondary border-pearl-white text-pearl-white hover:bg-pearl-white hover:text-wine-burgundy">
                  View Portfolio
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}