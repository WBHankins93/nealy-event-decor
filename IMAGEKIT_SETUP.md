# ImageKit Setup Guide

ImageKit is a free CDN and media optimization service. This guide will help you migrate from Supabase to ImageKit.

## ImageKit Free Tier

- ✅ 20GB storage
- ✅ 20GB bandwidth/month
- ✅ Image optimization (automatic format, quality, resizing)
- ✅ Video hosting
- ✅ Global CDN
- ✅ No credit card required

## Step 1: Create ImageKit Account

1. Go to https://imagekit.io/
2. Sign up for a free account
3. Verify your email

## Step 2: Get Your ImageKit Credentials

1. After logging in, go to **Developer Options** → **API Keys**
2. You'll need:
   - **Public Key** (starts with `public_`)
   - **Private Key** (starts with `private_`)
   - **URL Endpoint** (looks like `https://ik.imagekit.io/your-imagekit-id`)

## Step 3: Add to Environment Variables

Add these to your `.env.local` file:

```env
# ImageKit Configuration
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key_here
IMAGEKIT_PRIVATE_KEY=your_private_key_here
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-imagekit-id

# Enable ImageKit (set to 'true' to use ImageKit, 'false' to use local paths)
NEXT_PUBLIC_USE_IMAGEKIT=true
```

## Step 4: Upload Your Media to ImageKit

### Option A: Using ImageKit Dashboard (Recommended for initial setup)

1. Go to **Media Library** in ImageKit dashboard
2. Create folders matching your structure:
   - `images/gallery/03-Gallery/BlueSofaLounge/`
   - `images/gallery/03-Gallery/ItalianRomanceSetup/`
   - `images/gallery/03-Gallery/WeddingHighlights/`
   - `videos/entrance/`
   - `videos/about/`
   - `images/banner/`
   - `images/logo/`
   - `images/rentals/`
   - `images/services/`
3. Upload your files to the corresponding folders

### Option B: Using ImageKit API (Automated)

You can create a script similar to `upload-to-supabase.js` to upload all files programmatically. The ImageKit SDK is already installed.

## Step 5: Update Video URLs

After uploading videos to ImageKit, update these files:

1. **`components/home/HeroSection.tsx`** - Update home page video
2. **`components/entrance/VideoPreloadHead.tsx`** - Update preload URLs
3. **`components/entrance/VideoEntrance.tsx`** - Update entrance video (if using remote URL)

Use the `getImageKitVideoUrl()` function from `lib/imagekit.ts`:

```typescript
import { getImageKitVideoUrl } from "@/lib/imagekit";

// Example:
const videoUrl = getImageKitVideoUrl("videos/entrance/Video no text.mp4");
```

## Step 6: Test

1. Restart your dev server: `npm run dev`
2. Check that images load from ImageKit
3. Verify videos play correctly
4. Check browser console for any errors

## Migration Checklist

- [ ] Create ImageKit account
- [ ] Add credentials to `.env.local`
- [ ] Upload images to ImageKit (maintain folder structure)
- [ ] Upload videos to ImageKit
- [ ] Set `NEXT_PUBLIC_USE_IMAGEKIT=true`
- [ ] Update video URLs in components
- [ ] Test all pages
- [ ] Remove Supabase storage (optional, after confirming everything works)

## Folder Structure in ImageKit

Your ImageKit folder structure should match:

```
images/
  ├── gallery/
  │   └── 03-Gallery/
  │       ├── BlueSofaLounge/
  │       ├── ItalianRomanceSetup/
  │       └── WeddingHighlights/
  ├── banner/
  ├── logo/
  ├── rentals/
  └── services/
videos/
  ├── entrance/
  └── about/
```

## Troubleshooting

**Images not loading?**
- Check that `NEXT_PUBLIC_USE_IMAGEKIT=true` is set
- Verify ImageKit credentials are correct
- Check browser console for errors
- Ensure files are uploaded to correct paths in ImageKit

**Videos not playing?**
- Verify video URLs are updated
- Check that videos are uploaded to ImageKit
- Ensure video file formats are supported (mp4, webm, etc.)

**Still seeing Supabase URLs?**
- Clear browser cache
- Restart dev server
- Check that all components are using the helper functions

## Need Help?

- ImageKit Docs: https://docs.imagekit.io/
- ImageKit Dashboard: https://imagekit.io/dashboard


