# S3 Nuclear Fix - Last Resort Steps

If nothing else works, try these steps in order:

## Step 1: Verify Files Actually Exist

1. Go to S3 Console → `nealy-decor-bucket` → **Objects** tab
2. Navigate to: `01-Website-Creation/02 Home Page/`
3. **Verify** `home-page-video.mp4` exists there
4. If it doesn't exist, that's the problem - upload it!

## Step 2: Delete and Recreate Bucket Policy

Sometimes AWS caches bad policies:

1. Go to **Bucket policy** → Click **Delete**
2. Wait 2 minutes
3. Click **Edit** → Paste this EXACT policy (no changes):

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

4. Click **Save**
5. Wait 5 minutes

## Step 3: Check Account-Level Block Public Access

This is the #1 hidden issue:

1. In S3 Console, go to the **main S3 page** (not your bucket)
2. Look for **"Block Public Access settings for this account"** in left sidebar
3. Click it
4. If ANY setting is "On", click **Edit** and turn them ALL off
5. Save

This affects ALL buckets and often overrides bucket-level settings.

## Step 4: Verify Object Ownership Settings

1. Go to your bucket → **Permissions** → **Object Ownership**
2. Make sure it says **"Bucket owner enforced"** (ACLs disabled)
3. If it says "ACLs enabled", change it to "Bucket owner enforced"
4. This ensures bucket policy is the only thing controlling access

## Step 5: Test with a Simple File

1. Upload a test file: `test.txt` with content "hello"
2. Put it directly in the bucket root (not in a folder)
3. Test URL: `https://nealy-decor-bucket.s3.us-east-2.amazonaws.com/test.txt`
4. If this works, the issue is with folder paths or file names
5. If this doesn't work, the bucket policy isn't working at all

## Step 6: Alternative - Use CloudFront

If S3 public access is too problematic, use CloudFront:

1. Create CloudFront distribution pointing to your S3 bucket
2. Use Origin Access Control (OAC) instead of public access
3. Update your code to use CloudFront URLs
4. This is more secure and often faster

## Still Not Working?

The issue might be:
- Your AWS account has restrictions
- Your IAM user doesn't have permission to set bucket policies
- There's a service limit or restriction

Consider:
1. Contact AWS Support
2. Create a new S3 bucket and try again
3. Use a different storage solution (Vercel Blob, Cloudinary, etc.)

