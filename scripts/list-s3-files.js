/**
 * List S3 Files Script
 * Run with: node scripts/list-s3-files.js
 * 
 * This will list all files in the S3 bucket to help identify correct filenames
 */

require('dotenv').config({ path: '.env.local' });

const { execSync } = require('child_process');

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_S3_REGION || 'us-east-2';

if (!bucketName) {
  console.error('❌ NEXT_PUBLIC_S3_BUCKET_NAME not set in .env.local');
  process.exit(1);
}

console.log('📋 Listing files in S3 bucket...\n');
console.log(`Bucket: ${bucketName}`);
console.log(`Region: ${region}\n`);

try {
  // List files in specific folders
  const folders = [
    '01-Website-Creation/01 Landing Page/',
    '01-Website-Creation/03 Gallery/Blue Sofa Lounge/',
    '01-Website-Creation/03 Gallery/Italian Romance Setup/',
    '01-Website-Creation/03 Gallery/Wedding Highlights/',
    '01-Website-Creation/04 Services/',
  ];

  folders.forEach(folder => {
    console.log(`\n📁 ${folder}`);
    console.log('─'.repeat(60));
    try {
      const output = execSync(
        `aws s3 ls s3://${bucketName}/${folder} --region ${region}`,
        { encoding: 'utf-8', stdio: 'pipe' }
      );
      if (output.trim()) {
        output.split('\n').forEach(line => {
          if (line.trim()) {
            const parts = line.trim().split(/\s+/);
            const filename = parts[parts.length - 1];
            const size = parts[parts.length - 2];
            console.log(`  ${filename} (${size} bytes)`);
          }
        });
      } else {
        console.log('  (empty)');
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  });

  console.log('\n✅ Done!');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Make sure AWS CLI is configured with:');
  console.log('   aws configure');
}

