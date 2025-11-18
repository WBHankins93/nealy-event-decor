"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";
import GalleryImage from "@/components/gallery/GalleryImage";
import { getGalleryImages } from "@/lib/gallery/galleryConfig";

interface GalleryGridProps {
  activeFilter: string;
}

interface GalleryItemType {
  id: number;
  title: string;
  category: string;
  image: string;
}

export default function GalleryGrid({ activeFilter }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch images from local public folder via galleryConfig
    const loadGalleryImages = () => {
      try {
        const blueSofaImages = getGalleryImages('03-Gallery', 'BlueSofaLounge');
        const italianRomanceImages = getGalleryImages('03-Gallery', 'ItalianRomanceSetup');
        const weddingImages = getGalleryImages('03-Gallery', 'WeddingHighlights');

        // Build gallery items with local image paths
        const items: GalleryItemType[] = [
          // Blue Sofa Lounge items
          ...blueSofaImages.map((image: string, index: number) => ({
            id: index + 1,
            title: `Blue Sofa Lounge`,
            category: "blue-sofa-lounge",
            image: image
          })),
          // Italian Romance items
          ...italianRomanceImages.map((image: string, index: number) => ({
            id: blueSofaImages.length + index + 1,
            title: `Italian Romance`,
            category: "italian-romance",
            image: image
          })),
          // Wedding Highlights items
          ...weddingImages.map((image: string, index: number) => ({
            id: blueSofaImages.length + italianRomanceImages.length + index + 1,
            title: `Wedding Highlights`,
            category: "wedding-highlights",
            image: image
          }))
        ];

        setGalleryItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading gallery images:', error);
        setIsLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  // Navigate through images in lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredItems[newIndex].id);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, filteredItems]);

  if (isLoading) {
    return (
      <section className="section-padding bg-pearl-white">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-signature-gold border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="body-lg text-charcoal-black/60">Loading gallery...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-pearl-white">
      <div className="container-custom">
        {/* Masonry Grid Layout */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
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

        {/* Empty State */}
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

      {/* Lightbox Modal with Navigation */}
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
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-pearl-white hover:text-signature-gold transition-colors p-2 z-10 group"
                aria-label="Close gallery"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pearl-white hover:text-signature-gold transition-colors p-3 bg-charcoal-black/50 hover:bg-charcoal-black/70 rounded-full z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-pearl-white hover:text-signature-gold transition-colors p-3 bg-charcoal-black/50 hover:bg-charcoal-black/70 rounded-full z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image Display */}
              {(() => {
                const selectedItem = galleryItems.find(item => item.id === selectedImage);
                const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
                
                return selectedItem ? (
                  <div className="text-center">
                    <GalleryImage
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      width={1600}
                      height={1200}
                      className="w-full h-auto rounded-lg shadow-2xl"
                      priority
                    />
                    {/* Image Counter */}
                    <div className="mt-4 text-pearl-white/80 font-montserrat text-sm">
                      {currentIndex + 1} / {filteredItems.length}
                    </div>
                    {/* Image Title */}
                    <div className="mt-2">
                      <p className="text-signature-gold font-playfair text-lg">
                        {selectedItem.title}
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}