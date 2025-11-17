/**
 * Vercel Blob Upload Script
 * Uploads all images and videos from public folder to Vercel Blob Storage
 * 
 * Usage: node upload-to-vercel-blob.js
 * 
 * Make sure you have BLOB_READ_WRITE_TOKEN in .env.local
 * Get it from: Vercel Dashboard -> Your Project -> Storage -> Blob -> Settings
 */

require('dotenv').config({ path: '.env.local' });
const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Validate token
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('❌ Missing BLOB_READ_WRITE_TOKEN in .env.local');
  console.error('   Get it from: Vercel Dashboard -> Your Project -> Storage -> Blob -> Settings');
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
 * Convert local file path to blob storage path
 * Example: ./public/images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg
 *          -> images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg
 */
function getBlobPath(localPath) {
  // Remove ./public/ prefix
  let relativePath = localPath.replace(/^\.\/public\//, '');
  
  // Normalize path separators
  relativePath = relativePath.replace(/\\/g, '/');
  
  return relativePath;
}

/**
 * Upload a single file to Vercel Blob
 */
async function uploadFile(filePath, delay = 100) {
  try {
    const blobPath = getBlobPath(filePath);
    const fileName = path.basename(filePath);
    
    // Skip if file is a hidden/system file
    if (fileName.startsWith('.') || fileName.startsWith('._')) {
      console.log(`⊘ Skipping hidden file: ${fileName}`);
      results.skipped.push({ local: filePath, reason: 'Hidden file' });
      return;
    }

    // Check file size
    const stats = fs.statSync(filePath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    results.totalSize += stats.size;

    console.log(`📤 Uploading: ${fileName} (${fileSizeMB} MB)`);
    console.log(`   Path: ${blobPath}`);
    
    const fileBuffer = fs.readFileSync(filePath);
    
    // Upload to Vercel Blob
    const blob = await put(blobPath, fileBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    results.success.push({
      local: filePath,
      blob: blobPath,
      url: blob.url,
      pathname: blob.pathname,
      size: fileSizeMB + ' MB'
    });

    console.log(`✅ Uploaded: ${blobPath}`);
    console.log(`   URL: ${blob.url}\n`);

    // Small delay to avoid rate limits
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return blob;
  } catch (error) {
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
  console.log('🚀 Starting Vercel Blob Upload...\n');
  console.log('📦 Vercel Blob Storage\n');

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
  console.log('⚠️  Vercel Blob free tier: 1GB storage, 10GB bandwidth/month\n');
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
  const reportPath = './vercel-blob-upload-report.json';
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
    console.log('   You can re-run this script - it will overwrite existing files.\n');
  } else {
    console.log('🎉 All files uploaded successfully to Vercel Blob!\n');
    console.log('📝 Next steps:');
    console.log('   1. Get your Blob Store URL from Vercel Dashboard');
    console.log('   2. Add NEXT_PUBLIC_BLOB_STORE_URL to .env.local');
    console.log('   3. Update code to use Vercel Blob');
    console.log('   4. Restart your dev server\n');
  }
}

// Run the upload
uploadAllMedia().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});

