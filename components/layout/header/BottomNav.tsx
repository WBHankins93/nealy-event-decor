"use client";

import Link from "next/link";

export default function BottomNav() {
  return (
    <div className="flex justify-center items-center py-4 border-t border-signature-gold/10">
      <nav className="hidden lg:flex items-center gap-12 text-sm font-montserrat tracking-widest uppercase">
        <Link
          href="/gallery"
          className="text-charcoal-black hover:text-signature-gold transition-colors duration-300 relative group font-semibold"
        >
          Gallery
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-signature-gold transition-all duration-300 group-hover:w-full" />
        </Link>
        <Link
          href="/services"
          className="text-charcoal-black hover:text-signature-gold transition-colors duration-300 relative group font-semibold"
        >
          Services
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-signature-gold transition-all duration-300 group-hover:w-full" />
        </Link>
        <Link
          href="/rentals"
          className="text-charcoal-black hover:text-signature-gold transition-colors duration-300 relative group font-semibold"
        >
          Rentals
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-signature-gold transition-all duration-300 group-hover:w-full" />
        </Link>
      </nav>
    </div>
  );
}