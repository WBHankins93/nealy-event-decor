"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralDivider from "../layout/FloralDivider";

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      quote: "Nealy transformed our wedding vision into reality beyond our wildest dreams. Every detail was perfection.",
      author: "Sarah & Michael",
      event: "Wedding Reception",
    },
    {
      quote: "The custom arch they created became the focal point of our entire event. Absolutely stunning craftsmanship.",
      author: "Jennifer Martinez",
      event: "Corporate Gala",
    },
    {
      quote: "Professional, creative, and dedicated to bringing our aesthetic to life. We couldn't have asked for better partners.",
      author: "The Thompson Family",
      event: "Anniversary Celebration",
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-warm-eggshell">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-forest-green mb-6">
            Client Testimonials
          </h2>
          <FloralDivider size="medium" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <p className="text-2xl md:text-3xl font-playfair italic text-charcoal-black leading-relaxed">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div>
                  <p className="font-montserrat font-semibold text-signature-gold">
                    {testimonials[current].author}
                  </p>
                  <p className="text-sm text-charcoal-black/60 uppercase tracking-wide">
                    {testimonials[current].event}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-12">
            <button
              onClick={prev}
              className="p-3 rounded-full border-2 border-signature-gold text-signature-gold hover:bg-signature-gold hover:text-pearl-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-signature-gold w-8"
                      : "bg-signature-gold/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border-2 border-signature-gold text-signature-gold hover:bg-signature-gold hover:text-pearl-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}