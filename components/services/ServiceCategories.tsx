"use client";

import { motion } from "framer-motion";

export default function ServiceCategories() {
  const services = [
    {
      title: "Custom Arches",
      description: "Dramatic statement pieces designed to your specifications, from minimalist modern to lush floral installations.",
      features: [
        "Bespoke design consultation",
        "Premium materials",
        "On-site installation",
        "Styling and finishing",
      ],
    },
    {
      title: "Luxury Bars",
      description: "Custom bar designs that become conversation centerpieces, tailored to match your event aesthetic.",
      features: [
        "Custom size and design",
        "Multiple finish options",
        "Bar accessories included",
        "Professional setup",
      ],
    },
    {
      title: "Event Furniture",
      description: "Curated collections of seating, tables, and accent pieces to complement your décor vision.",
      features: [
        "Diverse style options",
        "Mix-and-match collections",
        "Clean and maintained",
        "Delivery included",
      ],
    },
    {
      title: "Ceremony Backdrops",
      description: "Create an unforgettable focal point for your ceremony with custom-designed backdrops.",
      features: [
        "Personalized designs",
        "Various sizes available",
        "Structural support",
        "Weather-resistant options",
      ],
    },
    {
      title: "Table Settings",
      description: "From linens to centerpieces, complete tablescape design for cohesive event styling.",
      features: [
        "Coordinated color palettes",
        "Premium table linens",
        "Centerpiece design",
        "Place setting accessories",
      ],
    },
    {
      title: "Custom Fabrication",
      description: "Large-scale custom pieces and installations that bring your unique vision to life.",
      features: [
        "Concept to completion",
        "Foam construction",
        "Any size or shape",
        "Hand-painted finishes",
      ],
    },
  ];

  return (
    <section className="section-padding bg-pearl-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-forest-green mb-6">
            What We Offer
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-pearl-light p-8 rounded-lg border-2 border-transparent hover:border-signature-gold/30 transition-all duration-300 space-y-6"
            >
              <h3 className="text-2xl font-playfair font-semibold text-signature-gold">
                {service.title}
              </h3>
              <p className="text-charcoal-black/80 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start space-x-3 text-sm text-charcoal-black/70"
                  >
                    <svg
                      className="w-5 h-5 text-signature-gold flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}