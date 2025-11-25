/**
 * Test S3 URL Accessibility
 * This script tests if S3 URLs are accessible
 */

const https = require('https');

// Test URL - replace with an actual image URL from your site
const testUrl = 'https://nealy-decor-bucket.s3.us-east-2.amazonaws.com/01-Website-Creation/03%20Gallery/BlueSofaLounge/IMG_0936.jpg';

console.log('Testing S3 URL accessibility...\n');
console.log('URL:', testUrl);
console.log('\nMaking request...\n');

const url = new URL(testUrl);
const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; S3-Test)'
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  
  if (res.statusCode === 200) {
    console.log('\n✅ SUCCESS: Image is accessible!');
    console.log('Content-Type:', res.headers['content-type']);
    console.log('Content-Length:', res.headers['content-length'], 'bytes');
  } else if (res.statusCode === 403) {
    console.log('\n❌ ERROR: Access Denied (403)');
    console.log('This usually means:');
    console.log('  - Bucket policy is not set correctly');
    console.log('  - Block public access is still enabled');
    console.log('  - File permissions are incorrect');
  } else if (res.statusCode === 404) {
    console.log('\n❌ ERROR: File Not Found (404)');
    console.log('This means the file path is incorrect or file does not exist in S3');
  } else {
    console.log('\n⚠️  Unexpected status code:', res.statusCode);
  }
  
  res.on('data', () => {}); // Consume response
  res.on('end', () => {
    console.log('\nTest complete.');
  });
});

req.on('error', (error) => {
  console.error('\n❌ ERROR:', error.message);
  console.log('\nThis could indicate:');
  console.log('  - Network connectivity issues');
  console.log('  - DNS resolution problems');
  console.log('  - SSL certificate issues');
});

req.end();

