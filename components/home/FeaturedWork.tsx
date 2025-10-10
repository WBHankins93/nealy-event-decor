"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedWork() {
  const featuredProjects = [
    {
      title: "Garden Gala",
      category: "Wedding",
      image: "/images/gallery/placeholder-1.jpg",
    },
    {
      title: "Modern Luxe",
      category: "Corporate Event",
      image: "/images/gallery/placeholder-2.jpg",
    },
    {
      title: "Romantic Garden",
      category: "Engagement Party",
      image: "/images/gallery/placeholder-3.jpg",
    },
  ];

  return (
    <section className="section-padding bg-pearl-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-forest-green mb-6">
            Featured Work
          </h2>
          <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
            A glimpse into our world of custom fabrication and luxury event design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-forest-green/10"
            >
              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest-emerald to-meadow-sage" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/80 via-charcoal-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-pearl-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm tracking-widest uppercase text-signature-gold mb-2">
                  {project.category}
                </p>
                <h3 className="heading-sm">{project.title}</h3>
              </div>
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
          <Link href="/gallery" className="btn-primary">
            View Full Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}