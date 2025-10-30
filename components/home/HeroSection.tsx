"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = async () => {
      console.log("Video loaded, attempting to play...");
      setIsVideoLoaded(true);
      
      try {
        video.muted = true; // Force muted
        video.loop = true;  // Force loop
        await video.play();
        console.log("✅ Video playing successfully");
      } catch (error) {
        console.error("❌ Video autoplay failed:", error);
      }
    };

    const handleEnded = () => {
      console.log("Video ended, restarting...");
      video.currentTime = 0;
      video.play();
    };

    const handleError = (e: any) => {
      console.error("❌ Video error:", e);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Force load
    video.load();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/animations/home-page-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Debug info - remove after fixing */}
      {!isVideoLoaded && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded z-50">
          Video Loading...
        </div>
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-charcoal-black/30" />

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