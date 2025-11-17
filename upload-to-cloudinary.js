/**
 * Cloudinary Upload Script
 * Uploads all images and videos from public folder to Cloudinary
 * 
 * Usage: node upload-to-cloudinary.js
 * 
 * Make sure you have these in .env.local:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * - CLOUDINARY_API_KEY
 * - CLOUDINARY_API_SECRET
 * 
 * Get them from: Cloudinary Dashboard -> Settings -> Product Environment Credentials
 */

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Validate credentials
if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Missing Cloudinary credentials in .env.local');
  console.error('   Required:');
  console.error('   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  console.error('   - CLOUDINARY_API_KEY');
  console.error('   - CLOUDINARY_API_SECRET');
  console.error('\n   Get them from: Cloudinary Dashboard -> Settings -> Product Environment Credentials');
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Track upload results
const results = {
  success: [],
  failed: [],
  skipped: [],
  totalSize: 0
};

/**
 * Get file size in MB
 */
function getFileSizeMB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size / (1024 * 1024);
  } catch {
    return 0;
  }
}

/**
 * Compress image if it's large (over 3MB for better compatibility)
 * Images are compressed to fit within Cloudinary's 10MB upload limit
 */
async function compressImageIfNeeded(filePath) {
  const fileSizeMB = getFileSizeMB(filePath);
  
  // Compress images over 3MB to ensure they fit under 10MB limit
  if (fileSizeMB < 3) {
    return null; // Return null to use original
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    
    if (!isImage) {
      return null; // Not an image, can't compress with sharp
    }

    console.log(`   ⚙️  Compressing large image (${fileSizeMB.toFixed(2)} MB)...`);
    
    // Progressive compression: try different quality levels to get under 10MB
    let quality = 85;
    let compressed = null;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts && quality >= 60) {
      compressed = await sharp(filePath)
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toBuffer();
      
      const compressedSizeMB = compressed.length / (1024 * 1024);
      
      // If compressed size is under 9MB, we're good (leave 1MB buffer)
      if (compressedSizeMB < 9) {
        const savings = ((fileSizeMB - compressedSizeMB) / fileSizeMB * 100).toFixed(1);
        console.log(`   ✅ Compressed to ${compressedSizeMB.toFixed(2)} MB (${savings}% reduction) at quality ${quality}`);
        return compressed;
      }
      
      // Reduce quality and try again
      quality -= 10;
      attempts++;
    }
    
    // If we still have a compressed version, use it even if slightly over
    if (compressed) {
      const compressedSizeMB = compressed.length / (1024 * 1024);
      if (compressedSizeMB < 10) {
        const savings = ((fileSizeMB - compressedSizeMB) / fileSizeMB * 100).toFixed(1);
        console.log(`   ✅ Compressed to ${compressedSizeMB.toFixed(2)} MB (${savings}% reduction) at quality ${quality}`);
        return compressed;
      }
    }
    
    console.log(`   ⚠️  Could not compress below 10MB - file will be skipped for manual upload`);
    return 'SKIP'; // Signal that this file should be skipped
  } catch (error) {
    console.error(`   ⚠️  Compression failed: ${error.message}`);
    return null; // Use original if compression fails
  }
}

/**
 * Convert local file path to Cloudinary public_id
 * Example: ./public/images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg
 *          -> images/gallery/03-Gallery/BlueSofaLounge/IMG_0936
 */
function getCloudinaryPublicId(localPath) {
  // Remove ./public/ prefix
  let relativePath = localPath.replace(/^\.\/public\//, '');
  
  // Normalize path separators
  relativePath = relativePath.replace(/\\/g, '/');
  
  // Remove file extension for public_id (Cloudinary handles extensions automatically)
  relativePath = relativePath.replace(/\.[^/.]+$/, '');
  
  return relativePath;
}

/**
 * Upload a single file to Cloudinary
 */
async function uploadFile(filePath, delay = 200) {
  try {
    const fileName = path.basename(filePath);
    const fileSizeMB = getFileSizeMB(filePath);
    const publicId = getCloudinaryPublicId(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    // Skip hidden files
    if (fileName.startsWith('.') || fileName.startsWith('._')) {
      return;
    }

    // Check file size (Cloudinary free tier has 10MB limit for API uploads)
    // Note: Videos over 10MB will be skipped (they need manual compression or direct upload)
    // Images over 10MB will attempt compression first
    const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);
    
    if (fileSizeMB > 10) {
      if (isVideo) {
        console.log(`⚠️  Skipping ${fileName} (${fileSizeMB.toFixed(2)} MB - video exceeds 10MB upload limit)`);
        console.log(`   💡 Tip: Upload via Cloudinary Media Library UI to preserve original quality`);
        results.skipped.push({
          file: fileName,
          local: filePath,
          reason: 'Video too large (>10MB) - upload via Media Library UI to preserve original quality',
          size: fileSizeMB.toFixed(2) + ' MB',
          publicId: publicId // Include public_id so user knows where to upload it
        });
        return;
      } else {
        // For images, we'll try compression first
        console.log(`⚠️  Large image detected (${fileSizeMB.toFixed(2)} MB) - attempting compression...`);
      }
    }

    console.log(`📤 Uploading: ${fileName} (${fileSizeMB.toFixed(2)} MB)`);
    console.log(`   Public ID: ${publicId}`);
    
    // Try to compress large images
    let fileBuffer = null;
    const compressed = await compressImageIfNeeded(filePath);
    
    if (compressed === 'SKIP') {
      // Image couldn't be compressed below 10MB
      console.log(`⚠️  Skipping ${fileName} - too large even after compression`);
      results.skipped.push({
        file: fileName,
        local: filePath,
        reason: 'Image too large (>10MB even after compression) - upload via Media Library UI to preserve original quality',
        size: fileSizeMB.toFixed(2) + ' MB',
        publicId: publicId
      });
      return;
    } else if (compressed) {
      fileBuffer = compressed;
    }

    // Determine resource type (already determined above for size check)
    const resourceType = isVideo ? 'video' : 'image';
    
    // Upload options
    // IMPORTANT: Cloudinary stores whatever you upload
    // - If you upload original: stored at original quality ✅
    // - If you upload compressed: stored as compressed version
    // - For files over 10MB: Consider uploading via Media Library UI to preserve originals
    const uploadOptions = {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true, // Overwrite if exists
      invalidate: true, // Invalidate CDN cache
      folder: '', // We're using the full path as public_id, so no folder
      // Quality is controlled when serving via URL parameters (q_100, q_auto, etc.)
      // q_100 serves the stored file at full quality (whatever was uploaded)
    };

    // Upload to Cloudinary
    let uploadResult;
    if (fileBuffer) {
      // Upload compressed buffer using upload_stream
      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
    } else {
      // Upload file directly
      uploadResult = await cloudinary.uploader.upload(filePath, uploadOptions);
    }

    results.totalSize += uploadResult.bytes;
    const uploadedSizeMB = (uploadResult.bytes / (1024 * 1024)).toFixed(2);

    results.success.push({
      local: filePath,
      publicId: publicId,
      url: uploadResult.secure_url,
      size: uploadedSizeMB + ' MB',
      resourceType: resourceType
    });

    console.log(`✅ Uploaded: ${publicId}`);
    console.log(`   URL: ${uploadResult.secure_url}`);
    console.log(`   Size: ${uploadedSizeMB} MB\n`);

    // Delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, delay));
  } catch (error) {
    console.error(`❌ Failed: ${filePath}`);
    console.error(`   Error: ${error.message}\n`);
    results.failed.push({
      file: path.basename(filePath),
      local: filePath,
      error: error.message,
      publicId: getCloudinaryPublicId(filePath)
    });
  }
}

/**
 * Find all media files recursively
 */
function findMediaFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    // Skip hidden files
    if (file.startsWith('.') || file.startsWith('._')) {
      return;
    }

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findMediaFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      const mediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.webm'];
      if (mediaExtensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

/**
 * Main upload function
 */
async function uploadAllMedia() {
  console.log('🚀 Starting Cloudinary Upload...\n');
  console.log(`Cloud Name: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}\n`);

  // Find all media files
  const mediaDirs = [
    './public/images',
    './public/videos',
    './public/animations'
  ];

  let allFiles = [];
  for (const dir of mediaDirs) {
    if (fs.existsSync(dir)) {
      const files = findMediaFiles(dir);
      allFiles = allFiles.concat(files);
    }
  }

  if (allFiles.length === 0) {
    console.log('⚠️  No media files found in public/images, public/videos, or public/animations');
    return;
  }

  console.log(`📁 Found ${allFiles.length} media files\n`);
  console.log('📤 Starting uploads...\n');
  console.log('='.repeat(60) + '\n');

  // Upload files sequentially to avoid rate limits
  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    console.log(`[${i + 1}/${allFiles.length}]`);
    await uploadFile(file, 200); // 200ms delay between uploads
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`⊘ Skipped: ${results.skipped.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📦 Total Size: ${(results.totalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log('='.repeat(60) + '\n');

  // Create detailed list of files needing manual upload
  const needsManualUpload = [
    ...results.skipped,
    ...results.failed
  ];

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    summary: {
      total: allFiles.length,
      successful: results.success.length,
      failed: results.failed.length,
      skipped: results.skipped.length,
      needsManualUpload: needsManualUpload.length,
      totalSizeMB: (results.totalSize / (1024 * 1024)).toFixed(2)
    },
    successful: results.success,
    failed: results.failed,
    skipped: results.skipped,
    needsManualUpload: needsManualUpload
  };

  const reportPath = './cloudinary-upload-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Full report saved to: ${reportPath}\n`);

  // Print files needing manual upload
  if (needsManualUpload.length > 0) {
    console.log('='.repeat(60));
    console.log('📋 FILES REQUIRING MANUAL UPLOAD');
    console.log('='.repeat(60));
    console.log(`\n⚠️  ${needsManualUpload.length} file(s) need to be uploaded via Cloudinary Media Library UI\n`);
    console.log('📝 Instructions:');
    console.log('   1. Go to: https://cloudinary.com/console/media_library');
    console.log('   2. Click "Upload" button');
    console.log('   3. Upload the files listed below\n');
    console.log('📁 Files to upload manually:\n');
    
    needsManualUpload.forEach((item, index) => {
      const filePath = item.file || item.local || 'Unknown';
      const reason = item.reason || item.error || 'Unknown reason';
      const size = item.size || 'Unknown size';
      
      console.log(`${index + 1}. ${filePath}`);
      console.log(`   📍 Location: ${item.local || filePath}`);
      console.log(`   ⚠️  Reason: ${reason}`);
      if (size !== 'Unknown size') {
        console.log(`   📦 Size: ${size}`);
      }
      console.log('');
    });

    // Create a text file with the list for easy reference
    const manualUploadListPath = './cloudinary-manual-upload-list.txt';
    let manualUploadList = 'FILES REQUIRING MANUAL UPLOAD TO CLOUDINARY\n';
    manualUploadList += '='.repeat(60) + '\n\n';
    manualUploadList += `Total files: ${needsManualUpload.length}\n\n`;
    manualUploadList += 'Instructions:\n';
    manualUploadList += '1. Go to: https://cloudinary.com/console/media_library\n';
    manualUploadList += '2. Click "Upload" button\n';
    manualUploadList += '3. Upload the files listed below\n';
    manualUploadList += '4. Use the same folder structure as your local files\n\n';
    manualUploadList += 'Files to upload:\n';
    manualUploadList += '-'.repeat(60) + '\n\n';
    
    needsManualUpload.forEach((item, index) => {
      const filePath = item.file || item.local || 'Unknown';
      const reason = item.reason || item.error || 'Unknown reason';
      const size = item.size || 'Unknown size';
      
      manualUploadList += `${index + 1}. ${filePath}\n`;
      manualUploadList += `   Location: ${item.local || filePath}\n`;
      manualUploadList += `   Reason: ${reason}\n`;
      if (size !== 'Unknown size') {
        manualUploadList += `   Size: ${size}\n`;
      }
      manualUploadList += '\n';
    });

    fs.writeFileSync(manualUploadListPath, manualUploadList);
    console.log(`📄 Manual upload list saved to: ${manualUploadListPath}\n`);
    console.log('='.repeat(60) + '\n');
  } else {
    console.log('✅ All files uploaded successfully! No manual uploads needed.\n');
  }

  if (results.failed.length > 0) {
    console.log('⚠️  Some files failed to upload. Check the report for details.\n');
  } else {
    console.log('🎉 All files uploaded successfully to Cloudinary!\n');
    console.log('📝 Next steps:');
    console.log('   1. Verify files in Cloudinary Dashboard');
    console.log('   2. Check that NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set in .env.local');
    console.log('   3. Restart your dev server\n');
    console.log('💡 Note: Cloudinary automatically optimizes images/videos when serving them.');
    console.log('   Your code uses f_auto and q_auto transformations for best performance.\n');
  }
}

// Run upload
uploadAllMedia().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});

