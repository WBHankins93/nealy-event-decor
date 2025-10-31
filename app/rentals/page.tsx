"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { rentalCategories } from "@/lib/rentalData";
import { RentalItem, RentalCategory } from "@/lib/rentalTypes";

export default function RentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Scroll to items section
    const itemsSection = document.getElementById('items-section');
    if (itemsSection) {
      itemsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleItemClick = (item: RentalItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // Get items to display based on selected category
  const itemsToDisplay = selectedCategory
    ? rentalCategories.find(cat => cat.id === selectedCategory)?.items || []
    : [];

  const showAllItems = !selectedCategory;

  return (
    <div className="min-h-screen pt-24">
      {/* Luxury Hero */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-gradient-to-b from-forest-green to-forest-green/95 text-pearl-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine-burgundy rounded-full blur-3xl" />
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
                Our Collection
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="heading-xl text-signature-gold">Rentals</h1>

            {/* Description */}
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of luxury event rentals
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

      {/* Sticky Category Navigation Bar - Pink Bar Like Something Vintage */}
      <div className="sticky top-0 z-40 bg-wine-burgundy shadow-lg">
        <div className="w-full">
          <div className="overflow-x-auto">
            <nav className="flex items-center justify-center min-w-max px-4">
              {rentalCategories.map((category) => (
                <div
                  key={category.id}
                  className="relative static"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Category Button */}
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`px-6 py-4 font-montserrat text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'text-signature-gold bg-wine-burgundy/80'
                        : 'text-pearl-white hover:text-signature-gold'
                    }`}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Thin decorative line */}
        <div className="h-px bg-signature-gold/30"></div>

        {/* Dropdowns - Rendered outside nav container */}
        <div className="relative">
          {rentalCategories.map((category) => (
            <AnimatePresence key={`dropdown-${category.id}`}>
              {hoveredCategory === category.id && category.items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-0 left-0 right-0 bg-white shadow-2xl border-t-4 border-signature-gold z-50"
                  style={{
                    maxWidth: '100%',
                    margin: '0 auto'
                  }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="container-custom py-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {/* Category Description if available */}
                      {category.description && (
                        <div className="col-span-full mb-2">
                          <h3 className="text-base font-playfair font-semibold text-forest-green mb-1">
                            {category.name}
                          </h3>
                          <p className="text-xs text-charcoal-black/60">
                            {category.description}
                          </p>
                        </div>
                      )}
                      
                      {/* Show all items as grid */}
                      {category.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleCategoryClick(category.id);
                            setHoveredCategory(null);
                            setTimeout(() => handleItemClick(item), 300);
                          }}
                          className="text-left p-3 hover:bg-pearl-light transition-colors rounded group"
                        >
                          <span className="block font-medium text-sm text-charcoal-black group-hover:text-signature-gold transition-colors leading-tight">
                            {item.name}
                          </span>
                          <span className="block text-xs text-charcoal-black/50 mt-0.5 leading-tight">
                            {item.subtitle}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    {/* View All Button */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => {
                          handleCategoryClick(category.id);
                          setHoveredCategory(null);
                        }}
                        className="inline-block px-6 py-2 text-xs text-white bg-signature-gold hover:bg-forest-green transition-colors rounded font-montserrat uppercase tracking-wider"
                      >
                        View All {category.items.length} Items →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>

      {/* Items Display Section */}
      <section id="items-section" className="section-padding bg-pearl-white">
        <div className="container-custom">
          {showAllItems ? (
            // Show all categories and items when nothing is selected
            <div className="space-y-16">
              <div className="text-center mb-12">
                <h2 className="heading-lg text-forest-green mb-6">
                  Browse Our Complete Collection
                </h2>
                <p className="body-lg text-charcoal-black/80">
                  Select a category above to view specific items
                </p>
              </div>

              {rentalCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8">
                    <h3 className="heading-md text-forest-green mb-2">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-charcoal-black/60 text-sm">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.items.slice(0, 4).map((item) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        onClick={() => handleItemClick(item)}
                      />
                    ))}
                  </div>

                  {category.items.length > 4 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className="inline-flex items-center gap-2 text-signature-gold hover:text-forest-green font-montserrat text-sm uppercase tracking-wider transition-colors"
                      >
                        View All {category.items.length} Items in {category.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            // Show selected category items
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="heading-lg text-forest-green mb-2">
                    {rentalCategories.find(cat => cat.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-charcoal-black/60">
                    {itemsToDisplay.length} items available
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-signature-gold hover:text-forest-green font-montserrat text-sm uppercase tracking-wider transition-colors"
                >
                  ← Back to All Categories
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {itemsToDisplay.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>

              {itemsToDisplay.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-charcoal-black/60">
                    No items found in this category.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-charcoal-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-forest-green text-pearl-white p-6 rounded-t-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-signature-gold mb-2">
                      {selectedItem.name}
                    </h3>
                    <p className="text-sm font-montserrat uppercase tracking-wider opacity-90">
                      {selectedItem.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-pearl-white hover:text-signature-gold transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Image Placeholder */}
                <div className="aspect-video bg-pearl-light rounded-lg flex items-center justify-center">
                  <div className="text-center text-charcoal-black/40">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Image Coming Soon</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-playfair font-semibold text-forest-green mb-2">
                    Description
                  </h4>
                  <p className="text-charcoal-black/80 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedItem.dimensions && (
                    <div className="bg-pearl-light p-4 rounded-lg">
                      <h5 className="text-sm font-montserrat uppercase tracking-wider text-charcoal-black/60 mb-1">
                        Dimensions
                      </h5>
                      <p className="font-semibold text-forest-green">
                        {selectedItem.dimensions}
                      </p>
                    </div>
                  )}
                  <div className="bg-pearl-light p-4 rounded-lg">
                    <h5 className="text-sm font-montserrat uppercase tracking-wider text-charcoal-black/60 mb-1">
                      Quantity Available
                    </h5>
                    <p className="font-semibold text-forest-green">
                      {selectedItem.quantity}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="flex-1 bg-forest-green text-pearl-white text-center py-3 rounded-lg font-montserrat uppercase text-sm tracking-wider hover:bg-forest-green/90 transition-colors"
                  >
                    Inquire About This Item
                  </Link>
                  <button
                    className="px-6 py-3 border-2 border-signature-gold text-signature-gold rounded-lg font-montserrat uppercase text-sm tracking-wider hover:bg-signature-gold hover:text-white transition-colors"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Ready to Reserve?
            </h2>
            <p className="body-lg text-pearl-white/90">
              Contact us to check availability and book your rentals
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Item Card Component
function ItemCard({ item, onClick }: { item: RentalItem; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-signature-gold/30"
    >
      {/* Image Placeholder */}
      <div className="aspect-square bg-pearl-light flex items-center justify-center">
        <div className="text-charcoal-black/20">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* Item Details */}
      <div className="p-4">
        <h4 className="text-lg font-playfair font-semibold text-signature-gold mb-1 group-hover:text-forest-green transition-colors">
          {item.name}
        </h4>
        <p className="text-xs font-montserrat uppercase tracking-wider text-charcoal-black/60 mb-2">
          {item.subtitle}
        </p>
        <p className="text-sm text-charcoal-black/70 line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between text-xs text-charcoal-black/50">
          <span>Qty: {item.quantity}</span>
          {item.dimensions && <span className="text-right truncate ml-2">{item.dimensions}</span>}
        </div>
      </div>
    </motion.div>
  );
}