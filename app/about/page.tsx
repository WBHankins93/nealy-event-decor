"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Simple Hero */}
      <section className="section-padding bg-wine-burgundy text-pearl-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-signature-gold mb-6">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl font-playfair text-pearl-white/90 italic">
              Where legacy meets creation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Content - All in One Section */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <p className="body-lg text-charcoal-black/90 leading-relaxed">
              Nealy was born from a lifelong desire to create beauty and elevate spaces into something extraordinary. With a deep love for architecture, design, and the art of building, every piece crafted under Nealy carries intention, emotion, and artistry.
            </p>

            <p className="body-lg text-charcoal-black/90 leading-relaxed">
              The name Nealy holds a special place in my heart — it's the family name I grew up with, the name I believed was mine until I was fourteen. Though it never appeared on paper, it has always felt like home. Naming this company Nealy is my way of honoring that part of myself — the roots, the history, and the creative spirit that shaped who I am today.
            </p>

            <p className="body-lg text-charcoal-black/90 leading-relaxed">
              At Nealy, we don't just design décor; we bring imagination into form. From initial sketches to final fabrication, each piece is built to capture your vision in a way that feels deeply personal and unforgettable. I believe in crafting environments that speak — where every line, texture, and color flows seamlessly to tell your story.
            </p>

            <p className="body-lg text-charcoal-black/90 leading-relaxed italic">
              More than a backdrop, each installation is a feeling — a reflection of your dream brought to life with precision, passion, and care.
            </p>
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
              Let's Create Together
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