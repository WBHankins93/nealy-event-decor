export default function VideoPreloadHead() {
    return (
      <>
        {/* Preload the video with highest priority */}
        <link
          rel="preload"
          href="https://sikaxiyfzkexnnkjkuhg.supabase.co/storage/v1/object/public/gallery/animations/dreams.mp4"
          as="video"
          type="video/mp4"
          crossOrigin="anonymous"
        />
        {/* Preconnect to Supabase for faster connection */}
        <link
          rel="preconnect"
          href="https://sikaxiyfzkexnnkjkuhg.supabase.co"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://sikaxiyfzkexnnkjkuhg.supabase.co"
        />
      </>
    );
  }