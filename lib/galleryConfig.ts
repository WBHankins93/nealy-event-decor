/**
 * Gallery Images Configuration
 * Maps all gallery images with their paths (supports both local and ImageKit)
 */

import { getImageKitUrl } from "./imagekit";

/**
 * Gallery structure mapping
 * Add your gallery folders and their images here
 */
export const galleryData = {
  '03-Gallery': {
    BlueSofaLounge: [
      'business pics-08',
      'IMG_0936',
      'IMG_0937',
      'IMG_0948',
      'IMG_0949'
    ],
    ItalianRomanceSetup: [
      'business pics-21',
      'business pics-22',
      'business pics-30',
      'business pics-34',
      'business pics-40',
      'business pics-41',
      'business pics-49',
      'business pics-51',
      'business pics-52',
      'business-pics-45',
      'IMG_0941',
      'IMG_0947'
    ],
    WeddingHighlights: [
      '18',
      '19',
      '20',
      '21',
      'DSC00014',
      'DSC01533-2',
      'DSC01576',
      'IMG_5071'
    ]
  }
  // Add more gallery sections as you upload them
};

/**
 * Use ImageKit if configured, otherwise use local paths
 * Set USE_IMAGEKIT=true in .env.local to enable ImageKit
 * Only use ImageKit if both the flag is true AND the endpoint is configured
 */
const USE_IMAGEKIT = process.env.NEXT_PUBLIC_USE_IMAGEKIT === 'true' && 
                     !!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

/**
 * Helper function to get image path (ImageKit or local)
 * @param section - Gallery section (e.g., '03-Gallery')
 * @param folder - Folder name (e.g., 'BlueSofaLounge')
 * @param imageName - Image name without extension
 * @returns ImageKit URL or local public folder path
 */
export function getImagePath(section: string, folder: string, imageName: string): string {
  const localPath = `/images/gallery/${section}/${folder}/${imageName}.jpg`;
  
  if (USE_IMAGEKIT) {
    // Use ImageKit path (matches the folder structure in ImageKit)
    const imageKitPath = `images/gallery/${section}/${folder}/${imageName}.jpg`;
    return getImageKitUrl(imageKitPath, { format: 'auto', quality: 80 });
  }
  
  // Use local public folder paths
  return localPath;
}

/**
 * Get all images for a specific gallery folder
 * @param section - Gallery section
 * @param folder - Folder name
 * @returns Array of local image paths
 */
export function getGalleryImages(section: string, folder: string): string[] {
  const sectionData = galleryData[section as keyof typeof galleryData];
  const images = sectionData?.[folder as keyof typeof sectionData] || [];
  return images.map(img => getImagePath(section, folder, img));
}

/**
 * Get all gallery sections
 */
export function getAllSections(): string[] {
  return Object.keys(galleryData);
}

/**
 * Get all folders in a section
 */
export function getFoldersInSection(section: string): string[] {
  return Object.keys(galleryData[section as keyof typeof galleryData] || {});
}