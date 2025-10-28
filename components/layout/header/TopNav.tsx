"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <div className="flex justify-start items-center py-3 border-b border-signature-gold/10">
      <nav className="hidden lg:flex items-center gap-8 text-xs font-montserrat tracking-widest uppercase">
        <Link
          href="/about"
          className="text-charcoal-black hover:text-signature-gold transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="/contact"
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
    </div>
  );
}