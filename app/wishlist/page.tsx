"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useWishlistContext } from "@/lib/wishlist/wishlistContext";
import { getAllRentalItems } from "@/lib/rentals/rentalHelpers";
import { RentalItem } from "@/lib/rentals/rentalTypes";

function WishlistItemCard({ item, onRemove }: { item: RentalItem; onRemove: (id: string) => void }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-signature-gold/30 relative"
    >
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 z-10 p-2 bg-wine-burgundy text-white rounded-full hover:bg-wine-burgundy/80 transition-colors shadow-lg"
        aria-label="Remove from wishlist"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <div className="aspect-square bg-pearl-light overflow-hidden relative">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal-black/20">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="p-4">
        <h3 className="text-lg font-playfair font-semibold text-signature-gold mb-1">
          {item.name}
        </h3>
        <p className="text-xs font-montserrat uppercase tracking-wider text-charcoal-black/60 mb-2">
          {item.subtitle}
        </p>
        <p className="text-sm text-charcoal-black/70 line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between text-xs text-charcoal-black/50">
          <span>Qty Available: {item.quantity}</span>
          {item.dimensions && <span className="text-right truncate ml-2">{item.dimensions}</span>}
        </div>
      </div>
    </motion.div>
  );
}

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist, getWishlistCount } = useWishlistContext();
  const [isSending, setIsSending] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  
  // Get full item details for wishlist items
  const allItems = getAllRentalItems();
  const wishlistItemDetails = wishlistItems
    .map((id) => allItems.find((item) => item.id === id))
    .filter((item): item is RentalItem => item !== undefined);

  const hasItems = wishlistItemDetails.length > 0;

  const handleEmailWishlist = async () => {
    // If customer info form is not shown, show it first
    if (!showCustomerForm) {
      setShowCustomerForm(true);
      return;
    }

    // Validate customer info
    if (!customerInfo.email) {
      alert("Please provide your email address.");
      return;
    }

    setIsSending(true);

    try {
      // Prepare items data for API
      const itemsData = wishlistItemDetails.map((item) => ({
        name: item.name,
        subtitle: item.subtitle || "",
      }));

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsData,
          customerName: customerInfo.name || undefined,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Wishlist sent successfully! We'll contact you soon with availability and pricing.");
        setShowCustomerForm(false);
        setCustomerInfo({ name: "", email: "", phone: "" });
      } else {
        alert(data.error || "Failed to send wishlist. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending wishlist:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Luxury Hero */}
      <section className="relative pb-16 md:pb-20 bg-gradient-to-b from-meadow-lavender to-meadow-lavender/95 overflow-hidden pt-28 md:pt-36 lg:pt-[240px]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-green rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center relative z-10 pt-20 md:pt-24">
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
              <span className="inline-block px-6 py-2 border border-charcoal-black/30 rounded-full text-charcoal-black font-montserrat text-sm tracking-widest uppercase">
                Your Selections
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-charcoal-black">
              Your Wishlist
            </h1>
            
            {/* Description */}
            <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto leading-relaxed">
              {hasItems 
                ? `${wishlistItemDetails.length} ${wishlistItemDetails.length === 1 ? 'item' : 'items'} selected for your custom package consultation`
                : "Items you'll select for your custom package consultation"
              }
            </p>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="w-16 h-px bg-charcoal-black/50" />
              <div className="w-2 h-2 bg-charcoal-black rounded-full" />
              <div className="w-16 h-px bg-charcoal-black/50" />
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
            {!hasItems ? (
              // Empty State
              <>
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
              </>
            ) : (
              // Wishlist Items
              <>
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <h2 className="heading-md text-forest-green">
                    Your Saved Items
                  </h2>
                  <div className="flex gap-3">
                    <button
                      onClick={handleEmailWishlist}
                      disabled={isSending}
                      className="px-6 py-2 bg-signature-gold text-white rounded-lg font-montserrat uppercase text-xs tracking-wider hover:bg-forest-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? "Sending..." : showCustomerForm ? "Send Wishlist" : "Email Wishlist"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to clear your entire wishlist?')) {
                          clearWishlist();
                        }
                      }}
                      className="px-6 py-2 border-2 border-wine-burgundy text-wine-burgundy rounded-lg font-montserrat uppercase text-xs tracking-wider hover:bg-wine-burgundy hover:text-white transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Customer Info Form */}
                {showCustomerForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-pearl-light rounded-lg p-6 mb-8 border-2 border-signature-gold/30"
                  >
                    <h3 className="heading-sm text-forest-green mb-4">
                      Your Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="customer-name" className="block text-sm font-semibold uppercase tracking-wide mb-2 text-charcoal-black/70">
                          Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="customer-name"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="customer-email" className="block text-sm font-semibold uppercase tracking-wide mb-2 text-charcoal-black/70">
                          Email <span className="text-wine-burgundy">*</span>
                        </label>
                        <input
                          type="email"
                          id="customer-email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          required
                          className="w-full px-4 py-2 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="customer-phone" className="block text-sm font-semibold uppercase tracking-wide mb-2 text-charcoal-black/70">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          id="customer-phone"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleEmailWishlist}
                        disabled={isSending || !customerInfo.email}
                        className="px-6 py-2 bg-signature-gold text-white rounded-lg font-montserrat uppercase text-xs tracking-wider hover:bg-forest-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSending ? "Sending..." : "Send Wishlist"}
                      </button>
                      <button
                        onClick={() => {
                          setShowCustomerForm(false);
                          setCustomerInfo({ name: "", email: "", phone: "" });
                        }}
                        className="px-6 py-2 border-2 border-charcoal-black/30 text-charcoal-black/70 rounded-lg font-montserrat uppercase text-xs tracking-wider hover:bg-charcoal-black/10 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {wishlistItemDetails.map((item) => (
                    <WishlistItemCard
                      key={item.id}
                      item={item}
                      onRemove={removeFromWishlist}
                    />
                  ))}
                </div>

                {/* Instructions */}
                <div className="bg-pearl-light rounded-lg p-8">
                  <h3 className="heading-sm text-forest-green mb-4">
                    Next Steps
                  </h3>
                  <div className="space-y-4 text-charcoal-black/80">
                    <p>
                      <strong>Ready to move forward?</strong> Click &quot;Email Wishlist&quot; above to send us your selections, or schedule a consultation to discuss your event in detail.
                    </p>
                    <p>
                      We&apos;ll work with you to create a custom package that brings your vision to life!
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-meadow-lavender">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="heading-lg text-charcoal-black">
              Ready to Plan Your Event?
            </h2>
            <p className="body-lg text-charcoal-black/80">
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