/**
 * S3 Debug Utilities
 * Use these to verify S3 paths and URLs are correct
 */

import { getS3ImageUrl, getS3Url, S3_FOLDER_MAP } from './s3';

/**
 * Debug function to log S3 URLs for verification
 */
export function debugS3Paths() {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_S3_REGION || 'us-east-1';
  
  console.log('=== S3 Configuration ===');
  console.log('Bucket:', bucketName || 'NOT SET');
  console.log('Region:', region);
  console.log('CloudFront:', process.env.NEXT_PUBLIC_S3_CLOUDFRONT_DOMAIN || 'NOT SET');
  console.log('');
  
  if (!bucketName) {
    console.warn('⚠️  NEXT_PUBLIC_S3_BUCKET_NAME is not set!');
    return;
  }
  
  console.log('=== Example S3 URLs ===');
  
  // Test gallery images
  console.log('\nGallery Images:');
  const galleryFolder = '03 Gallery/BlueSofaLounge';
  const testImage = 'IMG_0936.jpg';
  const galleryUrl = getS3ImageUrl(galleryFolder, testImage);
  console.log(`  Folder: ${galleryFolder}`);
  console.log(`  File: ${testImage}`);
  console.log(`  URL: ${galleryUrl}`);
  console.log(`  Expected: https://${bucketName}.s3${region === 'us-east-1' ? '' : '.' + region}.amazonaws.com/01-Website-Creation/03%20Gallery/BlueSofaLounge/IMG_0936.jpg`);
  
  // Test banner
  console.log('\nBanner Image:');
  const bannerUrl = getS3ImageUrl('01 Landing Page', 'HP_Banner.png');
  console.log(`  URL: ${bannerUrl}`);
  
  // Test services
  console.log('\nServices Images:');
  const servicesUrl = getS3ImageUrl('04 Services', 'italian-romance.jpg');
  console.log(`  URL: ${servicesUrl}`);
  
  // Test rentals
  console.log('\nRentals Images:');
  const rentalsUrl = getS3ImageUrl('07 Rentals', 'TheMAGNOLIA6\'CustomizableBar.jpg');
  console.log(`  URL: ${rentalsUrl}`);
  
  console.log('\n=== Folder Mapping ===');
  Object.entries(S3_FOLDER_MAP).forEach(([key, folder]) => {
    console.log(`  ${key} -> ${folder}`);
  });
}

/**
 * Generate a test URL for a specific file
 */
export function testS3Url(folder: string, filename: string): string {
  return getS3ImageUrl(folder, filename);
}

