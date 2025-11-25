/**
 * Test All S3 Paths
 * This script tests all the S3 paths the code expects to use
 */

require('dotenv').config({ path: '.env.local' });

const https = require('https');

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_S3_REGION || 'us-east-2';

if (!bucketName) {
  console.error('❌ NEXT_PUBLIC_S3_BUCKET_NAME not set');
  process.exit(1);
}

function testUrl(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'HEAD',
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      resolve({ status: res.statusCode, url });
      res.on('data', () => {});
      res.on('end', () => {});
    });

    req.on('error', () => resolve({ status: 'ERROR', url }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 'TIMEOUT', url });
    });

    req.end();
  });
}

function buildS3Url(path) {
  const pathParts = path.split('/');
  const encodedParts = pathParts.map(part => encodeURIComponent(part));
  const encodedPath = encodedParts.join('/');
  return `https://${bucketName}.s3.${region}.amazonaws.com/${encodedPath}`;
}

async function testAllPaths() {
  console.log('🧪 Testing All S3 Paths\n');
  console.log(`Bucket: ${bucketName}`);
  console.log(`Region: ${region}\n`);

  const tests = [
    // 01 Landing Page
    { name: 'Banner Image', path: '01-Website-Creation/01 Landing Page/HP_Banner.png' },
    { name: 'Entrance Video', path: '01-Website-Creation/01 Landing Page/Video no text.mp4' },
    
    // 02 Home Page
    { name: 'Home Page Video', path: '01-Website-Creation/02 Home Page/BW- Home Page Video.mp4' },
    
    // 03 Gallery - Blue Sofa Lounge
    { name: 'Gallery BSL P1', path: '01-Website-Creation/03 Gallery/Blue Sofa Lounge/G_BSL_P1.jpg' },
    { name: 'Gallery BSL P2', path: '01-Website-Creation/03 Gallery/Blue Sofa Lounge/G_BSL_P2.jpg' },
    { name: 'Gallery BSL P3', path: '01-Website-Creation/03 Gallery/Blue Sofa Lounge/G_BSL_P3.png' },
    
    // 03 Gallery - Italian Romance Setup
    { name: 'Gallery IRS P1', path: '01-Website-Creation/03 Gallery/Italian Romance Setup/G_IRS_P1.jpg' },
    { name: 'Gallery IRS P2', path: '01-Website-Creation/03 Gallery/Italian Romance Setup/G_IRS_P2.jpg' },
    { name: 'Gallery IRS - Ser_IRS', path: '01-Website-Creation/03 Gallery/Italian Romance Setup/Ser_IRS_P1.jpg' },
    
    // 03 Gallery - Wedding Highlights
    { name: 'Gallery WH P1', path: '01-Website-Creation/03 Gallery/Wedding Highlights/G_WH_P1.jpg' },
    { name: 'Gallery WH - IMG_5071', path: '01-Website-Creation/03 Gallery/Wedding Highlights/IMG_5071.jpg' },
    
    // 04 Services
    { name: 'Services BSL', path: '01-Website-Creation/04 Services/Ser_BSL_P1.jpg' },
    { name: 'Services IRS', path: '01-Website-Creation/04 Services/Ser_IRS_P1.jpg' },
    { name: 'Services italian-romance', path: '01-Website-Creation/04 Services/italian-romance.jpg' },
    { name: 'Services BlueSofaLounge2', path: '01-Website-Creation/04 Services/BlueSofaLounge2.jpg' },
    
    // 05 About
    { name: 'About Video', path: '01-Website-Creation/05 About/About page video.mp4' },
    
    // 07 Rentals (sample)
    { name: 'Rental Sample', path: '01-Website-Creation/07 Rentals/TheMAGNOLIA6\'CustomizableBar.jpg' },
  ];

  const results = { working: [], broken: [], missing: [] };

  for (const test of tests) {
    const url = buildS3Url(test.path);
    const result = await testUrl(url);
    
    if (result.status === 200) {
      results.working.push({ ...test, url });
      console.log(`✅ ${test.name}: ${result.status}`);
    } else if (result.status === 403) {
      results.broken.push({ ...test, url, status: result.status });
      console.log(`❌ ${test.name}: ${result.status} (Access Denied)`);
    } else if (result.status === 404) {
      results.missing.push({ ...test, url, status: result.status });
      console.log(`⚠️  ${test.name}: ${result.status} (Not Found)`);
    } else {
      results.broken.push({ ...test, url, status: result.status });
      console.log(`❌ ${test.name}: ${result.status || 'ERROR'}`);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Working: ${results.working.length}`);
  console.log(`❌ Broken (403): ${results.broken.length}`);
  console.log(`⚠️  Missing (404): ${results.missing.length}`);

  if (results.broken.length > 0) {
    console.log('\n❌ Broken Paths (403 - Access Denied):');
    results.broken.forEach(item => {
      console.log(`   ${item.name}: ${item.path}`);
    });
  }

  if (results.missing.length > 0) {
    console.log('\n⚠️  Missing Paths (404 - Not Found):');
    results.missing.forEach(item => {
      console.log(`   ${item.name}: ${item.path}`);
    });
  }

  console.log('\n✅ Working Paths:');
  results.working.forEach(item => {
    console.log(`   ${item.name}: ${item.path}`);
  });
}

testAllPaths().catch(console.error);

