"use client";

import { motion } from "framer-motion";
import GalleryImage from "./GalleryImage";

interface GalleryItemProps {
  item: {
    id: number;
    title: string;
    category: string;
    image: string; // This will now be a Cloudinary path
  };
  index: number;
  onClick: () => void;
}

export default function GalleryItem({ item, index, onClick }: GalleryItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer"
    >
      {/* UPDATED: Replace placeholder with Cloudinary image */}
      <GalleryImage
        src={item.image}
        alt={item.title}
        width={800}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Organic border overlay */}
      <div className="absolute inset-0 border-4 border-signature-gold/0 group-hover:border-signature-gold/30 rounded-lg transition-all duration-500" />

      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/90 via-charcoal-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-pearl-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-xs tracking-widest uppercase text-signature-gold mb-2">
            {item.category}
          </p>
          <h3 className="text-xl md:text-2xl font-playfair font-semibold">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Zoom icon */}
      <motion.div
        className="absolute top-4 right-4 p-2 bg-signature-gold/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        whileHover={{ scale: 1.1 }}
      >
        <svg
          className="w-5 h-5 text-charcoal-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}