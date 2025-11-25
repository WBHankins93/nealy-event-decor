# S3 Image Verification Guide

## Important: Folder Names Haven't Changed ✅

The display names on your site have changed, but the **S3 folder names remain the same**:
- ✅ Site shows: **"The Sapphire Social Lounge"** → S3 folder: **`BlueSofaLounge`**
- ✅ Site shows: **"The Tuscany Soiree"** → S3 folder: **`ItalianRomanceSetup`**

This is correct! The code uses the original S3 folder names.

## Step 1: Verify Generated URLs

Run the verification script to see what URLs the code is generating:

```bash
node scripts/verify-s3-paths.js
```

This will show you all the URLs being generated. **Copy one of the gallery image URLs** and test it.

## Step 2: Test URLs in Browser

Take a generated URL like this:
```
https://nealy-decor-bucket.s3.amazonaws.com/01-Website-Creation/03%20Gallery/BlueSofaLounge/IMG_0936.jpg
```

**Paste it directly in your browser**:
- ✅ If the image loads → File exists and permissions are correct
- ❌ If you get 404 → File doesn't exist at that path (check folder/file names)
- ❌ If you get 403 → S3 permissions issue (bucket not public)
- ❌ If you get 301 → URL format issue (should be fixed now)

## Step 3: Verify S3 Folder Structure

Go to your S3 Console and verify this structure exists:

```
nealy-decor-bucket/
└── 01-Website-Creation/
    ├── 01 Landing Page/
    │   └── HP_Banner.png (note: .png, not .jpg)
    ├── 03 Gallery/
    │   ├── BlueSofaLounge/
    │   │   ├── IMG_0936.jpg
    │   │   ├── IMG_0937.jpg
    │   │   ├── IMG_0948.jpg
    │   │   ├── IMG_0949.jpg
    │   │   └── business pics-08.jpg
    │   ├── ItalianRomanceSetup/
    │   │   ├── business-pics-45.jpg
    │   │   ├── IMG_0941.jpg
    │   │   └── [other files...]
    │   └── WeddingHighlights/
    │       └── [files...]
    ├── 04 Services/
    │   ├── italian-romance.jpg
    │   └── BlueSofaLounge2.jpg
    └── 07 Rentals/
        └── [all rental images]
```

### Critical Checks:

1. **Folder names must match exactly** (case-sensitive):
   - ✅ `BlueSofaLounge` (correct)
   - ❌ `blue-sofa-lounge` (wrong)
   - ❌ `Blue Sofa Lounge` (wrong)

2. **File names must match exactly** (case-sensitive):
   - ✅ `IMG_0936.jpg` (correct)
   - ❌ `img_0936.jpg` (wrong)
   - ❌ `IMG_0936.jpeg` (wrong extension)

3. **File extensions must match**:
   - ✅ `.png` for banner (HP_Banner.png)
   - ✅ `.jpg` for gallery images

## Step 4: Check Browser Console

1. Open your site in browser
2. Open Developer Tools (F12)
3. Go to **Network** tab
4. Reload the page
5. Look for failed image requests (red entries)
6. Click on a failed request to see:
   - The exact URL being requested
   - The HTTP status code (404, 403, etc.)
   - Any error messages

## Common Issues & Solutions

### Issue: 404 Not Found

**Problem**: File doesn't exist at that path in S3

**Solutions**:
1. Check folder name matches exactly (case-sensitive)
2. Check file name matches exactly (case-sensitive)
3. Check file extension matches (.jpg vs .jpeg vs .png)
4. Verify file actually exists in S3 Console

### Issue: 403 Forbidden

**Problem**: S3 bucket doesn't have public read access

**Solutions**:
1. Go to S3 Console → Your bucket → **Permissions** tab
2. **Block public access** → Edit → Uncheck "Block all public access"
3. Add bucket policy (see S3_SETUP_COMPLETE.md)
4. Save changes

### Issue: Images Don't Load at All

**Check**:
1. Verify `.env.local` has `NEXT_PUBLIC_S3_BUCKET_NAME` set
2. **Restart your dev server** after setting env vars
3. Check browser console for errors
4. Verify S3 bucket name is correct
5. Test URLs directly in browser

### Issue: Wrong Extension

**Problem**: Code was forcing `.jpg` for all images (fixed now!)

**Solutions**:
- ✅ Code now preserves original extension
- If images still wrong, verify file extensions in S3 match what you're requesting

## Mapping Reference

| Site Display Name | S3 Folder Name | Code Reference |
|-------------------|----------------|----------------|
| The Sapphire Social Lounge | `BlueSofaLounge` | `getGalleryImages('03-Gallery', 'BlueSofaLounge')` |
| The Tuscany Soiree | `ItalianRomanceSetup` | `getGalleryImages('03-Gallery', 'ItalianRomanceSetup')` |
| Wedding Highlights | `WeddingHighlights` | `getGalleryImages('03-Gallery', 'WeddingHighlights')` |

## Quick Verification Checklist

- [ ] Run `node scripts/verify-s3-paths.js` to see generated URLs
- [ ] Test at least one URL directly in browser
- [ ] Verify folder names in S3 match exactly (case-sensitive)
- [ ] Verify file names in S3 match exactly (case-sensitive)
- [ ] Verify file extensions match (.jpg, .png, etc.)
- [ ] Check S3 bucket permissions (public read access)
- [ ] Check CORS configuration
- [ ] Restart dev server after setting env vars
- [ ] Clear browser cache
- [ ] Check browser console for errors

## Need More Help?

If images still aren't loading:
1. Run the verification script: `node scripts/verify-s3-paths.js`
2. Test the generated URLs in your browser
3. Compare the URLs with what's actually in S3
4. Check browser console for specific errors
5. See `S3_TROUBLESHOOTING.md` for detailed troubleshooting

