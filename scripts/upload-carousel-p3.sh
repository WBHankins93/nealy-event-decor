#!/bin/bash

# Upload Carousel Image 3 to S3
# This script uploads HP_C_P3.jpg to S3 with the correct filename (HP_ C_P3.jpg with space)

BUCKET_NAME="nealy-decor-bucket"
REGION="us-east-2"
LOCAL_FILE="public/images/home-carousel/HP_C_P3.jpg"
S3_PATH="01-Website-Creation/02 Home Page/Carousel/HP_ C_P3.jpg"

echo "📤 Uploading Carousel Image 3 to S3..."
echo "Local file: $LOCAL_FILE"
echo "S3 path: s3://$BUCKET_NAME/$S3_PATH"
echo ""

# Check if file exists
if [ ! -f "$LOCAL_FILE" ]; then
    echo "❌ Error: File not found: $LOCAL_FILE"
    exit 1
fi

# Upload to S3
aws s3 cp "$LOCAL_FILE" "s3://$BUCKET_NAME/$S3_PATH" --region "$REGION"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Upload successful!"
    echo "Image URL: https://$BUCKET_NAME.s3.$REGION.amazonaws.com/$S3_PATH"
else
    echo ""
    echo "❌ Upload failed. Make sure AWS CLI is configured:"
    echo "   aws configure"
    exit 1
fi
