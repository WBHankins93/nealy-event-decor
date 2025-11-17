# ImageKit Upload Instructions

This guide will help you upload all your media files to ImageKit so you can remove them from the repository and reduce the repo size.

## Prerequisites

1. ✅ ImageKit account created
2. ✅ ImageKit credentials added to `.env.local`:
   ```env
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
   ```

## Step 1: Run the Upload Script

The upload script will automatically find and upload all media files from your `public` folder:

```bash
node upload-to-imagekit.js
```

### What the script does:

- ✅ Scans `public/images/`, `public/videos/`, and `public/animations/` folders
- ✅ Uploads all images (jpg, png, gif, webp) and videos (mp4, mov, webm)
- ✅ Maintains the same folder structure in ImageKit
- ✅ Skips hidden/system files (like `.DS_Store`, `._*`)
- ✅ Shows progress for each file
- ✅ Creates a detailed report (`imagekit-upload-report.json`)

### Expected Output:

```
🚀 Starting ImageKit Upload...

📁 Scanning for media files...
Found 5 files in ./public/images
Found 3 files in ./public/videos
Found 1 files in ./public/animations

📊 Total files to upload: 9
📦 Total size: 125.5 MB (0.12 GB)

📤 Starting uploads...
[1/9] 📤 Uploading: IMG_0936.jpg (2.3 MB)
   Path: images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg
✅ Uploaded: images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg
   URL: https://ik.imagekit.io/your-id/images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg

...

📊 UPLOAD SUMMARY
============================================================
✅ Successful: 9
❌ Failed: 0
⊘ Skipped: 0
📦 Total uploaded size: 125.5 MB
============================================================
```

## Step 2: Verify Uploads

1. Check the `imagekit-upload-report.json` file for details
2. Log into ImageKit dashboard and verify files are in the Media Library
3. Check that the folder structure matches:
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
   animations/
     └── home-page-video.mp4
   ```

## Step 3: Enable ImageKit in Your App

Add to `.env.local`:

```env
NEXT_PUBLIC_USE_IMAGEKIT=true
```

Then restart your dev server:

```bash
npm run dev
```

## Step 4: Test Your Site

1. Visit all pages that use images/videos:
   - Home page (hero video)
   - Gallery page
   - Rentals page
   - Services page
   - About page
   - Entrance video
2. Check browser console for any errors
3. Verify images load from ImageKit URLs (check Network tab)

## Step 5: Remove Files from Repository (After Testing)

⚠️ **IMPORTANT**: Only do this AFTER confirming everything works!

Once you've verified all media loads correctly from ImageKit:

1. **Commit your current changes** (the code updates for ImageKit)
2. **Remove the media files** from `public/` folder:
   ```bash
   # Remove images (they're already in .gitignore, but if they're tracked)
   git rm -r --cached public/images/
   
   # Remove videos
   git rm -r --cached public/videos/
   git rm -r --cached public/animations/
   ```
3. **Keep SVG files** (they're small and excluded from .gitignore)
4. **Commit the removal**:
   ```bash
   git add .gitignore
   git commit -m "Remove media files - now hosted on ImageKit"
   ```

## Troubleshooting

### Upload Fails with Authentication Error
- Double-check your credentials in `.env.local`
- Make sure there are no extra spaces or quotes
- Verify your ImageKit account is active

### Some Files Fail to Upload
- Check the `imagekit-upload-report.json` for error details
- Re-run the script - it will skip files that already exist
- Large files (>100MB) may need to be uploaded manually via dashboard

### Images Not Loading After Upload
- Verify `NEXT_PUBLIC_USE_IMAGEKIT=true` is set
- Check browser console for errors
- Verify ImageKit URLs are correct in the report
- Clear browser cache

### Rate Limiting
- The script includes delays between uploads
- If you hit rate limits, wait a few minutes and re-run
- ImageKit free tier has generous limits, but very large batches may need spacing

## File Size Reduction

After removing media files, your repository size should drop significantly:

- **Before**: ~2.8GB+ (with all images/videos)
- **After**: <50MB (code only)

The `.gitignore` has been updated to exclude all media files going forward.

## Need Help?

- Check `imagekit-upload-report.json` for detailed upload results
- ImageKit Dashboard: https://imagekit.io/dashboard
- ImageKit Docs: https://docs.imagekit.io/

