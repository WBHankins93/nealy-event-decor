"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WishlistPage() {
  // This will eventually connect to your cart/wishlist state management
  // For now, it's a placeholder structure

  return (
    <div className="min-h-screen pt-24">
      {/* Luxury Hero */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-gradient-to-b from-wine-burgundy to-wine-burgundy/95 text-pearl-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-green rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center relative z-10">
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
                Your Selections
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-signature-gold">
              Your Wishlist
            </h1>
            
            {/* Description */}
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto leading-relaxed">
              Items you&apos;ve selected for your custom package consultation
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

      {/* Wishlist Content */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Empty State - Replace with actual wishlist items when implemented */}
            <div className="text-center py-16">
              <div className="mb-8">
                <svg
                  className="w-24 h-24 mx-auto text-charcoal-black/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="heading-md text-forest-green mb-4">
                Your wishlist is empty
              </h2>
              <p className="body-lg text-charcoal-black/80 mb-8">
                Browse our rentals and add items to build your custom package
              </p>
              <Link href="/rentals" className="btn-primary inline-block">
                Browse Rentals
              </Link>
            </div>

            {/* Instructions */}
            <div className="bg-pearl-light rounded-lg p-8 mt-12">
              <h3 className="heading-sm text-forest-green mb-4">
                How It Works
              </h3>
              <div className="space-y-4 text-charcoal-black/80">
                <p>
                  <strong>1. Add Items:</strong> Browse our rental catalog and add items to your wishlist
                </p>
                <p>
                  <strong>2. Schedule Consultation:</strong> Once you&apos;ve selected items, contact us to discuss your vision
                </p>
                <p>
                  <strong>3. Custom Package:</strong> We&apos;ll create a personalized package based on your wishlist and event needs
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-wine-burgundy text-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="heading-lg text-signature-gold">
              Ready to Plan Your Event?
            </h2>
            <p className="body-lg text-pearl-white/90">
              Let&apos;s discuss your wishlist and create the perfect package for your celebration
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}