/**
 * Comprehensive S3 Diagnosis Script
 */

require('dotenv').config({ path: '.env.local' });

const https = require('https');

console.log('=== S3 DIAGNOSIS ===\n');

// Check environment variables
console.log('1. Environment Variables:');
console.log('   NEXT_PUBLIC_S3_BUCKET_NAME:', process.env.NEXT_PUBLIC_S3_BUCKET_NAME || '❌ NOT SET');
console.log('   NEXT_PUBLIC_S3_REGION:', process.env.NEXT_PUBLIC_S3_REGION || '❌ NOT SET');
console.log('');

// Test URLs
const testUrls = [
  {
    name: 'Home Page Video',
    url: 'https://nealy-decor-bucket.s3.us-east-2.amazonaws.com/01-Website-Creation/02%20Home%20Page/home-page-video.mp4'
  },
  {
    name: 'Gallery Image',
    url: 'https://nealy-decor-bucket.s3.us-east-2.amazonaws.com/01-Website-Creation/03%20Gallery/BlueSofaLounge/IMG_0936.jpg'
  },
  {
    name: 'Banner Image',
    url: 'https://nealy-decor-bucket.s3.us-east-2.amazonaws.com/01-Website-Creation/01%20Landing%20Page/HP_Banner.png'
  }
];

function testUrl(name, url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    const req = https.request(options, (res) => {
      let status = res.statusCode;
      let errorCode = res.headers['x-amz-error-code'] || '';
      let errorMessage = res.headers['x-amz-error-message'] || '';
      
      resolve({
        name,
        url,
        status,
        errorCode,
        errorMessage,
        headers: res.headers
      });
      
      res.on('data', () => {});
      res.on('end', () => {});
    });

    req.on('error', (error) => {
      resolve({
        name,
        url,
        status: 'ERROR',
        error: error.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        name,
        url,
        status: 'TIMEOUT'
      });
    });

    req.end();
  });
}

async function runDiagnostics() {
  console.log('2. Testing S3 URLs:\n');
  
  for (const test of testUrls) {
    const result = await testUrl(test.name, test.url);
    
    console.log(`   ${test.name}:`);
    console.log(`   URL: ${test.url}`);
    
    if (result.status === 200) {
      console.log(`   Status: ✅ 200 OK`);
      console.log(`   Content-Type: ${result.headers['content-type']}`);
    } else if (result.status === 403) {
      console.log(`   Status: ❌ 403 Forbidden`);
      if (result.errorCode) {
        console.log(`   Error Code: ${result.errorCode}`);
      }
      if (result.errorMessage) {
        console.log(`   Error Message: ${result.errorMessage}`);
      }
      console.log(`   → This means permissions are blocking access`);
    } else if (result.status === 404) {
      console.log(`   Status: ❌ 404 Not Found`);
      console.log(`   → File doesn't exist at this path in S3`);
    } else {
      console.log(`   Status: ❌ ${result.status || result.error || 'Unknown'}`);
    }
    console.log('');
  }
  
  console.log('3. Recommendations:');
  console.log('');
  
  const firstResult = await testUrl(testUrls[0].name, testUrls[0].url);
  
  if (firstResult.status === 403) {
    console.log('   ❌ Getting 403 Forbidden:');
    console.log('   1. Verify "Block public access" is OFF in S3');
    console.log('   2. Check bucket policy is exactly:');
    console.log('      {');
    console.log('        "Version": "2012-10-17",');
    console.log('        "Statement": [{');
    console.log('          "Effect": "Allow",');
    console.log('          "Principal": "*",');
    console.log('          "Action": "s3:GetObject",');
    console.log('          "Resource": "arn:aws:s3:::nealy-decor-bucket/*"');
    console.log('        }]');
    console.log('      }');
    console.log('   3. If using "Bucket owner enforced", ACLs are ignored');
    console.log('   4. Wait 5-10 minutes after making changes');
    console.log('   5. Check account-level block public access settings');
  } else if (firstResult.status === 404) {
    console.log('   ❌ Getting 404 Not Found:');
    console.log('   1. Verify files exist in S3 at the exact paths');
    console.log('   2. Check folder names match exactly (case-sensitive)');
    console.log('   3. Check file names match exactly');
    console.log('   4. Verify files are in: 01-Website-Creation/02 Home Page/');
  } else if (firstResult.status === 200) {
    console.log('   ✅ URLs are accessible!');
    console.log('   If site still not working, check:');
    console.log('   1. Vercel environment variables are set');
    console.log('   2. Site has been redeployed after adding env vars');
    console.log('   3. Browser cache (try incognito mode)');
  }
  
  console.log('');
}

runDiagnostics().catch(console.error);

