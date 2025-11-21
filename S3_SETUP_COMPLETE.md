# ✅ S3 Setup - What's Done

## Code Changes Complete ✓

All code has been updated to use S3 instead of Cloudinary:

1. ✅ **Created S3 utilities** (`lib/media/s3.ts`)
   - `getS3Url()` - Generate S3 URLs
   - `getS3ImageUrl()` - Get image URLs from S3
   - `getS3VideoUrl()` - Get video URLs from S3
   - `convertToS3Path()` - Convert local paths to S3 paths

2. ✅ **Updated all components** to use S3:
   - Gallery images
   - Rental item images
   - Banner/logo images
   - Services page images
   - Videos (entrance, home, about)

3. ✅ **Removed Cloudinary dependencies**:
   - No more Cloudinary fallback (S3 → Local only)
   - Updated video preloading to use S3
   - All image paths now use S3

4. ✅ **Local files in gitignore**:
   - Images: `public/images/**/*.jpg`, etc.
   - Videos: `public/videos/**/*.mp4`, etc.
   - Local files stay on disk for dev fallback but won't be committed

## What You Need To Do Now

### 1. Set Environment Variables

Create/update `.env.local`:

```bash
NEXT_PUBLIC_S3_BUCKET_NAME=nealy-decor-bucket
NEXT_PUBLIC_S3_REGION=us-east-1
```

**Important**: After adding these, **restart your Next.js dev server**!

### 2. Configure S3 Bucket Permissions

Go to AWS S3 Console → `nealy-decor-bucket` → **Permissions** tab:

#### A. Enable Public Access
- Click **Edit** on "Block public access"
- **Uncheck** "Block all public access"
- Save

#### B. Add Bucket Policy
- Scroll to **Bucket Policy**
- Add this policy (replace `nealy-decor-bucket` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nealy-decor-bucket/*"
    }
  ]
}
```

#### C. Add CORS Configuration
- Scroll to **Cross-origin resource sharing (CORS)**
- Add this configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://your-domain.com"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

**Replace** `https://your-domain.com` with your actual production domain.

### 3. Test the Site

1. **Restart your dev server**: `npm run dev`
2. **Open your site**: Check browser console for any errors
3. **Verify images load**: Images should load from S3 URLs (check Network tab)
4. **Test videos**: Videos should play from S3 URLs

### 4. Deploy to Production

When deploying:

1. Add environment variables to your hosting platform (Vercel, etc.)
2. Update CORS configuration to include your production domain
3. Test everything in production

## S3 Folder Structure

Your files should be organized like this in S3:

```
nealy-decor-bucket/
└── 01-Website-Creation/
    ├── 01 Landing Page/
    │   ├── HP_Banner.png
    │   └── Video-no-text.mp4
    ├── 02 Home Page/
    │   └── home-page-video.mp4
    ├── 03 Gallery/
    │   ├── BlueSofaLounge/
    │   ├── ItalianRomanceSetup/
    │   └── WeddingHighlights/
    ├── 04 Services/
    │   ├── italian-romance.jpg
    │   └── BlueSofaLounge2.jpg
    ├── 05 About/
    │   └── about.mp4
    ├── 06 Contact/
    └── 07 Rentals/
        └── [all rental images]
```

## How It Works

- **If S3 is configured** (env vars set): Uses S3 URLs
- **If S3 is not configured**: Falls back to local paths for development
- **Local files**: Stay on disk for dev but are ignored by git

## Next Steps (Optional)

For even faster delivery, consider setting up CloudFront CDN:
1. Create CloudFront distribution pointing to your S3 bucket
2. Add `NEXT_PUBLIC_S3_CLOUDFRONT_DOMAIN` to environment variables
3. See `S3_SETUP.md` for detailed CloudFront setup

## Troubleshooting

**Images not loading?**
- Check bucket name and region in `.env.local`
- Verify bucket permissions are set correctly
- Check CORS configuration includes your domain
- Restart dev server after changing env vars

**CORS errors?**
- Verify CORS config includes your domain
- Check browser console for specific CORS errors
- Ensure bucket policy allows public read

**Still seeing local images?**
- Clear browser cache
- Verify `NEXT_PUBLIC_S3_BUCKET_NAME` is set correctly
- Check browser Network tab to see what URLs are being requested

## Documentation

- **Quick Start**: `S3_QUICK_START.md` - Step-by-step setup guide
- **Full Guide**: `S3_SETUP.md` - Detailed configuration and CloudFront setup

