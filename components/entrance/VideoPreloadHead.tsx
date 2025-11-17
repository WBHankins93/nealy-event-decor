import { getCloudinaryVideoUrl } from "@/lib/cloudinary";

export default function VideoPreloadHead() {
    const videoUrl = getCloudinaryVideoUrl("public/videos/entrance/Video-no-text");
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloudinaryDomain = cloudName ? `res.cloudinary.com` : null;
    
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
        {/* Preconnect to Cloudinary for faster connection */}
        {cloudinaryDomain ? (
          <>
            <link
              rel="preconnect"
              href={`https://${cloudinaryDomain}`}
              crossOrigin="anonymous"
            />
            <link
              rel="dns-prefetch"
              href={`https://${cloudinaryDomain}`}
            />
          </>
        ) : null}
      </>
    );
  }