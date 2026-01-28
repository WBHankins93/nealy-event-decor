"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { rentalCategories } from "@/lib/rentals/rentalData";
import { RentalItem } from "@/lib/rentals/rentalTypes";
import { useWishlistContext } from "@/lib/wishlist/wishlistContext";
import { convertToS3Path } from "@/lib/media/s3";

export default function RentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Wishlist context
  const { addToWishlist, isInWishlist } = useWishlistContext();

  // Filter to only show the 5 main categories: Bars, Decor, Lounge Furniture, Lighting, Table top
  const allowedCategoryNames = ['Bars', 'Décor', 'Lounge Furniture', 'Lighting', 'Table Top'];
  const filteredCategories = rentalCategories.filter(cat => 
    allowedCategoryNames.includes(cat.name)
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    const itemsSection = document.getElementById('items-section');
    if (itemsSection) {
      itemsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedCategory(null);
    setSelectedSubcategory(subcategoryId);
    const itemsSection = document.getElementById('items-section');
    if (itemsSection) {
      itemsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleItemClick = (item: RentalItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const getAllImages = (item: RentalItem): string[] => {
    const images = [item.image, ...(item.images || [])];
    // Convert to S3 paths if enabled, otherwise use local paths
    return images.map(img => convertToS3Path(img));
  };

  const nextImage = () => {
    if (selectedItem) {
      const allImages = getAllImages(selectedItem);
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      const allImages = getAllImages(selectedItem);
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const handleAddToWishlist = () => {
    if (selectedItem) {
      addToWishlist(selectedItem.id);
      // Optional: Show a brief success message or keep modal open
    }
  };

  const getItemsToDisplay = () => {
    if (!selectedSubcategory) return [];
    
    for (const category of filteredCategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.id === selectedSubcategory) {
          return subcategory.items;
        }
      }
    }
    return [];
  };

  const getSelectedCategoryData = () => {
    if (!selectedCategory) return null;
    return filteredCategories.find(cat => cat.id === selectedCategory);
  };

  const itemsToDisplay = getItemsToDisplay();
  const selectedCategoryData = getSelectedCategoryData();
  const showAllItems = !selectedSubcategory && !selectedCategory;

  return (
    <div className="min-h-screen">
      {/* Luxury Hero */}
      <section className="relative pb-16 md:pb-20 bg-gradient-to-b from-forest-green to-forest-green/95 text-pearl-white overflow-hidden pt-28 md:pt-36 lg:pt-[240px]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-signature-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine-burgundy rounded-full blur-3xl" />
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

      {/* Sticky Category Navigation Bar - Pink Bar */}
      <div className="sticky top-0 z-40 bg-light-red shadow-lg">
        <div className="w-full">
          <div className="overflow-x-auto">
            <nav className="flex items-center justify-center min-w-max px-4">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="relative static"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Category Button */}
                  <button
                    className={`px-10 py-4 font-montserrat text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap text-forest-green hover:text-signature-gold`}
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

        {/* Subcategory Dropdowns */}
        <div className="relative">
          {filteredCategories.map((category) => (
            <AnimatePresence key={`dropdown-${category.id}`}>
              {hoveredCategory === category.id && category.subcategories.length > 0 && (
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
                      {/* Show all subcategories */}
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => {
                            handleSubcategoryClick(subcategory.id);
                            setHoveredCategory(null);
                          }}
                          className="text-left p-3 hover:bg-pearl-light transition-colors rounded group"
                        >
                          <span className="block font-playfair font-semibold text-base text-charcoal-black group-hover:text-signature-gold transition-colors leading-tight">
                            {subcategory.name}
                          </span>
                          <span className="block text-xs text-charcoal-black/50 mt-0.5 leading-tight">
                            {subcategory.description}
                          </span>
                          <span className="block text-xs text-signature-gold/70 mt-1 leading-tight">
                            {subcategory.items.length} {subcategory.items.length === 1 ? 'item' : 'items'}
                          </span>
                        </button>
                      ))}
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
            // Show category selection prompt when nothing is selected
            <div className="text-center py-20 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="heading-lg text-forest-green">Select a Category</h2>
                <p className="body-lg text-charcoal-black/70 max-w-2xl mx-auto">
                  Hover over a category above to explore our subcollections, or click to view all items in that category
                </p>
              </motion.div>

              {/* Category Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-8 max-w-6xl mx-auto"
              >
                {filteredCategories.map((category) => {
                  const totalItems = category.subcategories.reduce((sum, sub) => sum + sub.items.length, 0);
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center space-y-3"
                    >
                      <h3 className="font-playfair text-xl text-signature-gold group-hover:text-forest-green transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-charcoal-black/60">
                        {category.subcategories.length} {category.subcategories.length === 1 ? 'collection' : 'collections'}
                      </p>
                      <p className="text-xs font-montserrat text-signature-gold/70">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </p>
                    </button>
                  );
                })}
              </motion.div>
            </div>
          ) : selectedCategory ? (
            // Show all subcategories for selected main category
            <div className="space-y-12">
              {/* Back Button */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="inline-flex items-center gap-2 text-forest-green hover:text-signature-gold transition-colors font-montserrat text-sm uppercase tracking-wider"
              >
                <span>←</span>
                Back to All Rentals
              </button>

              {/* Main Category Header */}
              <div className="text-center space-y-4">
                <h2 className="heading-xl text-forest-green">{selectedCategoryData?.name}</h2>
                <p className="body-lg text-charcoal-black/70 max-w-3xl mx-auto">
                  Explore all collections in this category
                </p>
              </div>

              {/* All Subcategories for this Category */}
              {selectedCategoryData?.subcategories.map((subcategory) => (
                <div key={subcategory.id} className="space-y-6">
                  {/* Subcategory Header */}
                  <div className="text-center space-y-2">
                    <h3 className="heading-lg text-charcoal-black font-playfair">
                      {subcategory.name}
                    </h3>
                    <p className="body-base text-charcoal-black/60 max-w-2xl mx-auto">
                      {subcategory.description}
                    </p>
                  </div>

                  {/* Items Grid */}
                  {subcategory.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {subcategory.items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                          <button
                            onClick={() => handleItemClick(item)}
                            className="w-full text-left"
                          >
                            {/* Image */}
                            <div className="relative h-64 bg-pearl-light overflow-hidden">
                              <img
                                src={convertToS3Path(item.image)}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {item.quantity && (
                                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full">
                                  <span className="text-xs font-montserrat text-forest-green">
                                    Qty: {item.quantity}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-2">
                              <h4 className="font-playfair text-lg text-signature-gold group-hover:text-forest-green transition-colors">
                                {item.name}
                              </h4>
                              {item.subtitle && (
                                <p className="text-sm font-montserrat text-charcoal-black/70 uppercase tracking-wide">
                                  {item.subtitle}
                                </p>
                              )}
                              {item.description && (
                                <p className="text-sm text-charcoal-black/60 line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                              {item.dimensions && (
                                <p className="text-xs text-charcoal-black/50 font-montserrat">
                                  {item.dimensions}
                                </p>
                              )}
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-charcoal-black/50 py-8">
                      No items available in this collection yet
                    </p>
                  )}

                  {/* Divider between subcategories */}
                  <div className="h-px bg-charcoal-black/10 max-w-4xl mx-auto mt-8" />
                </div>
              ))}
            </div>
          ) : (
            // Show selected subcategory items
            <div className="space-y-8">
              {/* Back Button */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="inline-flex items-center gap-2 text-forest-green hover:text-signature-gold transition-colors font-montserrat text-sm uppercase tracking-wider"
              >
                <span>←</span>
                Back to All Rentals
              </button>

              {/* Subcategory Header */}
              {(() => {
                for (const category of filteredCategories) {
                  for (const subcategory of category.subcategories) {
                    if (subcategory.id === selectedSubcategory) {
                      return (
                        <div className="text-center space-y-4">
                          <h2 className="heading-lg text-forest-green">{subcategory.name}</h2>
                          <p className="body-lg text-charcoal-black/70 max-w-3xl mx-auto">
                            {subcategory.description}
                          </p>
                        </div>
                      );
                    }
                  }
                }
                return null;
              })()}

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {itemsToDisplay.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <button
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left"
                    >
                      {/* Image */}
                      <div className="relative h-64 bg-pearl-light overflow-hidden">
                        <img
                          src={convertToS3Path(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to local path if S3 fails
                            const img = e.currentTarget;
                            if (!img.src.includes(item.image)) {
                              img.src = item.image;
                            }
                            // If still fails, show placeholder
                            img.onerror = () => {
                              img.style.display = 'none';
                            };
                          }}
                        />
                        {item.quantity && (
                          <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full">
                            <span className="text-xs font-montserrat text-forest-green">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <h4 className="font-playfair text-lg text-signature-gold group-hover:text-forest-green transition-colors">
                          {item.name}
                        </h4>
                        {item.subtitle && (
                          <p className="text-sm font-montserrat text-charcoal-black/70 uppercase tracking-wide">
                            {item.subtitle}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-sm text-charcoal-black/60 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {item.dimensions && (
                          <p className="text-xs text-charcoal-black/50 font-montserrat">
                            {item.dimensions}
                          </p>
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-charcoal-black hover:text-signature-gold transition-colors shadow-lg"
                >
                  <span className="text-2xl">×</span>
                </button>

                {/* Image Gallery */}
                <div className="relative h-96 bg-pearl-light overflow-hidden">
                  {(() => {
                    const allImages = getAllImages(selectedItem);
                    const hasMultipleImages = allImages.length > 1;
                    return (
                      <>
                        <img
                          src={allImages[currentImageIndex]}
                          alt={selectedItem.name}
                          className="w-full h-full object-cover"
                        />
                        {hasMultipleImages && (
                          <>
                            {/* Navigation Arrows */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-charcoal-black hover:text-signature-gold transition-colors shadow-lg z-10"
                            >
                              <span className="text-2xl">‹</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-charcoal-black hover:text-signature-gold transition-colors shadow-lg z-10"
                            >
                              <span className="text-2xl">›</span>
                            </button>
                            {/* Image Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                              {allImages.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentImageIndex
                                      ? "bg-signature-gold w-6"
                                      : "bg-white/60 hover:bg-white/80"
                                  }`}
                                />
                              ))}
                            </div>
                            {/* Image Counter */}
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-montserrat text-charcoal-black z-10">
                              {currentImageIndex + 1} / {allImages.length}
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="heading-lg text-signature-gold mb-2">
                      {selectedItem.name}
                    </h3>
                    {selectedItem.subtitle && (
                      <p className="text-lg font-montserrat text-charcoal-black/70 uppercase tracking-wide">
                        {selectedItem.subtitle}
                      </p>
                    )}
                  </div>

                  {selectedItem.description && (
                    <p className="body-base text-charcoal-black/80 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-charcoal-black/10">
                    {selectedItem.dimensions && (
                      <div>
                        <span className="block text-xs font-montserrat uppercase tracking-wider text-charcoal-black/50 mb-1">
                          Dimensions
                        </span>
                        <span className="text-sm text-charcoal-black font-montserrat">
                          {selectedItem.dimensions}
                        </span>
                        {selectedItem.dimensionsNote && (
                          <span className="block text-xs text-charcoal-black/60 mt-1 italic">
                            {selectedItem.dimensionsNote}
                          </span>
                        )}
                      </div>
                    )}
                    {selectedItem.quantity && (
                      <div>
                        <span className="block text-xs font-montserrat uppercase tracking-wider text-charcoal-black/50 mb-1">
                          Quantity Available
                        </span>
                        <span className="text-sm text-charcoal-black">
                          {selectedItem.quantity}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    {isInWishlist(selectedItem.id) ? (
                      <Link
                        href="/wishlist"
                        className="flex-1 px-6 py-3 bg-forest-green text-white text-center font-montserrat text-sm uppercase tracking-wider hover:bg-forest-green/90 transition-colors rounded flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        View in Wishlist
                      </Link>
                    ) : (
                      <button
                        onClick={handleAddToWishlist}
                        className="flex-1 px-6 py-3 bg-forest-green text-white text-center font-montserrat text-sm uppercase tracking-wider hover:bg-forest-green/90 transition-colors rounded flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Add to Wishlist
                      </button>
                    )}
                    <Link
                      href="/contact"
                      className="flex-1 px-6 py-3 bg-signature-gold text-white text-center font-montserrat text-sm uppercase tracking-wider hover:bg-signature-gold/90 transition-colors rounded"
                    >
                      Inquire About This Item
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}