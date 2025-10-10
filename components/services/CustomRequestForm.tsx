"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CustomRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guestCount: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="section-padding bg-pearl-light">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-forest-green mb-6">
            Request a Custom Quote
          </h2>
          <p className="body-lg text-charcoal-black/80">
            Tell us about your event and we'll create a personalized proposal
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-montserrat font-semibold text-charcoal-black mb-2 uppercase tracking-wide"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors bg-pearl-white"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-montserrat font-semibold text-charcoal-black mb-2 uppercase tracking-wide"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors bg-pearl-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-montserrat font-semibold text-charcoal-black mb-2 uppercase tracking-wide"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors bg-pearl-white"
              />
            </div>

            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-montserrat font-semibold text-charcoal-black mb-2 uppercase tracking-wide"
              >
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors bg-pearl-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="eventType"
                className="block text-sm font-montserrat font-semibold text-charcoal-black mb-2 uppercase tracking-wide"
              >
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors bg-pearl-white"
              >
                <option value="">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="gala">Gala</option>
                <option value="anniversary">Anniversary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="guestCount"
                className="block text-sm font-montserrat font-semibold text-charcoal-black mb-2 uppercase tracking-wide"
              >
                Guest Count
              </label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="Approximate number"
                className="w-full px-4 py-3 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors bg-pearl-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-montserrat font-semibold text-charcoal-black mb-2 uppercase tracking-wide"
            >
              Tell Us About Your Vision
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
              className="w-full px-4 py-3 border-2 border-signature-gold/30 focus:border-signature-gold outline-none transition-colors bg-pearl-white resize-none"
              placeholder="Describe your event style, color palette, and any specific items you're interested in..."
            />
          </div>

          <motion.button
            type="submit"
            className="w-full btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Request
          </motion.button>

          <p className="text-sm text-center text-charcoal-black/60">
            We'll respond within 24-48 hours with a personalized proposal
          </p>
        </motion.form>
      </div>
    </section>
  );
}