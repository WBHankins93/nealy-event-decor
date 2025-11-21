/**
 * S3 Path Verification Script
 * This script helps verify that S3 paths are being constructed correctly
 * Run with: node scripts/verify-s3-paths.js
 */

require('dotenv').config({ path: '.env.local' });

// Simulate the S3 path generation logic (matches lib/media/s3.ts)
function getS3ImageUrl(folder, filename) {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_S3_REGION || 'us-east-1';
  
  if (!bucketName) {
    console.log('❌ NEXT_PUBLIC_S3_BUCKET_NAME not set');
    return null;
  }
  
  // Preserve the original extension if present, otherwise default to .jpg
  let fileWithExt = filename;
  if (!filename.match(/\.[a-zA-Z0-9]+$/)) {
    fileWithExt = `${filename}.jpg`;
  }
  
  // Construct S3 path
  const s3Path = `01-Website-Creation/${folder}/${fileWithExt}`;
  
  // URL encode each path segment separately (preserve slashes)
  const pathParts = s3Path.split('/');
  const encodedParts = pathParts.map(part => encodeURIComponent(part));
  const encodedPath = encodedParts.join('/');
  
  // For us-east-1, use s3.amazonaws.com (no region in domain)
  if (region === 'us-east-1') {
    return `https://${bucketName}.s3.amazonaws.com/${encodedPath}`;
  }
  
  // Other regions use s3.{region}.amazonaws.com
  return `https://${bucketName}.s3.${region}.amazonaws.com/${encodedPath}`;
}

console.log('=== S3 Path Verification ===\n');
console.log('Bucket:', process.env.NEXT_PUBLIC_S3_BUCKET_NAME || 'NOT SET');
console.log('Region:', process.env.NEXT_PUBLIC_S3_REGION || 'us-east-1');
console.log('');

// Test Gallery Images
console.log('📸 GALLERY IMAGES (03 Gallery/)');
console.log('--------------------------------');
const galleryTests = [
  { folder: '03 Gallery/BlueSofaLounge', file: 'IMG_0936.jpg', note: 'The Sapphire Social Lounge' },
  { folder: '03 Gallery/BlueSofaLounge', file: 'business pics-08.jpg', note: 'The Sapphire Social Lounge' },
  { folder: '03 Gallery/ItalianRomanceSetup', file: 'business-pics-45.jpg', note: 'The Tuscany Soiree' },
  { folder: '03 Gallery/ItalianRomanceSetup', file: 'IMG_0941.jpg', note: 'The Tuscany Soiree' },
  { folder: '03 Gallery/WeddingHighlights', file: 'IMG_5071.jpg', note: 'Wedding Highlights' },
];

galleryTests.forEach(test => {
  const url = getS3ImageUrl(test.folder, test.file);
  console.log(`\n${test.note}`);
  console.log(`  Folder: ${test.folder}`);
  console.log(`  File: ${test.file}`);
  console.log(`  URL: ${url}`);
});

// Test Banner
console.log('\n\n🖼️  BANNER (01 Landing Page/)');
console.log('--------------------------------');
const bannerUrl = getS3ImageUrl('01 Landing Page', 'HP_Banner.png');
console.log(`  URL: ${bannerUrl}`);

// Test Services
console.log('\n\n🎨 SERVICES (04 Services/)');
console.log('--------------------------------');
const servicesTests = [
  { folder: '04 Services', file: 'italian-romance.jpg', note: 'The Tuscany Soiree' },
  { folder: '04 Services', file: 'BlueSofaLounge2.jpg', note: 'The Sapphire Social Lounge' },
];

servicesTests.forEach(test => {
  const url = getS3ImageUrl(test.folder, test.file);
  console.log(`\n${test.note}`);
  console.log(`  Folder: ${test.folder}`);
  console.log(`  File: ${test.file}`);
  console.log(`  URL: ${url}`);
});

// Test Rentals
console.log('\n\n🏠 RENTALS (07 Rentals/)');
console.log('--------------------------------');
const rentalsUrl = getS3ImageUrl('07 Rentals', 'TheMAGNOLIA6\'CustomizableBar.jpg');
console.log(`  Example: ${rentalsUrl}`);

console.log('\n\n=== IMPORTANT NOTES ===');
console.log('1. Folder names in S3 should match exactly (case-sensitive)');
console.log('2. File names should match exactly (case-sensitive)');
console.log('3. Spaces in folder names like "03 Gallery" are URL encoded as %20');
console.log('4. Special characters like apostrophes are URL encoded');
console.log('\n📋 COPY THESE URLS AND TEST THEM IN YOUR BROWSER');
console.log('   They should load directly if S3 permissions are correct\n');

