"use client";

import { motion } from "framer-motion";
import ServiceCategories from "@/components/services/ServiceCategories";
import PricingCards from "@/components/services/PricingCards";
import CustomRequestForm from "@/components/services/CustomRequestForm";

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-forest-emerald to-forest-green text-pearl-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-signature-gold mb-6">
              Our Services
            </h1>
            <p className="body-lg text-pearl-white/90 max-w-3xl mx-auto">
              From premium rentals to custom fabrication, we bring your vision to life 
              with meticulous attention to detail and uncompromising quality.
            </p>
          </motion.div>
        </div>
      </section>

      <ServiceCategories />

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="body-lg text-charcoal-black/80 max-w-3xl mx-auto">
              A seamless journey from concept to reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Share your vision and event details with us",
              },
              {
                step: "02",
                title: "Design",
                description: "We create custom mockups and proposals",
              },
              {
                step: "03",
                title: "Fabrication",
                description: "Our team brings designs to life with precision",
              },
              {
                step: "04",
                title: "Installation",
                description: "We set up and style your event flawlessly",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-signature-gold/20 flex items-center justify-center">
                  <span className="text-3xl font-playfair font-bold text-signature-gold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-forest-green">
                  {item.title}
                </h3>
                <p className="text-charcoal-black/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PricingCards />
      <CustomRequestForm />
    </div>
  );
}