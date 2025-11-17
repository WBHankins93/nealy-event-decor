'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCloudinaryVideoUrl } from "@/lib/cloudinary";

interface VideoEntranceProps {
  onComplete: () => void;
  videoUrl?: string;
}

export default function VideoEntranceOptimized({ 
  onComplete,
  videoUrl
}: VideoEntranceProps) {
  // Use Cloudinary for video (with "public/" prefix to match upload structure)
  // Note: File is "Video-no-text.mp4" (with hyphens, not spaces)
  const defaultVideoUrl = getCloudinaryVideoUrl("public/videos/entrance/Video-no-text");
  
  const finalVideoUrl = videoUrl || defaultVideoUrl;
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const [showImage6, setShowImage6] = useState(false);
  const [showImage7, setShowImage7] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start loading immediately
    video.load();

    const handleCanPlayThrough = () => {
      setCanPlay(true);
      // Auto-play as soon as enough data is buffered
      video.play().catch((error) => {
        console.log('Auto-play prevented:', error);
      });
      
      // Show image 6 at 3 seconds
      setTimeout(() => {
        setShowImage6(true);
      }, 3000);
      
      // Show image 7 at 4 seconds
      setTimeout(() => {
        setShowImage7(true);
      }, 4000);
      
      // Stop video at 7 seconds to avoid white flash
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        handleComplete();
      }, 7000);
    };

    const handleEnded = () => {
      handleComplete();
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      // If video fails, skip to homepage after 2 seconds
      setTimeout(() => handleComplete(), 2000);
    };

    // Listen for when video can play through without stopping
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const handleComplete = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setShowVideo(false);
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleComplete();
  };

  if (!showVideo) return null;

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Elegant loading state - minimal, no spinner unless needed */}
          {!canPlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }} // Only show if loading takes >0.5s
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <div className="w-16 h-16 border-4 border-signature-gold border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}

          {/* Video with full screen coverage */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('Video load error:', e);
              // Fallback to local path if Cloudinary fails
              const video = e.currentTarget;
              if (video.src && !video.src.includes('/videos/')) {
                video.src = '/videos/entrance/Video-no-text.mp4';
              }
            }}
          >
            <source src={finalVideoUrl} type="video/mp4" />
            <source src="/videos/entrance/Video-no-text.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Text Images Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <AnimatePresence>
              {showImage6 && canPlay && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src="/videos/entrance/6.png"
                  alt=""
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '100vh', maxWidth: '100vw', width: '100%' }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showImage7 && canPlay && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  src="/videos/entrance/7.png"
                  alt=""
                  className="absolute w-full h-auto object-contain"
                  style={{ maxHeight: '100vh', maxWidth: '100vw', width: '100%' }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Skip Button - appears immediately */}
          {isPlaying && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              onClick={handleSkip}
              className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 hover:bg-white/20 
                         backdrop-blur-sm border border-white/30 rounded-full
                         text-white font-montserrat text-sm tracking-wide
                         transition-all duration-300 hover:scale-105
                         focus:outline-none focus:ring-2 focus:ring-white/50
                         z-50"
              aria-label="Skip intro video"
            >
              Skip Intro
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}