/**
 * Gallery Images Configuration
 * Maps all gallery images with their paths (S3 primary, local fallback)
 */

import { getS3ImageUrl } from "../media/s3";

/**
 * Gallery structure mapping
 * Add your gallery folders and their images here
 * These correspond to subfolders in S3: 01-Website-Creation/03 Gallery/
 */
export const galleryData = {
  '03-Gallery': {
    'Blue Sofa Lounge': [
      'G_BSL_P1.jpg',
      'G_BSL_P2.jpg',
      'G_BSL_P3.png',
      'G_BSL_P4.jpg',
      'G_BSL_P5.jpg'
    ],
    'Italian Romance Setup': [
      'G_IRS_P1.png',
      'G_IRS_P2.png',
      'G_IRS_P3.png',
      'G_IRS_P4.png',
      'G_IRS_P5.png',
      'G_IRS_P6.png',
      'G_IRS_P7.png',
      'G_IRS_P8.png',
      'G_IRS_P9.jpg',
      'G_IRS_P10.jpg',
      'G_IRS_P11.jpg'
    ],
    'Wedding Highlights': [
      'G_WH_P1.png',
      'G_WH_P2.png',
      'G_WH_P3.png',
      'G_WH_P4.png',
      'G_WH_P6.jpg',
      'G_WH_P7.png',
      'G_WH_P8.jpg'
    ]
  }
  // Add more gallery sections as you upload them
};

/**
 * Helper function to get image path (S3 primary, local fallback)
 * @param section - Gallery section (e.g., '03-Gallery')
 * @param folder - Folder name (e.g., 'BlueSofaLounge')
 * @param imageName - Image name without extension
 * @returns S3 URL or local public folder path
 */
export function getImagePath(section: string, folder: string, imageName: string): string {
  // Use S3 if configured, otherwise fallback to local
  // S3 folder structure: 01-Website-Creation/03 Gallery/{folder}/{imageName}
  // imageName can include extension or not - getS3ImageUrl will handle it
  const s3Folder = `03 Gallery/${folder}`;
  // If imageName already has extension, use it; otherwise getS3ImageUrl will add .jpg
  return getS3ImageUrl(s3Folder, imageName.includes('.') ? imageName : `${imageName}.jpg`);
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