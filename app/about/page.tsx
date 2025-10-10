"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
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
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto">
              Creating dream events through luxury fabrication and timeless design
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-charcoal-black/80 leading-relaxed"
          >
            <p className="body-lg">
              Nealy was born from a simple belief: every celebration deserves to be extraordinary. 
              What started as a passion for transforming spaces has evolved into a full-service event 
              design company specializing in custom fabrication and luxury rentals.
            </p>
            <p className="body-lg">
              Our name carries legacy—a family tradition of craftsmanship and attention to detail 
              that spans generations. We bring that same dedication to every arch, every bar, every 
              custom piece we create for your special day.
            </p>
            <p className="body-lg">
              From intimate garden weddings to grand corporate galas, we approach each event as a 
              unique canvas. Our team combines artistic vision with technical precision, ensuring 
              that your celebration reflects your personality and exceeds your expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Creativity",
                description: "Every event is an opportunity to push boundaries and create something truly unique.",
              },
              {
                title: "Quality",
                description: "We never compromise on materials, craftsmanship, or service excellence.",
              },
              {
                title: "Partnership",
                description: "Your vision guides us. We're here to bring it to life, exceeding expectations every time.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <h3 className="text-2xl font-playfair font-semibold text-signature-gold">
                  {value.title}
                </h3>
                <p className="text-pearl-white/80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-pearl-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="heading-lg text-forest-green">
              Ready to Start Planning?
            </h2>
            <p className="body-lg text-charcoal-black/80">
              Let's create something beautiful together
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}