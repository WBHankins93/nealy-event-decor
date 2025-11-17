import { getImageKitVideoUrl } from "@/lib/imagekit";

export default function VideoPreloadHead() {
    const useImageKit = process.env.NEXT_PUBLIC_USE_IMAGEKIT === 'true';
    const videoUrl = useImageKit 
      ? getImageKitVideoUrl("videos/animations/dreams.mp4")
      : "/videos/animations/dreams.mp4";
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