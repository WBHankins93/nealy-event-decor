/**
 * Video URL Configuration
 * Supports S3 (primary) and local paths (development fallback)
 */

import { getS3VideoBySection, getS3VideoUrl } from './s3';

// Video filename mappings for S3
const VIDEO_FILENAMES = {
  entrance: 'Video no text.mp4', // In "01 Landing Page" folder
  homePage: 'BW- Home Page Video.mp4', // In "02 Home Page" folder
  about: 'About page video.mp4', // In "05 About" folder
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
    // Entrance video is in "01 Landing Page " (with trailing space), not in banner section
    if (key === 'entrance') {
      return getS3VideoUrl('01 Landing Page ', VIDEO_FILENAMES[key]);
    }
    
    const sectionMap: Record<keyof typeof VIDEO_FILENAMES, 'banner' | 'home' | 'about'> = {
      entrance: 'banner', // Not used, handled above
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

