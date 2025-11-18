"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import GalleryImage from "@/components/gallery/GalleryImage";
import { getImagePath } from "@/lib/gallery/galleryConfig";

export default function HomePage() {
  return (
    <div className="pt-28 md:pt-36 lg:pt-[240px]">
      <HeroSection />
      
      {/* Main Content Wrapper with Green Gradient Edges */}
      <div className="relative bg-warm-eggshell">
        {/* Left Green Gradient Edge */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 lg:w-24 bg-gradient-to-r from-meadow-sage/40 via-meadow-sage/20 to-transparent pointer-events-none z-0" />
        
        {/* Right Green Gradient Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 lg:w-24 bg-gradient-to-l from-meadow-sage/40 via-meadow-sage/20 to-transparent pointer-events-none z-0" />
        
        <div className="relative z-10">
          {/* Introduction Section - Content Box */}
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-warm-eggshell rounded-lg border border-charcoal-black/10 shadow-sm p-8 md:p-12 text-center space-y-6">
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
                </div>
              </motion.div>
            </div>
          </section>

          {/* Gallery Section - Content Box */}
          <section className="section-padding pb-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="bg-warm-eggshell rounded-lg border border-charcoal-black/10 shadow-sm p-8 md:p-12"
              >
                <div className="text-center mb-12">
                  <h2 className="heading-lg text-forest-green mb-6">Gallery</h2>
                  <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
                    A glimpse into our world of custom fabrication and luxury event design
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
                  className="text-center"
                >
                  <Link href="/gallery" className="btn-primary inline-block">
                    View Full Gallery
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* Services Overview - Dark Green with White Content Box */}
      <section className="section-padding bg-forest-green">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-pearl-white rounded-lg border border-charcoal-black/10 shadow-lg p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="heading-lg text-forest-green mb-6">
                  What We Create
                </h2>
                <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
                  From concept to creation, we craft custom event elements that leave lasting impressions
                </p>
              </div>

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
                    className="text-center"
                  >
                    <h3 className="heading-sm text-forest-green mb-4">
                      {service.title}
                    </h3>
                    <p className="text-charcoal-black/70">{service.description}</p>
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Light Pink with Gallery Images */}
      <section className="section-padding bg-light-red">
        <div className="container-custom">
          {/* Gallery Images Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                title: "Blue Sofa",
                image: getImagePath('03-Gallery', 'BlueSofaLounge', 'IMG_0936'),
              },
              {
                title: "Italian Romance",
                image: getImagePath('03-Gallery', 'ItalianRomanceSetup', 'business-pics-45'),
              },
              {
                title: "Wedding Highlights",
                image: getImagePath('03-Gallery', 'WeddingHighlights', 'IMG_5071'),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg aspect-[4/3] bg-forest-green/10"
              >
                <GalleryImage
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="heading-lg text-charcoal-black">
              Ready to Create Something Unforgettable?
            </h2>
            <p className="body-lg text-charcoal-black/80">
              Let&apos;s bring your vision to life with custom décor that tells your unique story
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact!
              </Link>
              <Link href="/contact" className="btn-secondary border-charcoal-black text-charcoal-black hover:bg-charcoal-black hover:text-pearl-white">
                Sign Up for Newsletter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}