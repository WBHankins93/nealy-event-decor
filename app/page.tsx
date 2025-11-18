"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import GalleryImage from "@/components/gallery/GalleryImage";
import { getImagePath } from "@/lib/gallery/galleryConfig";

export default function HomePage() {
  return (
    <div className="pt-32 md:pt-44 lg:pt-[280px]">
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

      {/* Gallery Section - UPDATED WITH SUPABASE */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-forest-green mb-6">Gallery</h2>
            <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
              A glimpse into our world of custom fabrication and luxury event design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Blue Sofa",
                subtitle: "Event Design",
                image: getImagePath('03-Gallery', 'BlueSofaLounge', 'IMG_0936'),
              },
              {
                title: "Italian Romance",
                subtitle: "Luxury Decor",
                image: getImagePath('03-Gallery', 'ItalianRomanceSetup', 'business-pics-45'),
              },
              {
                title: "Wedding Highlights",
                subtitle: "Event Styling",
                image: getImagePath('03-Gallery', 'WeddingHighlights', 'IMG_5071'),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-forest-green/10"
              >
                <GalleryImage
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/80 via-charcoal-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-pearl-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs tracking-widest uppercase text-signature-gold mb-2">
                      {item.subtitle}
                    </p>
                    <h3 className="text-xl md:text-2xl font-playfair font-semibold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/gallery" className="btn-primary inline-block">
              View Full Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
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

      {/* CTA Section */}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact!
              </Link>
              <Link href="/contact" className="btn-secondary border-pearl-white text-pearl-white hover:bg-pearl-white hover:text-forest-green">
                Sign Up for Newsletter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}