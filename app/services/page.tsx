"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getS3ImageBySection } from "@/lib/media/s3";

export default function ServicesPage() {
  const customPackages = [
    {
      id: 1,
      name: "The Spotlight Piece",
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
      color: "forest-emerald"
    },
    {
      id: 2,
      name: "The Signature Collection",
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
      name: "The Tailored Experience",
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
      color: "warm-terracotta"
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
    <div className="min-h-screen">
      {/* Luxury Hero */}
      <section className="relative pb-16 md:pb-20 bg-gradient-to-b from-forest-green to-forest-green/95 text-pearl-white overflow-hidden pt-28 md:pt-36 lg:pt-[240px]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine-burgundy rounded-full blur-3xl" />
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
              <span className="inline-block px-6 py-2 border border-signature-gold/30 rounded-full text-signature-gold font-montserrat text-sm tracking-widest uppercase">
                What We Offer
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-signature-gold">
              Services
            </h1>
            
            {/* Description */}
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto leading-relaxed">
              Custom fabrication and luxury rentals for unforgettable events
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

      {/* Curated Packages Section */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="heading-xl text-forest-green mb-6">
              Curated Packages
            </h2>
            <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
              Pre-designed collections ready to transform your event
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Tuscany Soiree */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/gallery?filter=italian-romance"
                className="group block bg-gradient-to-br from-meadow-sage to-forest-emerald rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={process.env.NEXT_PUBLIC_S3_BUCKET_NAME 
                      ? getS3ImageBySection('services', 'Ser_IRS_P1.jpg')
                      : '/images/services/italian-romance.jpg'}
                    alt="The Tuscany Soiree"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/60 via-transparent to-transparent" />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-charcoal-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center space-y-3 px-6">
                      <p className="text-signature-gold font-montserrat text-sm uppercase tracking-wider">
                        View Gallery
                      </p>
                      <p className="text-pearl-white text-sm">
                        See photos of this curated package
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-6">
                  <h3 className="font-playfair text-2xl text-forest-green mb-2 group-hover:text-signature-gold transition-colors">
                    The Tuscany Soiree
                  </h3>
                  <p className="text-charcoal-black/70 text-sm mb-4">
                    Eleganza mediterranea for your special day
                  </p>
                  <div className="flex items-center gap-2 text-signature-gold text-sm font-semibold">
                    <span>View Gallery</span>
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* The Sapphire Social Lounge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                href="/gallery?filter=blue-sofa-lounge"
                className="group block bg-gradient-to-br from-[#4A5F7F] to-[#2C3E50] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={process.env.NEXT_PUBLIC_S3_BUCKET_NAME 
                      ? getS3ImageBySection('services', 'Ser_BSL_P1.jpg')
                      : '/images/services/BlueSofaLounge2.jpg'}
                    alt="The Sapphire Social Lounge"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/60 via-transparent to-transparent" />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-charcoal-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center space-y-3 px-6">
                      <p className="text-signature-gold font-montserrat text-sm uppercase tracking-wider">
                        View Gallery
                      </p>
                      <p className="text-pearl-white text-sm">
                        See photos of this curated package
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-6">
                  <h3 className="font-playfair text-2xl text-forest-green mb-2 group-hover:text-signature-gold transition-colors">
                    The Sapphire Social Lounge
                  </h3>
                  <p className="text-charcoal-black/70 text-sm mb-4">
                    Luxurious velvet seating for intimate gatherings
                  </p>
                  <div className="flex items-center gap-2 text-signature-gold text-sm font-semibold">
                    <span>View Gallery</span>
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
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
                {/* Package Header with Number - Shiny Gradient */}
                <div className={`relative h-48 overflow-hidden ${
                  pkg.color === 'forest-emerald' 
                    ? 'bg-gradient-to-br from-forest-emerald via-[#015532] to-forest-green'
                    : pkg.color === 'signature-gold'
                    ? 'bg-gradient-to-br from-[#F4D03F] via-signature-gold to-[#B8941F]'
                    : 'bg-gradient-to-br from-[#E67C2A] via-warm-terracotta to-[#A0521A]'
                }`}>
                  {/* Shiny Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 opacity-40" />
                  
                  {/* Title Badge - Top Left */}
                  <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <div className={`w-10 h-10 rounded-full border-2 ${
                      pkg.color === 'forest-emerald'
                        ? 'bg-forest-emerald border-forest-emerald text-white'
                        : pkg.color === 'signature-gold'
                        ? 'bg-signature-gold border-signature-gold text-white'
                        : 'bg-warm-terracotta border-warm-terracotta text-white'
                    } flex items-center justify-center font-bold`}>
                      {pkg.id}
                    </div>
                    <span className="font-playfair font-semibold text-lg text-charcoal-black">
                      {pkg.name}
                    </span>
                  </div>
                  
                  {/* Price Badge - Bottom Right */}
                  <div className={`absolute bottom-6 right-6 z-10 ${
                    pkg.color === 'forest-emerald'
                      ? 'bg-forest-emerald/90'
                      : pkg.color === 'signature-gold'
                      ? 'bg-signature-gold/90'
                      : 'bg-warm-terracotta/90'
                  } backdrop-blur-sm text-pearl-white px-6 py-2 rounded-full font-semibold shadow-lg`}>
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
                    className={`block w-full text-center py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 text-pearl-white ${
                      pkg.color === 'forest-emerald'
                        ? 'bg-forest-emerald'
                        : pkg.color === 'signature-gold'
                        ? 'bg-signature-gold'
                        : 'bg-warm-terracotta'
                    }`}
                  >
                    Choose {pkg.name} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section-padding bg-meadow-lavender">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-[#FEFDFB] mb-6">
              Our Process
            </h2>
            <p className="body-lg text-[#FEFDFB]/90 max-w-3xl mx-auto">
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
                className="bg-white/20 backdrop-blur-sm p-8 rounded-lg border border-charcoal-black/20"
              >
                <p className="text-5xl font-playfair text-signature-gold mb-4">
                  {step.step}
                </p>
                <h3 className="heading-sm text-[#FEFDFB] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#FEFDFB]/90">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA */}
      <section className="section-padding bg-light-red">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="heading-lg text-[#FEFDFB]">
              Ready to Create Something Unforgettable?
            </h2>
            <p className="body-lg text-[#FEFDFB]/90">
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