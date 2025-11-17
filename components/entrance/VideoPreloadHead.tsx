import { getBlobUrl } from "@/lib/vercelBlob";

export default function VideoPreloadHead() {
    const useBlob = !!process.env.NEXT_PUBLIC_BLOB_STORE_URL;
    const videoUrl = useBlob 
      ? getBlobUrl("videos/entrance/Video no text.mp4")
      : "/videos/entrance/Video no text.mp4";
    const blobStoreUrl = process.env.NEXT_PUBLIC_BLOB_STORE_URL;
    
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
        {/* Preconnect to Vercel Blob for faster connection */}
        {useBlob && blobStoreUrl ? (
          <>
            <link
              rel="preconnect"
              href={blobStoreUrl}
              crossOrigin="anonymous"
            />
            <link
              rel="dns-prefetch"
              href={blobStoreUrl}
            />
          </>
        ) : null}
      </>
    );
  }