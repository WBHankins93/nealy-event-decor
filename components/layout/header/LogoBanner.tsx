"use client";

import Link from "next/link";
import Image from "next/image";

export default function LogoBanner() {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center items-center overflow-hidden bg-pearl-white">
      {/* Full Banner with Logo */}
      <Link href="/" className="relative z-10 w-full flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/images/banner/homepage-banner.png"
            alt="Nealy Event Decor"
            width={1920}
            height={96}
            className="w-full h-auto"
            priority
          />
        </div>
      </Link>
    </div>
  );
}