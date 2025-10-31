"use client";

import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="hidden md:flex justify-center items-center gap-10 py-1 border-t border-signature-gold/10">
      <Link
        href="/gallery"
        className="text-sm font-montserrat tracking-widest uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
      >
        Gallery
      </Link>
      <Link
        href="/services"
        className="text-sm font-montserrat tracking-widest uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
      >
        Services
      </Link>
      <Link
        href="/rentals"
        className="text-sm font-montserrat tracking-widest uppercase text-charcoal-black hover:text-signature-gold transition-colors duration-300"
      >
        Rentals
      </Link>
    </nav>
  );
}