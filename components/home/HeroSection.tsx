"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🟢 Component mounted!");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    console.log("🎥 Setting up video...");
    const video = videoRef.current;
    
    if (!video) {
      console.log("❌ No video ref");
      return;
    }

    console.log("✅ Video element found");
    console.log("📊 Video readyState:", video.readyState);
    console.log("📊 Video src:", video.currentSrc);
    console.log("📊 Video paused:", video.paused);
    
    const playVideo = async () => {
      console.log("▶️ Attempting to play video...");
      try {
        video.muted = true;
        video.playsInline = true;
        
        await video.play();
        console.log("✅ Video playing!");
        console.log("📊 After play - paused:", video.paused);
      } catch (err) {
        console.error("❌ Play failed:", err);
      }
    };

    // Try multiple approaches
    console.log("Checking readyState:", video.readyState);
    
    if (video.readyState >= 3) {
      console.log("Video ready, playing now");
      playVideo();
    } else {
      console.log("Video not ready, waiting for loadeddata event");
      video.addEventListener('loadeddata', () => {
        console.log("📺 loadeddata event fired!");
        playVideo();
      }, { once: true });
      
      // Also try on canplay
      video.addEventListener('canplay', () => {
        console.log("📺 canplay event fired!");
      }, { once: true });
    }

    // Force load
    video.load();
    console.log("📺 video.load() called");

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

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
        <source src="https://sikaxiyfzkexnnkjkuhg.supabase.co/storage/v1/object/public/gallery/animations/home-page-video.mp4" type="video/mp4" />
      </video>

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