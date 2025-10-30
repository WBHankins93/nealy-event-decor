"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <div className="flex justify-between items-center py-2 border-b border-signature-gold/10">
      {/* Left side - menu items */}
      <nav className="flex items-center gap-8 text-xs font-montserrat tracking-widest uppercase">
        <Link
          href="/about"
          className="text-charcoal-black hover:text-signature-gold transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="/faqs"
          className="text-charcoal-black hover:text-signature-gold transition-colors duration-300"
        >
          FAQs
        </Link>
        <Link
          href="/contact"
          className="text-charcoal-black hover:text-signature-gold transition-colors duration-300"
        >
          Contact
        </Link>
      </nav>

      {/* Right side - cart icon */}
      <Link
        href="/wishlist"
        className="text-charcoal-black hover:text-signature-gold transition-colors duration-300 p-2"
        aria-label="View Wishlist"
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </Link>
    </div>
  );
}