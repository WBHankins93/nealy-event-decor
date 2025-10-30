"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesPage() {
  const customPackages = [
    {
      id: 1,
      name: "Signature Accent",
      price: "$750",
      tagline: "Perfect for: Clients who want one standout custom piece to elevate their event.",
      description: "This is for the host who wants one unforgettable piece that makes guests say wow.",
      includes: [
        "1 custom-fabricated decor piece (e.g. backdrop, bar front, or statement prop)",
        "Choice of materials (wood, acrylic, metal detailing, etc.)",
        "Design consultation + digital mockup",
        "Delivery & installation within local area"
      ],
      examples: [
        "Custom monogram backdrop",
        "Mini floral arch",
        "Acrylic drink wall"
      ],
      color: "forest-green"
    },
    {
      id: 2,
      name: "Signature Scene",
      price: "$1,800",
      tagline: "Perfect for: Clients who want a fully designed set area that tells a story — ideal for photo ops, lounges, or ceremony focal points.",
      description: "Transform one space into a full visual experience — cohesive, elegant, and completely yours.",
      includes: [
        "2–3 custom-fabricated pieces (arches, backdrops, furniture detailing)",
        "Design board with 2 concept revisions",
        "Styling with accessories from your rental catalog",
        "Delivery, setup & teardown"
      ],
      examples: [
        "Custom lounge setup with matching backdrop",
        "Themed ceremony arch with layered textures and lighting",
        "Interactive photo wall"
      ],
      color: "signature-gold",
      featured: true
    },
    {
      id: 3,
      name: "Bespoke Event Design",
      price: "$4,000",
      tagline: "Perfect for: Clients hosting high-end events, weddings, or branded experiences who want an immersive, custom-designed environment.",
      description: "Your dream aesthetic, built from the ground up — every detail handcrafted by Nealy.",
      includes: [
        "Full-scale concept design + 3D renderings",
        "Up to 6 custom-fabricated elements",
        "Integration with lighting, drapery & rental catalog",
        "On-site styling with Nealy design team",
        "Delivery, installation, and teardown",
        "Optional video recap of build + event setup (add-on)"
      ],
      examples: [
        "Italian-inspired luxury wedding",
        "Corporate brand activation",
        "Large-scale themed celebration"
      ],
      color: "wine-burgundy"
    }
  ];

  const services = [
    {
      title: "Custom Arches",
      description: "Dramatic statement pieces tailored to your aesthetic and venue. Each arch is meticulously crafted to create an unforgettable focal point for your event.",
      features: [
        "Bespoke designs for ceremonies & receptions",
        "Premium materials and finishes",
        "Professional installation included",
        "Customizable colors and textures"
      ]
    },
    {
      title: "Luxury Bars",
      description: "Bespoke bar designs that become conversation centerpieces. From intimate gatherings to grand celebrations, our bars elevate every occasion.",
      features: [
        "Custom sizing and configurations",
        "Elegant finishes and details",
        "Full-service setup and breakdown",
        "Coordinated with your event aesthetic"
      ]
    },
    {
      title: "Event Fabrication",
      description: "Complete custom fabrication services for any event element you can imagine. We bring your unique vision to life with precision and artistry.",
      features: [
        "Backdrops and photo moments",
        "Specialty furniture pieces",
        "Decorative installations",
        "Branded elements and signage"
      ]
    },
    {
      title: "Décor Rentals",
      description: "Curated collections of premium furniture and accent pieces. Thoughtfully selected items that add sophistication and style to your event.",
      features: [
        "Lounge furniture collections",
        "Statement accent pieces",
        "Vintage and modern options",
        "Complete design coordination"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Simple Hero */}
      <section className="section-padding bg-forest-green text-pearl-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-signature-gold mb-6">
              Services
            </h1>
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto">
              Custom fabrication and luxury rentals for unforgettable events
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-wine-burgundy text-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-signature-gold mb-6">
              Our Process
            </h2>
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto">
              A seamless journey from vision to reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Share your vision and event details with us"
              },
              {
                step: "02",
                title: "Design & Planning",
                description: "We create custom designs tailored to your style"
              },
              {
                step: "03",
                title: "Execution",
                description: "Professional delivery, setup, and breakdown"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-pearl-white/5 backdrop-blur-sm p-8 rounded-lg border border-signature-gold/20"
              >
                <p className="text-5xl font-playfair text-signature-gold/30 mb-4">
                  {step.step}
                </p>
                <h3 className="heading-sm text-signature-gold mb-4">
                  {step.title}
                </h3>
                <p className="text-pearl-white/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Packages Section */}
      <section className="section-padding bg-gradient-to-b from-pearl-light to-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-widest uppercase text-charcoal-black/60 mb-4">
              CUSTOM PACKAGES
            </p>
            <h2 className="heading-xl text-forest-green mb-6">
              Crafted for Your Vision
            </h2>
            <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
              Three levels of service. Complete customization. You&apos;re involved every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {customPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  pkg.featured 
                    ? `border-${pkg.color} scale-105` 
                    : `border-${pkg.color}/20`
                }`}
              >
                {/* Package Header with Number */}
                <div className={`relative h-48 bg-gradient-to-br ${
                  pkg.color === 'forest-green' 
                    ? 'from-meadow-sage to-forest-emerald'
                    : pkg.color === 'signature-gold'
                    ? 'from-signature-gold to-[#D4AF37]'
                    : 'from-wine-burgundy to-[#8B4054]'
                }`}>
                  <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className={`w-10 h-10 rounded-full bg-${pkg.color} flex items-center justify-center text-white font-bold`}>
                      {pkg.id}
                    </div>
                    <span className="font-playfair font-semibold text-charcoal-black text-lg">
                      {pkg.name}
                    </span>
                  </div>
                  <div className={`absolute bottom-6 right-6 bg-${pkg.color}/90 backdrop-blur-sm text-pearl-white px-6 py-2 rounded-full font-semibold`}>
                    Starting at {pkg.price}
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-8">
                  <p className="text-charcoal-black/70 italic mb-4 text-sm">
                    {pkg.tagline}
                  </p>
                  <p className="text-charcoal-black/90 mb-6 font-medium">
                    {pkg.description}
                  </p>

                  {/* Includes List */}
                  <div className="mb-6">
                    <h4 className="font-playfair font-semibold text-forest-green mb-3">
                      Includes:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`text-${pkg.color} mt-1`}>→</span>
                          <span className="text-charcoal-black/80 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div className={`bg-${pkg.color}/5 rounded-lg p-4 mb-6 border border-${pkg.color}/20`}>
                    <p className="text-xs font-semibold text-charcoal-black/60 mb-2">
                      EXAMPLES:
                    </p>
                    {pkg.examples.map((example, i) => (
                      <p key={i} className="text-sm text-charcoal-black/80">
                        {example}
                      </p>
                    ))}
                  </div>

                  <Link 
                    href="/contact" 
                    className={`block w-full text-center bg-${pkg.color} text-pearl-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300`}
                  >
                    Choose {pkg.name} →
                  </Link>
                </div>

                {/* Featured Badge */}
                {pkg.featured && (
                  <div className="absolute top-4 right-4 bg-charcoal-black text-signature-gold px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                    MOST POPULAR
                  </div>
                )}
              </motion.div>
            ))}
          </div>
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
              Ready to Create Something Unforgettable?
            </h2>
            <p className="body-lg text-pearl-white/90">
              Let&apos;s bring your vision to life with custom décor that tells your unique story
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