# Vercel Environment Variables Setup

## Required Environment Variables

Add these to your Vercel project for production to work:

### Step 1: Go to Vercel Dashboard
1. Navigate to your project: https://vercel.com/dashboard
2. Select your `nealy-event-decor` project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add S3 Variables

Add these two variables:

**Variable 1:**
- **Key:** `NEXT_PUBLIC_S3_BUCKET_NAME`
- **Value:** `nealy-decor-bucket`
- **Environment:** Select all (Production, Preview, Development)

**Variable 2:**
- **Key:** `NEXT_PUBLIC_S3_REGION`
- **Value:** `us-east-2`
- **Environment:** Select all (Production, Preview, Development)

### Step 3: Redeploy

After adding the variables:
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger a new deployment

## Verification

After redeploying, check the browser console on https://nealyevents.com/:
1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for requests to `s3.us-east-2.amazonaws.com`
5. Check if they return 200 (success) or 403/404 (error)

## Common Issues

### Images still not loading after adding variables
- Wait 2-3 minutes for Vercel to rebuild
- Clear browser cache
- Check that variables are set for "Production" environment
- Verify the bucket policy in S3 is correct

### Getting 403 errors
- Check S3 bucket policy (see `S3_BUCKET_POLICY.json`)
- Verify "Block public access" is OFF in S3
- Wait 5-10 minutes for AWS to propagate changes

### Getting 404 errors
- Verify files exist in S3 at the correct paths
- Check file names match exactly (case-sensitive)
- Verify folder structure matches: `01-Website-Creation/02 Home Page/`

