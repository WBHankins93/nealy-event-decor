# S3 403 Forbidden - Advanced Troubleshooting

If you've completed all the basic steps but still getting 403 errors, try these:

## Issue: Object-Level ACLs

Even with bucket policy set, individual objects might have ACLs that block access.

### Solution: Make Objects Public via ACL

**Option 1: Via S3 Console (for existing files)**
1. Go to S3 Console → `nealy-decor-bucket` → **Objects** tab
2. Navigate to a file (e.g., `01-Website-Creation/02 Home Page/home-page-video.mp4`)
3. Click on the file name
4. Go to **Permissions** tab
5. Under **Access control list (ACL)**, click **Edit**
6. Check **"Read"** for **"Everyone (public access)"**
7. Click **Save changes**
8. Type `confirm` when prompted

**Option 2: Set Default ACL for New Objects**
1. Go to S3 Console → `nealy-decor-bucket` → **Permissions** tab
2. Scroll to **Object Ownership**
3. Click **Edit**
4. Select **"ACLs enabled"**
5. Under **Object Ownership**, select **"Bucket owner preferred"**
6. Click **Save changes**

## Issue: Account-Level Block Public Access

Your AWS account might have account-level block public access enabled.

### Solution: Check Account Settings
1. Go to S3 Console (not your bucket, but the main S3 page)
2. Click **"Block Public Access settings for this account"** in the left sidebar
3. If it shows any settings as "On", click **Edit** and turn them off
4. This affects ALL buckets in your account

## Issue: Bucket Policy Syntax Error

Even a small typo can cause the policy to fail silently.

### Solution: Validate Policy
1. Go to S3 Console → `nealy-decor-bucket` → **Permissions** → **Bucket policy**
2. Click **Edit**
3. Copy the entire policy
4. Go to AWS IAM Policy Simulator or use a JSON validator
5. Verify the policy is valid JSON with no trailing commas

**Correct Policy (copy exactly):**
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

## Issue: ARN Mismatch

The ARN in the bucket policy must match your bucket name exactly.

### Solution: Verify ARN
1. Go to S3 Console → `nealy-decor-bucket` → **Properties** tab
2. Find **"Amazon Resource Name (ARN)"**
3. Copy the exact ARN
4. Go to **Permissions** → **Bucket policy** → **Edit**
5. Make sure the `Resource` field uses the exact ARN: `arn:aws:s3:::nealy-decor-bucket/*`
6. The bucket name after `s3:::` must match exactly (case-sensitive)

## Issue: AWS Propagation Delay

AWS changes can take 5-15 minutes to propagate globally.

### Solution: Wait and Retry
1. After making changes, wait 10-15 minutes
2. Clear your browser cache
3. Try accessing the URL in an incognito/private window
4. Test from a different network if possible

## Issue: CORS Preflight Failing

Even though CORS is set, the preflight might be failing.

### Solution: Verify CORS Configuration
1. Go to S3 Console → `nealy-decor-bucket` → **Permissions** → **CORS**
2. Make sure the configuration includes:
   - `AllowedMethods: ["GET", "HEAD"]`
   - `AllowedOrigins` includes your domain
   - No syntax errors

## Quick Test Script

Run this to test if a specific file is accessible:

```bash
curl -I "https://nealy-decor-bucket.s3.us-east-2.amazonaws.com/01-Website-Creation/02%20Home%20Page/home-page-video.mp4"
```

- **200 OK** = File is accessible ✅
- **403 Forbidden** = Permissions issue ❌
- **404 Not Found** = File doesn't exist ❌

## Nuclear Option: Recreate Bucket Policy

If nothing works, try deleting and recreating the bucket policy:

1. Go to **Bucket policy** → **Delete** (remove the policy)
2. Wait 2 minutes
3. Add the policy again from scratch
4. Save and wait 5-10 minutes

## Still Not Working?

If you've tried everything:
1. Check AWS CloudTrail for any permission errors
2. Verify your IAM user/role has permission to modify bucket policies
3. Contact AWS Support if you have a support plan
4. Consider using CloudFront with Origin Access Control as an alternative

