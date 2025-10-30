"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WishlistPage() {
  // This will eventually connect to your cart/wishlist state management
  // For now, it's a placeholder structure

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-padding bg-forest-green text-pearl-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-signature-gold mb-6">
              Your Wishlist
            </h1>
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto">
              Items you've selected for your custom package consultation
            </p>
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
                  <strong>2. Schedule Consultation:</strong> Once you've selected items, contact us to discuss your vision
                </p>
                <p>
                  <strong>3. Custom Package:</strong> We'll create a personalized package based on your wishlist and event needs
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
              Let's discuss your wishlist and create the perfect package for your celebration
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