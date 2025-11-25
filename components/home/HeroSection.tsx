"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getVideoUrl } from "@/lib/media/videoUrls";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🟢 Component mounted!");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        console.log("✅ Video playing!");
      } catch (err) {
        console.error("❌ Play failed:", err);
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', () => {
        playVideo();
      }, { once: true });
      
      video.addEventListener('canplay', () => {
        playVideo();
      }, { once: true });
    }

    video.load();

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-28 md:-mt-36 lg:-mt-[240px] pt-28 md:pt-36 lg:pt-[240px]">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 right-0 w-full h-full object-cover z-0"
        onError={(e) => {
          console.error('Video load error:', e);
          // Fallback to local path if S3 fails
          const video = e.currentTarget;
          if (video.src && !video.src.includes('/animations/')) {
            video.src = '/animations/home-page-video.mp4';
          }
        }}
        onLoadedData={() => {
          const video = videoRef.current;
          if (video) {
            video.play().catch(err => {
              console.error('Video play error:', err);
            });
          }
        }}
      >
        <source 
          src={getVideoUrl("homePage")}
          type="video/mp4" 
        />
        <source 
          src="/animations/home-page-video.mp4"
          type="video/mp4" 
        />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-charcoal-black/30 z-10" />

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.h1
            className="heading-xl text-pearl-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Walking Into a Dream
          </motion.h1>

          <motion.p
            className="body-lg text-pearl-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Where luxury meets imagination. Custom event décor and fabrication 
            for celebrations that leave lasting impressions.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link
              href="/contact"
              className="btn-primary"
            >
              Let&apos;s Plan Together
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}