"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingCards() {
  const packages = [
    {
      name: "The Classic",
      description: "Perfect for intimate gatherings",
      investment: "Investment begins at $1,500",
      features: [
        "1-2 statement pieces",
        "Basic table settings for up to 50 guests",
        "Standard delivery and setup",
        "Coordinating color palette",
      ],
      accent: "meadow-sage",
    },
    {
      name: "The Signature",
      description: "Our most popular package",
      investment: "Investment begins at $3,500",
      features: [
        "3-5 custom pieces",
        "Complete table settings for up to 150 guests",
        "Premium delivery, setup, and styling",
        "Design consultation included",
        "On-site coordination",
      ],
      accent: "signature-gold",
      featured: true,
    },
    {
      name: "The Grand Affair",
      description: "For truly unforgettable events",
      investment: "Investment begins at $7,500",
      features: [
        "Unlimited custom pieces",
        "Full event design and styling",
        "White-glove service",
        "Multiple design consultations",
        "Dedicated event coordinator",
        "Custom fabrication included",
      ],
      accent: "wine-burgundy",
    },
  ];

  return (
    <section className="section-padding bg-forest-green text-pearl-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-signature-gold mb-6">
            Custom Packages
          </h2>
          <p className="body-lg text-pearl-white/80 max-w-3xl mx-auto">
            Flexible options to suit your vision and budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-pearl-white text-charcoal-black rounded-lg p-8 space-y-6 ${
                pkg.featured ? "md:scale-105 border-4 border-signature-gold" : ""
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-signature-gold text-charcoal-black px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="space-y-2">
                <h3 className={`text-3xl font-playfair font-bold text-${pkg.accent}`}>
                  {pkg.name}
                </h3>
                <p className="text-charcoal-black/70">{pkg.description}</p>
              </div>

              <div className={`text-2xl font-playfair font-semibold text-${pkg.accent}`}>
                {pkg.investment}
              </div>

              <ul className="space-y-4">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start space-x-3 text-charcoal-black/80"
                  >
                    <svg
                      className={`w-5 h-5 text-${pkg.accent} flex-shrink-0 mt-1`}
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

              <Link
                href="/contact"
                className={`block text-center px-8 py-4 bg-${pkg.accent} text-pearl-white font-montserrat font-semibold tracking-wide uppercase text-sm transition-all duration-300 hover:opacity-90`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-pearl-white/70 text-sm">
            All packages are customizable. Contact us for a personalized quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}