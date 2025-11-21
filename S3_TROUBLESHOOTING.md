# S3 Troubleshooting Guide

## Quick Check: Test URLs in Browser

Run this command to generate test URLs:
```bash
node scripts/verify-s3-paths.js
```

Then **copy and paste the URLs into your browser** to verify:
1. ✅ Files exist at those paths
2. ✅ Files are publicly accessible
3. ✅ URLs are correct

## Common Issues

### Issue 1: URLs Generate 404 Not Found

**Possible Causes:**
- Files don't exist at that exact path in S3
- Folder or file names don't match (case-sensitive!)
- File extensions are wrong (.jpg vs .jpeg vs .png)

**Check:**
1. Go to S3 Console → Your bucket → `01-Website-Creation/03 Gallery/`
2. Verify folder names match exactly:
   - `BlueSofaLounge` (not `blue-sofa-lounge` or `Blue Sofa Lounge`)
   - `ItalianRomanceSetup` (not `italian-romance-setup`)
   - `WeddingHighlights` (not `wedding-highlights`)
3. Verify file names match exactly (including extension)
4. Verify file names match what's in `galleryConfig.ts`

### Issue 2: URLs Generate 403 Forbidden

**Cause:** S3 bucket doesn't have public read access

**Fix:**
1. S3 Console → Your bucket → **Permissions** tab
2. **Block public access** → Edit → Uncheck "Block all public access"
3. **Bucket Policy** → Add policy (see S3_SETUP_COMPLETE.md)
4. Save all changes

### Issue 3: URLs Generate 301 Redirect

**Cause:** Wrong S3 URL format for us-east-1

**Fix:** Already fixed in code! Just restart your dev server.

### Issue 4: Next.js Image Component Shows Errors

**Possible Causes:**
- S3 domain not in `next.config.ts` remotePatterns (should already be there)
- CORS not configured correctly

**Check:**
1. Verify `next.config.ts` includes S3 domains
2. Check CORS configuration in S3 bucket
3. Check browser console for specific errors

## Verify S3 Structure Matches Code

### Expected S3 Structure:
```
nealy-decor-bucket/
└── 01-Website-Creation/
    ├── 01 Landing Page/
    │   └── HP_Banner.png
    ├── 02 Home Page/
    ├── 03 Gallery/
    │   ├── BlueSofaLounge/
    │   │   ├── business pics-08.jpg
    │   │   ├── IMG_0936.jpg
    │   │   ├── IMG_0937.jpg
    │   │   ├── IMG_0948.jpg
    │   │   └── IMG_0949.jpg
    │   ├── ItalianRomanceSetup/
    │   │   ├── business pics-21.jpg
    │   │   ├── business-pics-45.jpg
    │   │   ├── IMG_0941.jpg
    │   │   └── [other files...]
    │   └── WeddingHighlights/
    │       ├── IMG_5071.jpg
    │       └── [other files...]
    ├── 04 Services/
    │   ├── italian-romance.jpg
    │   └── BlueSofaLounge2.jpg
    ├── 05 About/
    ├── 06 Contact/
    └── 07 Rentals/
        └── [all rental images]
```

### Important Notes:
- ✅ **Folder names are CASE-SENSITIVE**: `BlueSofaLounge` not `blue-sofa-lounge`
- ✅ **File names are CASE-SENSITIVE**: `IMG_0936.jpg` not `img_0936.jpg`
- ✅ **Spaces are preserved**: `03 Gallery` has a space, not `03Gallery`
- ✅ **File extensions matter**: `.jpg` vs `.jpeg` vs `.png`

## Display Names vs S3 Folder Names

**This is important**: The display names on your site have changed:
- Site shows: "The Sapphire Social Lounge" → S3 folder: `BlueSofaLounge`
- Site shows: "The Tuscany Soiree" → S3 folder: `ItalianRomanceSetup`

**✅ This is correct!** The code still uses the original S3 folder names, which is what you want.

## Step-by-Step Verification

1. **Run verification script:**
   ```bash
   node scripts/verify-s3-paths.js
   ```

2. **Copy a generated URL** (e.g., the first gallery image URL)

3. **Paste it in your browser** and see what happens:
   - ✅ If it loads → Files exist and permissions are correct
   - ❌ If 404 → File doesn't exist or path is wrong
   - ❌ If 403 → Permissions issue
   - ❌ If 301 → URL format issue (should be fixed now)

4. **Compare with S3 Console:**
   - Open S3 Console → Your bucket
   - Navigate to the same path
   - Compare folder/file names exactly

5. **Check browser console:**
   - Open browser dev tools (F12)
   - Go to Network tab
   - Reload page
   - Look for failed image requests
   - Check the exact URL being requested vs what's in S3

## Quick Fix Checklist

- [ ] Restart dev server after setting env vars
- [ ] Clear browser cache (hard refresh)
- [ ] Verify S3 bucket name in `.env.local`
- [ ] Verify S3 region in `.env.local`
- [ ] Verify S3 bucket permissions (public read)
- [ ] Verify CORS configuration
- [ ] Verify file names match exactly (case-sensitive)
- [ ] Verify folder structure matches expected structure
- [ ] Test URLs directly in browser
- [ ] Check browser console for errors

