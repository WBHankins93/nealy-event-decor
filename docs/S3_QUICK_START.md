# S3 Quick Start Guide

## ✅ Step 1: Set Environment Variables

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_S3_BUCKET_NAME=nealy-decor-bucket
NEXT_PUBLIC_S3_REGION=us-east-1

# Optional: CloudFront CDN for faster delivery
# NEXT_PUBLIC_S3_CLOUDFRONT_DOMAIN=d1234567890.cloudfront.net
```

**Important**: After adding these variables, restart your Next.js dev server.

## ✅ Step 2: Configure S3 Bucket Permissions

### Make Bucket Public

1. Go to AWS S3 Console → `nealy-decor-bucket` → **Permissions** tab
2. **Block public access** → Edit → **Uncheck** "Block all public access"
3. **Bucket Policy** → Add this policy (replace `nealy-decor-bucket` with your bucket name):

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

### Add CORS Configuration

1. Still in **Permissions** tab → **Cross-origin resource sharing (CORS)**
2. Add this configuration:

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

**Note**: Replace `https://your-domain.com` with your actual production domain.

## ✅ Step 3: Verify Files Are in S3

Your S3 bucket should have this structure:

```
nealy-decor-bucket/
└── 01-Website-Creation/
    ├── 01 Landing Page/      (Banner images, entrance videos)
    ├── 02 Home Page/          (Home page images and videos)
    ├── 03 Gallery/            (Gallery images)
    │   ├── BlueSofaLounge/
    │   ├── ItalianRomanceSetup/
    │   └── WeddingHighlights/
    ├── 04 Services/           (Services page images)
    ├── 05 About/              (About page images and videos)
    ├── 06 Contact/            (Contact page images)
    └── 07 Rentals/            (Rental item images)
```

## ✅ Step 4: Test the Site

1. Restart your Next.js dev server: `npm run dev`
2. Visit your site and check:
   - Images load from S3 URLs
   - Videos play from S3 URLs
   - Browser console shows no errors

## ✅ Step 5: Deploy

When deploying to production:

1. Add the same environment variables to your hosting platform (Vercel, etc.)
2. Update CORS configuration to include your production domain
3. Test in production

## 🚀 Optional: Set Up CloudFront CDN

For faster image/video delivery:

1. Create CloudFront Distribution pointing to your S3 bucket
2. Set Origin Access Control (OAC)
3. Update S3 bucket policy with CloudFront-generated policy
4. Add `NEXT_PUBLIC_S3_CLOUDFRONT_DOMAIN` to your environment variables

See `S3_SETUP.md` for detailed CloudFront setup.

## ✅ Done!

Your site is now using S3 for all images and videos. Local images are kept for development fallback but are ignored by git.

## Troubleshooting

### Images not loading?
- Check bucket name and region in `.env.local`
- Verify bucket permissions (public access, bucket policy)
- Check CORS configuration includes your domain
- Restart your dev server after changing env vars

### CORS errors?
- Verify CORS configuration includes your domain
- Check browser console for specific CORS error
- Ensure bucket policy allows public read access

### Still seeing local images?
- Clear browser cache
- Verify `NEXT_PUBLIC_S3_BUCKET_NAME` is set correctly
- Check browser console for S3 URL errors

