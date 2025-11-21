"use client";

import Link from "next/link";
import Image from "next/image";

export default function LogoBanner() {
  // Using local image for now (will move to S3 later)
  
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center items-center overflow-hidden m-0 p-0">
      {/* Full Banner with Logo */}
      <Link href="/" className="relative z-10 w-full flex items-center justify-center m-0 p-0">
        <div className="w-full flex items-center justify-center m-0 p-0">
          <Image
            src="/images/banner/HP_Banner.png"
            alt="Nealy Event Decor"
            width={1920}
            height={150}
            className="w-full h-auto block m-0 p-0"
            priority
          />
        </div>
      </Link>
    </div>
  );
}