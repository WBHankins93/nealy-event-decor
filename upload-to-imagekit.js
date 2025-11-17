/**
 * ImageKit Upload Script
 * Uploads all images and videos from public folder to ImageKit
 * 
 * Usage: node upload-to-imagekit.js
 * 
 * Make sure you have these in .env.local:
 * - NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
 * - IMAGEKIT_PRIVATE_KEY
 * - NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
 */

require('dotenv').config({ path: '.env.local' });
const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

// Validate credentials
if (!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 
    !process.env.IMAGEKIT_PRIVATE_KEY || 
    !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
  console.error('❌ Missing ImageKit credentials in .env.local');
  console.error('   Make sure you have:');
  console.error('   - NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY');
  console.error('   - IMAGEKIT_PRIVATE_KEY');
  console.error('   - NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT');
  process.exit(1);
}

// Track upload results
const results = {
  success: [],
  failed: [],
  skipped: [],
  totalSize: 0
};

/**
 * Get content type based on file extension
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm',
  };
  return contentTypes[ext] || 'application/octet-stream';
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
    // Skip hidden files (like .DS_Store, ._ files)
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
 * Convert local file path to ImageKit folder path
 * Example: ./public/images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg
 *          -> images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg
 */
function getImageKitPath(localPath) {
  // Remove ./public/ prefix
  let relativePath = localPath.replace(/^\.\/public\//, '');
  
  // Normalize path separators
  relativePath = relativePath.replace(/\\/g, '/');
  
  return relativePath;
}

/**
 * Compress image if it's too large (>25MB)
 * Returns compressed buffer or original buffer if compression not needed/failed
 */
async function compressImageIfNeeded(filePath, fileBuffer) {
  const MAX_SIZE = 25 * 1024 * 1024; // 25MB in bytes
  const ext = path.extname(filePath).toLowerCase();
  const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  
  // If file is already under limit or not an image, return original
  if (fileBuffer.length <= MAX_SIZE || !isImage) {
    return fileBuffer;
  }

  try {
    console.log(`   ⚙️  Compressing large image (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB)...`);
    
    // Compress image using sharp
    let compressedBuffer;
    if (ext === '.png') {
      // For PNG, convert to JPEG for better compression
      compressedBuffer = await sharp(fileBuffer)
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
    } else {
      // For JPEG, recompress with quality optimization
      compressedBuffer = await sharp(fileBuffer)
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
    }

    const compressedSizeMB = (compressedBuffer.length / (1024 * 1024)).toFixed(2);
    console.log(`   ✅ Compressed to ${compressedSizeMB} MB`);

    // If still too large, try more aggressive compression
    if (compressedBuffer.length > MAX_SIZE) {
      console.log(`   ⚙️  Applying more aggressive compression...`);
      compressedBuffer = await sharp(fileBuffer)
        .jpeg({ quality: 75, mozjpeg: true })
        .resize(4000, 4000, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .toBuffer();
      
      const finalSizeMB = (compressedBuffer.length / (1024 * 1024)).toFixed(2);
      console.log(`   ✅ Final size: ${finalSizeMB} MB`);
    }

    return compressedBuffer;
  } catch (error) {
    console.log(`   ⚠️  Compression failed, using original: ${error.message}`);
    return fileBuffer;
  }
}

/**
 * Upload a single file to ImageKit
 */
async function uploadFile(filePath, delay = 100) {
  try {
    const imageKitPath = getImageKitPath(filePath);
    const fileName = path.basename(filePath);
    const folder = path.dirname(imageKitPath).replace(/\\/g, '/');
    
    // Skip if file is a hidden/system file
    if (fileName.startsWith('.') || fileName.startsWith('._')) {
      console.log(`⊘ Skipping hidden file: ${fileName}`);
      results.skipped.push({ local: filePath, reason: 'Hidden file' });
      return;
    }

    // Check file size
    const stats = fs.statSync(filePath);
    const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    const MAX_SIZE = 25 * 1024 * 1024; // 25MB limit
    
    console.log(`📤 Uploading: ${fileName} (${originalSizeMB} MB)`);
    console.log(`   Path: ${imageKitPath}`);
    
    let fileBuffer = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);
    
    // Compress if needed (for images only)
    if (fileBuffer.length > MAX_SIZE) {
      const ext = path.extname(filePath).toLowerCase();
      const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
      
      if (isImage) {
        fileBuffer = await compressImageIfNeeded(filePath, fileBuffer);
      } else {
        // For videos or other files, we can't compress via API
        throw new Error(`File size (${originalSizeMB} MB) exceeds ImageKit's 25MB API limit. Please upload manually via ImageKit dashboard or compress the file first.`);
      }
    }
    
    const finalSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);
    if (fileBuffer.length !== stats.size) {
      console.log(`   📦 Final upload size: ${finalSizeMB} MB`);
    }
    
    results.totalSize += fileBuffer.length;
    
    // Upload to ImageKit
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: folder,
      useUniqueFileName: false, // Keep original filename
      overwriteFile: false, // Don't overwrite if exists
    });

    results.success.push({
      local: filePath,
      imageKit: imageKitPath,
      url: result.url,
      fileId: result.fileId,
      originalSize: originalSizeMB + ' MB',
      uploadedSize: finalSizeMB + ' MB',
      compressed: fileBuffer.length !== stats.size
    });

    console.log(`✅ Uploaded: ${imageKitPath}`);
    console.log(`   URL: ${result.url}\n`);

    // Small delay to avoid rate limits
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return result;
  } catch (error) {
    // Check if file already exists
    if (error.message && error.message.includes('already exists')) {
      console.log(`⊘ Already exists: ${getImageKitPath(filePath)}`);
      results.skipped.push({
        local: filePath,
        reason: 'Already exists in ImageKit'
      });
      return null;
    }

    // Check if it's a size limit error
    if (error.message && error.message.includes('exceeds') && error.message.includes('26214400')) {
      const ext = path.extname(filePath).toLowerCase();
      const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);
      
      if (isVideo) {
        console.error(`   ⚠️  Video files >25MB must be uploaded manually via ImageKit dashboard`);
        console.error(`   📍 Upload to: ${getImageKitPath(filePath)}`);
      }
    }

    results.failed.push({
      local: filePath,
      error: error.message || 'Unknown error'
    });
    console.error(`❌ Failed: ${filePath}`);
    console.error(`   Error: ${error.message}\n`);
    return null;
  }
}

/**
 * Main upload function
 */
async function uploadAllMedia() {
  console.log('🚀 Starting ImageKit Upload...\n');
  console.log(`ImageKit Endpoint: ${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}`);
  console.log(`Public Key: ${process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY.substring(0, 20)}...\n`);

  const allFiles = [];

  // Find all media files in public folder
  const publicDirs = [
    './public/images',
    './public/videos',
    './public/animations'
  ];

  console.log('📁 Scanning for media files...\n');
  
  publicDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = findMediaFiles(dir);
      console.log(`Found ${files.length} files in ${dir}`);
      allFiles.push(...files);
    }
  });

  console.log(`\n📊 Total files to upload: ${allFiles.length}\n`);

  if (allFiles.length === 0) {
    console.log('No files found to upload.');
    return;
  }

  // Calculate total size
  let totalSize = 0;
  allFiles.forEach(file => {
    try {
      const stats = fs.statSync(file);
      totalSize += stats.size;
    } catch (e) {
      // Skip if can't read file
    }
  });
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  const totalSizeGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);
  
  console.log(`📦 Total size: ${totalSizeMB} MB (${totalSizeGB} GB)\n`);
  console.log('⚠️  This may take a while for large files...\n');
  console.log('📤 Starting uploads...\n');
  console.log('='.repeat(60) + '\n');

  // Upload each file
  let uploaded = 0;
  for (const file of allFiles) {
    uploaded++;
    console.log(`[${uploaded}/${allFiles.length}]`);
    await uploadFile(file, 200); // 200ms delay between uploads
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⊘ Skipped: ${results.skipped.length}`);
  console.log(`📦 Total uploaded size: ${(results.totalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log('='.repeat(60) + '\n');

  // Save report
  const reportPath = './imagekit-upload-report.json';
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: allFiles.length,
      successful: results.success.length,
      failed: results.failed.length,
      skipped: results.skipped.length,
      totalSizeMB: (results.totalSize / (1024 * 1024)).toFixed(2)
    },
    successful: results.success,
    failed: results.failed,
    skipped: results.skipped
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}\n`);

  if (results.failed.length > 0) {
    console.log('❌ Some uploads failed. Check the report for details.');
    console.log('   You can re-run this script - it will skip existing files.\n');
  } else {
    console.log('🎉 All files uploaded successfully to ImageKit!\n');
    console.log('📝 Next steps:');
    console.log('   1. Set NEXT_PUBLIC_USE_IMAGEKIT=true in .env.local');
    console.log('   2. Restart your dev server');
    console.log('   3. Test your site to ensure images/videos load from ImageKit');
    console.log('   4. Once confirmed, you can remove files from public/ folder\n');
  }
}

// Run the upload
uploadAllMedia().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});

