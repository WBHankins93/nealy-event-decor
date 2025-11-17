import { getImageKitVideoUrl } from "@/lib/imagekit";

export default function VideoPreloadHead() {
    // Only use ImageKit if explicitly enabled AND endpoint is configured
    const useImageKit = process.env.NEXT_PUBLIC_USE_IMAGEKIT === 'true' && 
                       !!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const videoUrl = useImageKit 
      ? getImageKitVideoUrl("videos/entrance/Video no text.mp4")
      : "/videos/entrance/Video no text.mp4";
    const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    
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
        {/* Preconnect to ImageKit or local for faster connection */}
        {useImageKit && imageKitEndpoint ? (
          <>
            <link
              rel="preconnect"
              href={imageKitEndpoint}
              crossOrigin="anonymous"
            />
            <link
              rel="dns-prefetch"
              href={imageKitEndpoint}
            />
          </>
        ) : null}
      </>
    );
  }