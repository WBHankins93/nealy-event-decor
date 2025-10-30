"use client";

import Link from "next/link";

interface TopNavProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function TopNav({ isMobileMenuOpen, setIsMobileMenuOpen }: TopNavProps) {
  return (
    <div className="relative flex justify-between items-center py-1 px-4 border-b border-signature-gold/10">
      {/* Mobile Menu Button - Inside TopNav on mobile */}
      {setIsMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-charcoal-black hover:text-signature-gold transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}
      
      {/* Left side - menu items - ONLY SHOW ON DESKTOP */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-montserrat tracking-widest uppercase">
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
        className="text-charcoal-black hover:text-signature-gold transition-colors duration-300 p-1"
        aria-label="View Wishlist"
      >
        <svg
          className="w-5 h-5"
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