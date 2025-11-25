"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getVideoUrl } from "@/lib/media/videoUrls";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Luxury Hero */}
      <section className="relative pb-16 md:pb-20 bg-gradient-to-b from-meadow-lavender to-meadow-lavender/95 overflow-hidden pt-28 md:pt-36 lg:pt-[240px]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-green rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center relative z-10 pt-20 md:pt-24">
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
              <span className="inline-block px-6 py-2 border border-charcoal-black/30 rounded-full text-charcoal-black font-montserrat text-sm tracking-widest uppercase">
                About Us
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-charcoal-black">
              Our Story
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl font-playfair text-charcoal-black/80 italic leading-relaxed max-w-3xl mx-auto">
              Where legacy meets creation.
            </p>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="w-16 h-px bg-charcoal-black/50" />
              <div className="w-2 h-2 bg-charcoal-black rounded-full" />
              <div className="w-16 h-px bg-charcoal-black/50" />
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
                src={getVideoUrl("about")}
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
                Nealy was created from a lifelong desire to build beauty — to transform ordinary spaces into experiences that feel cinematic, intentional, and unforgettable. Rooted in a love for architecture, design, and the craft of building by hand, every piece is created with purpose. Nothing is accidental. Every texture, every silhouette, every detail is chosen to evoke emotion.
              </p>

              <p className="body-lg text-charcoal-black/90 leading-relaxed">
                At Nealy, we don&apos;t just design décor. We sculpt atmosphere.
              </p>

              <p className="body-lg text-charcoal-black/90 leading-relaxed">
                From the first sketch to the final installation, your vision becomes something you can step into — a space that feels deeply personal, artfully curated, and uniquely yours.
              </p>

              <p className="body-lg text-charcoal-black/90 leading-relaxed italic">
                Each installation is more than a moment of décor. It&apos;s a feeling — a story told through color, structure, and light. A dream brought to life with precision, passion, and soul.
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