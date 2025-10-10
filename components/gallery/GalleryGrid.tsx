"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GalleryItem from "./GalleryItem";

interface GalleryGridProps {
  activeFilter: string;
}

export default function GalleryGrid({ activeFilter }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    { id: 1, title: "Garden Wedding Arch", category: "weddings", image: "/images/gallery/1.jpg" },
    { id: 2, title: "Corporate Event Bar", category: "corporate", image: "/images/gallery/2.jpg" },
    { id: 3, title: "Gala Centerpieces", category: "galas", image: "/images/gallery/3.jpg" },
    { id: 4, title: "Custom Ceremony Backdrop", category: "weddings", image: "/images/gallery/4.jpg" },
    { id: 5, title: "Luxury Lounge Setup", category: "corporate", image: "/images/gallery/5.jpg" },
    { id: 6, title: "Anniversary Tablescape", category: "galas", image: "/images/gallery/6.jpg" },
    { id: 7, title: "Custom Floral Installation", category: "custom", image: "/images/gallery/7.jpg" },
    { id: 8, title: "Wedding Reception Design", category: "weddings", image: "/images/gallery/8.jpg" },
    { id: 9, title: "Brand Activation Setup", category: "corporate", image: "/images/gallery/9.jpg" },
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="section-padding bg-pearl-white">
      <div className="container-custom">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedImage(item.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="body-lg text-charcoal-black/60">
              No items found in this category yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-charcoal-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-pearl-white hover:text-signature-gold transition-colors p-2"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-[4/3] bg-forest-green/20 rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}