"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function RentalsPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const rentalCategories = [
    {
      name: "Bars",
      items: ["Bar", "Bar Back", "Bar Cart", "Drink Displays"]
    },
    {
      name: "Decor",
      items: [
        "Large Decor",
        "Small Decor",
        "Games",
        "Umbrellas",
        "Vessels + Containers",
        "Candle Holder + Votives",
        "Decanter + Vases",
        "Trays"
      ]
    },
    {
      name: "Lounge Furniture",
      items: ["Sofa", "Lounge Tables", "Coffee Table", "End Tables"]
    },
    {
      name: "Lighting",
      items: ["Statement Lighting", "Table Top Lighting"]
    },
    {
      name: "Table Top",
      items: ["Dinnerware", "Drinkware", "Accessories", "Linens"]
    }
  ];

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Simple Hero */}
      <section className="section-padding bg-forest-green text-pearl-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-signature-gold mb-6">
              Rentals
            </h1>
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto">
              Explore our curated collection of luxury event rentals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rental Categories with Dropdown */}
      <section className="section-padding bg-pearl-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-forest-green mb-6">
              Browse by Category
            </h2>
            <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
              Select a category to explore our inventory
            </p>
          </motion.div>

          {/* Category Headers */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {rentalCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleCategory(category.name)}
                className={`p-6 rounded-lg text-center font-playfair font-semibold transition-all duration-300 ${
                  openCategory === category.name
                    ? "bg-forest-green text-pearl-white shadow-lg"
                    : "bg-pearl-light text-forest-green hover:bg-pearl-light/80 hover:shadow-md"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Dropdown Content */}
          <AnimatePresence mode="wait">
            {openCategory && (
              <motion.div
                key={openCategory}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-pearl-light rounded-lg overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="heading-md text-forest-green mb-6">
                    {openCategory}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {rentalCategories
                      .find((cat) => cat.name === openCategory)
                      ?.items.map((item) => (
                        <div
                          key={item}
                          className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                          <p className="text-charcoal-black/80 font-medium group-hover:text-forest-green transition-colors">
                            {item}
                          </p>
                        </div>
                      ))}
                  </div>
                  
                  {/* Additional Details Section */}
                  <div className="p-4 bg-signature-gold/10 rounded-lg border border-signature-gold/20">
                    <p className="text-sm text-charcoal-black/70 text-center">
                      Click on any item to see detailed features including dimensions and quantity available
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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