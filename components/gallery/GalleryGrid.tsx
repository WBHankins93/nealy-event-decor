"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryImage from "@/components/gallery/GalleryImage";
import { getGalleryImages } from "@/lib/galleryHelpers";

interface GalleryGridProps {
  activeFilter: string;
}

export default function GalleryGrid({ activeFilter }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // UPDATED: Get images from Cloudinary via config
  const blueSofaImages = getGalleryImages('03-Gallery', 'BlueSofaLounge');
  const italianRomanceImages = getGalleryImages('03-Gallery', 'ItalianRomanceSetup');
  const weddingImages = getGalleryImages('03-Gallery', 'WeddingHighlights');

  // UPDATED: Build gallery items with Cloudinary paths
  const galleryItems = [
    // Blue Sofa Lounge items
    ...blueSofaImages.map((image: string, index: number) => ({
      id: index + 1,
      title: `Blue Sofa Lounge ${index + 1}`,
      category: "weddings",
      image: image // Cloudinary path
    })),
    // Italian Romance items
    ...italianRomanceImages.map((image: string, index: number) => ({
      id: blueSofaImages.length + index + 1,
      title: `Italian Romance Setup ${index + 1}`,
      category: "weddings",
      image: image // Cloudinary path
    })),
    // Wedding Highlights items
    ...weddingImages.map((image: string, index: number) => ({
      id: blueSofaImages.length + italianRomanceImages.length + index + 1,
      title: `Wedding Highlight ${index + 1}`,
      category: "weddings",
      image: image // Cloudinary path
    }))
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

      {/* Lightbox Modal - UPDATED to show Cloudinary image */}
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
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-pearl-white hover:text-signature-gold transition-colors p-2 z-10"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* UPDATED: Show actual image in lightbox */}
              {(() => {
                const selectedItem = galleryItems.find(item => item.id === selectedImage);
                return selectedItem ? (
                  <GalleryImage
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    width={1200}
                    height={900}
                    className="w-full h-auto rounded-lg"
                    priority
                  />
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}