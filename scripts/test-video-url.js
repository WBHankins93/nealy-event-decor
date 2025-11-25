/**
 * Test Video URL Generation
 */

require('dotenv').config({ path: '.env.local' });

// Import the function (we'll need to use a workaround since it's TypeScript)
const { getS3VideoBySection } = require('../lib/media/s3');

console.log('=== Video URL Test ===\n');
console.log('Environment Variables:');
console.log('  NEXT_PUBLIC_S3_BUCKET_NAME:', process.env.NEXT_PUBLIC_S3_BUCKET_NAME || 'NOT SET');
console.log('  NEXT_PUBLIC_S3_REGION:', process.env.NEXT_PUBLIC_S3_REGION || 'NOT SET');
console.log('\n');

// Test home page video
const homeVideoUrl = getS3VideoBySection('home', 'home-page-video.mp4');
console.log('Home Page Video URL:');
console.log('  ', homeVideoUrl);
console.log('\n');

// Test entrance video
const entranceVideoUrl = getS3VideoBySection('banner', 'Video-no-text.mp4');
console.log('Entrance Video URL:');
console.log('  ', entranceVideoUrl);
console.log('\n');

// Test about video
const aboutVideoUrl = getS3VideoBySection('about', 'about.mp4');
console.log('About Video URL:');
console.log('  ', aboutVideoUrl);
console.log('\n');

console.log('=== Test URLs in Browser ===');
console.log('Copy these URLs and test them directly in your browser.');
console.log('If they return 403, the bucket permissions are still incorrect.');
console.log('If they return 404, the file path is wrong or file doesn\'t exist in S3.\n');

