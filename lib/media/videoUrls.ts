/**
 * Video URL Configuration
 * Supports S3 (primary) and local paths (development fallback)
 */

import { getS3VideoBySection } from './s3';

// Video filename mappings for S3
const VIDEO_FILENAMES = {
  entrance: 'Video-no-text.mp4', // In "01 Landing Page" folder
  homePage: 'home-page-video.mp4', // In "02 Home Page" folder
  about: 'about.mp4', // In "05 About" folder
} as const;

// Local paths for development fallback
const LOCAL_VIDEOS = {
  entrance: "/videos/entrance/Video-no-text.mp4",
  homePage: "/animations/home-page-video.mp4",
  about: "/videos/about/about.mp4",
} as const;

/**
 * Get video URL by key
 * Priority: S3 > Local (development fallback)
 */
export function getVideoUrl(key: keyof typeof VIDEO_FILENAMES): string {
  const s3Bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  
  // Use S3 if configured
  if (s3Bucket) {
    const sectionMap: Record<keyof typeof VIDEO_FILENAMES, 'banner' | 'home' | 'about'> = {
      entrance: 'banner', // Landing page video
      homePage: 'home',
      about: 'about',
    };
    
    const section = sectionMap[key];
    const filename = VIDEO_FILENAMES[key];
    return getS3VideoBySection(section, filename);
  }
  
  // Fallback to local paths for development
  return LOCAL_VIDEOS[key];
}

export default VIDEO_FILENAMES;

