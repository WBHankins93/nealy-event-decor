"use client";

import { motion } from "framer-motion";
import GalleryImage from "./GalleryImage";

interface GalleryItemProps {
  item: {
    id: number;
    title: string;
    category: string;
    image: string;
  };
  index: number;
  onClick: () => void;
}

export default function GalleryItem({ item, index, onClick }: GalleryItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid mb-8 bg-charcoal-black/5"
    >
      {/* Image Container */}
      <div className="relative w-full">
        <GalleryImage
          src={item.image}
          alt={item.title}
          width={800}
          height={1000}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black via-charcoal-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Gold Border Effect */}
        <div className="absolute inset-0 border-2 border-signature-gold/0 group-hover:border-signature-gold/40 rounded-lg transition-all duration-500" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-pearl-white transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="space-y-2">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-signature-gold font-montserrat font-medium">
                {item.category.replace('-', ' ')}
              </span>
            </motion.div>
            
            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-playfair font-semibold"
            >
              {item.title}
            </motion.h3>

            {/* View Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-sm text-pearl-white/80 font-montserrat"
            >
              <span>View Details</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Zoom Icon - Top Right */}
        <motion.div
          className="absolute top-4 right-4 p-3 bg-signature-gold/95 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
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

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-signature-gold/0 group-hover:border-signature-gold/50 rounded-tl-lg transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-signature-gold/0 group-hover:border-signature-gold/50 rounded-br-lg transition-all duration-500" />
      </div>
    </motion.div>
  );
}