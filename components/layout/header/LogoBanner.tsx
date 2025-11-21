"use client";

import Link from "next/link";
import Image from "next/image";
import { getS3ImageBySection } from "@/lib/media/s3";

export default function LogoBanner() {
  // Get banner image from S3 or use local fallback
  const bannerImage = process.env.NEXT_PUBLIC_S3_BUCKET_NAME
    ? getS3ImageBySection('banner', 'HP_Banner.png')
    : '/images/banner/HP_Banner.png';
  
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center items-center overflow-hidden m-0 p-0">
      {/* Full Banner with Logo */}
      <Link href="/" className="relative z-10 w-full flex items-center justify-center m-0 p-0">
        <div className="w-full flex items-center justify-center m-0 p-0">
          <Image
            src={bannerImage}
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