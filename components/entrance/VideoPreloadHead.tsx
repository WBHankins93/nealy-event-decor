import { getVideoUrl } from "@/lib/media/videoUrls";

export default function VideoPreloadHead() {
    const videoUrl = getVideoUrl("entrance");
    const s3Bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
    const cloudfrontDomain = process.env.NEXT_PUBLIC_S3_CLOUDFRONT_DOMAIN;
    const region = process.env.NEXT_PUBLIC_S3_REGION || 'us-east-1';
    
    // Determine S3 domain for preconnect
    let s3Domain: string | null = null;
    if (cloudfrontDomain) {
      s3Domain = cloudfrontDomain;
    } else if (s3Bucket) {
      s3Domain = `${s3Bucket}.s3.${region}.amazonaws.com`;
    }
    
    return (
      <>
        {/* Preload the video with highest priority */}
        <link
          rel="preload"
          href={videoUrl}
          as="video"
          type="video/mp4"
          crossOrigin="anonymous"
        />
        {/* Preconnect to S3 for faster connection */}
        {s3Domain ? (
          <>
            <link
              rel="preconnect"
              href={`https://${s3Domain}`}
              crossOrigin="anonymous"
            />
            <link
              rel="dns-prefetch"
              href={`https://${s3Domain}`}
            />
          </>
        ) : null}
      </>
    );
  }