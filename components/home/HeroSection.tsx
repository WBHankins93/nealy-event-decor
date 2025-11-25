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
        video.setAttribute('playsinline', 'true');
        
        const played = await video.play();
        console.log("✅ Video playing!", played);
        console.log("📊 After play - paused:", video.paused);
        console.log("📊 Video currentTime:", video.currentTime);
        console.log("📊 Video readyState:", video.readyState);
        console.log("📊 Video networkState:", video.networkState);
        
        // Verify video is actually visible
        const rect = video.getBoundingClientRect();
        console.log("📊 Video dimensions:", rect.width, "x", rect.height);
        console.log("📊 Video visible:", rect.width > 0 && rect.height > 0);
      } catch (err) {
        console.error("❌ Play failed:", err);
      }
    };

    // Try multiple approaches
    console.log("Checking readyState:", video.readyState);
    
    // Wait for video to be ready to play
    const tryPlay = () => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        playVideo();
      }
    };

    // Try immediately if ready
    tryPlay();

    // Also listen for when video can actually play
    video.addEventListener('canplay', () => {
      console.log("📺 canplay event fired!");
      tryPlay();
    }, { once: true });

    video.addEventListener('canplaythrough', () => {
      console.log("📺 canplaythrough event fired!");
      tryPlay();
    }, { once: true });

    video.addEventListener('loadeddata', () => {
      console.log("📺 loadeddata event fired!");
      tryPlay();
    }, { once: true });

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-28 md:-mt-36 lg:-mt-[240px] pt-28 md:pt-36 lg:pt-[240px]">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ minHeight: '100vh' }}
        src={getVideoUrl("homePage")}
        onError={(e) => {
          console.error('Video load error:', e);
          console.error('Failed URL:', e.currentTarget.src);
          // Fallback to local path if S3 fails
          const video = e.currentTarget;
          if (video.src && !video.src.includes('/animations/')) {
            console.log('Falling back to local video');
            video.src = '/animations/home-page-video.mp4';
          }
        }}
        onLoadedData={() => {
          const video = videoRef.current;
          if (video) {
            console.log('📹 Video loaded data event');
            console.log('📹 Video currentSrc:', video.currentSrc);
            console.log('📹 Video duration:', video.duration);
            console.log('📹 Video videoWidth:', video.videoWidth);
            console.log('📹 Video videoHeight:', video.videoHeight);
            video.play().catch(err => {
              console.error('❌ Video play error:', err);
            });
          }
        }}
        onCanPlay={() => {
          const video = videoRef.current;
          if (video) {
            console.log('📹 Video can play - duration:', video.duration, 'readyState:', video.readyState);
          }
        }}
        onPlaying={() => {
          console.log('▶️ Video is actually playing now!');
        }}
      >
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-charcoal-black/30 z-10" />

      {/* Content */}
      <div className="container-custom relative z-20 text-center">
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