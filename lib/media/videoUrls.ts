/**
 * Cloudinary Video URLs
 * These are the exact URLs from Cloudinary after upload
 * Using hardcoded URLs ensures reliable loading in production
 */

const CLOUDINARY_VIDEOS = {
  entrance: "https://res.cloudinary.com/dlsv2rwt0/video/upload/v1763413841/Video-no-text_cylokl.mp4",
  homePage: "https://res.cloudinary.com/dlsv2rwt0/video/upload/v1763413793/home-page-video_ee5c9d.mp4",
  about: "https://res.cloudinary.com/dlsv2rwt0/video/upload/v1763413825/about_dh1da6.mp4",
} as const;

/**
 * Get video URL by key
 * Falls back to local path if Cloudinary is not configured (for development)
 */
export function getVideoUrl(key: keyof typeof CLOUDINARY_VIDEOS): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  // If Cloudinary is configured, use the hardcoded Cloudinary URL
  if (cloudName) {
    return CLOUDINARY_VIDEOS[key];
  }
  
  // Fallback to local paths for development
  const localPaths = {
    entrance: "/videos/entrance/Video-no-text.mp4",
    homePage: "/animations/home-page-video.mp4",
    about: "/videos/about/about.mp4",
  };
  
  return localPaths[key];
}

export default CLOUDINARY_VIDEOS;

