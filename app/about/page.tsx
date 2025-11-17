"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 md:pt-44 lg:pt-[320px]">
      {/* Luxury Hero */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-gradient-to-b from-wine-burgundy to-wine-burgundy/95 text-pearl-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-green rounded-full blur-3xl" />
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
                About Us
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-signature-gold">
              Our Story
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl font-playfair text-pearl-white/90 italic leading-relaxed max-w-3xl mx-auto">
              Where legacy meets creation.
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

      {/* Story Content - Video and Text Grid */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Video - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-lg overflow-hidden shadow-xl"
            >
              <video
                src="/videos/about/about.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-auto"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Text - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="body-lg text-charcoal-black/90 leading-relaxed">
                Nealy was born from a lifelong desire to create beauty and elevate spaces into something extraordinary. With a deep love for architecture, design, and the art of building, every piece crafted under Nealy carries intention, emotion, and artistry.
              </p>

              <p className="body-lg text-charcoal-black/90 leading-relaxed">
                At Nealy, we don&apos;t just design décor; we bring imagination into form. From initial sketches to final fabrication, each piece is built to capture your vision in a way that feels deeply personal and unforgettable. I believe in crafting environments that speak — where every line, texture, and color flows seamlessly to tell your story.
              </p>

              <p className="body-lg text-charcoal-black/90 leading-relaxed italic">
                More than a backdrop, each installation is a feeling — a reflection of your dream brought to life with precision, passion, and care.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-forest-green text-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="heading-lg text-signature-gold">
              Let&apos;s Create Together
            </h2>
            <p className="body-lg text-pearl-white/90">
              Every event is an opportunity to tell a story. Let us help you tell yours.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}