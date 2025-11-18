/**
 * Supabase Storage Upload Script
 * Uploads all gallery images and animation videos to Supabase Storage
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('   Make sure you have:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Paths
const GALLERY_BASE_PATH = './public/images/gallery';
const ANIMATIONS_BASE_PATH = './public/animations';
const BUCKET_NAME = 'gallery';

// Track upload results
const results = {
  success: [],
  failed: [],
  skipped: []
};

/**
 * Upload a single file to Supabase Storage
 */
async function uploadFile(filePath, storagePath) {
  try {
    console.log(`Uploading: ${filePath} -> ${storagePath}`);
    
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: false, // Don't overwrite existing files
        cacheControl: '3600'
      });
    
    if (error) {
      // Check if file already exists (which is fine)
      if (error.message.includes('already exists')) {
        console.log(`⊘ Already exists: ${storagePath}`);
        results.skipped.push(storagePath);
        return { skipped: true };
      }
      throw error;
    }
    
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);
    
    results.success.push({
      local: filePath,
      storage: storagePath,
      url: urlData.publicUrl
    });
    
    console.log(`✓ Uploaded: ${storagePath}`);
    return data;
  } catch (error) {
    results.failed.push({
      local: filePath,
      error: error.message
    });
    console.error(`✗ Failed: ${filePath} - ${error.message}`);
    return null;
  }
}

/**
 * Get content type based on file extension
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm'
  };
  return types[ext] || 'application/octet-stream';
}

/**
 * Recursively find all media files in directory
 */
function findMediaFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findMediaFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|webm)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Convert local file path to Supabase storage path
 */
function getStoragePath(localPath, basePath) {
  const relativePath = path.relative(basePath, localPath);
  return relativePath.replace(/\\/g, '/');
}

/**
 * Main upload function
 */
async function uploadAllMedia() {
  console.log('🚀 Starting Supabase Upload...\n');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Bucket: ${BUCKET_NAME}\n`);
  
  const allFiles = [];
  
  // Find gallery images
  if (fs.existsSync(GALLERY_BASE_PATH)) {
    console.log('📁 Scanning gallery images...');
    const galleryFiles = findMediaFiles(GALLERY_BASE_PATH);
    galleryFiles.forEach(file => {
      allFiles.push({
        localPath: file,
        storagePath: getStoragePath(file, GALLERY_BASE_PATH)
      });
    });
    console.log(`Found ${galleryFiles.length} gallery images`);
  }
  
  // Find animation videos
  if (fs.existsSync(ANIMATIONS_BASE_PATH)) {
    console.log('📁 Scanning animation videos...');
    const animationFiles = findMediaFiles(ANIMATIONS_BASE_PATH);
    animationFiles.forEach(file => {
      allFiles.push({
        localPath: file,
        storagePath: `animations/${path.basename(file)}`
      });
    });
    console.log(`Found ${animationFiles.length} animation videos`);
  }
  
  console.log(`\nTotal files to upload: ${allFiles.length}\n`);
  
  if (allFiles.length === 0) {
    console.log('No files found to upload.');
    return;
  }
  
  // Upload each file
  console.log('📤 Starting uploads...\n');
  for (const file of allFiles) {
    await uploadFile(file.localPath, file.storagePath);
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(50));
  console.log(`✓ Successful: ${results.success.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`⊘ Skipped: ${results.skipped.length}`);
  console.log('='.repeat(50) + '\n');
  
  // Print video URLs if any were uploaded
  const videoUploads = results.success.filter(r => /\.(mp4|mov|webm)$/i.test(r.storage));
  if (videoUploads.length > 0) {
    console.log('🎬 Video URLs:');
    videoUploads.forEach(video => {
      console.log(`   ${video.storage}`);
      console.log(`   → ${video.url}\n`);
    });
  }
  
  // Save detailed results to file
  const reportPath = './supabase-upload-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}\n`);
  
  if (results.failed.length > 0) {
    console.log('❌ Some uploads failed. Check the report for details.');
  } else {
    console.log('✅ All files uploaded successfully!');
    console.log('\n🎉 Your media is now on Supabase CDN!');
  }
}

// Run the upload
uploadAllMedia().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});