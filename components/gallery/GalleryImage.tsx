"use client";

import Image from 'next/image';
import type { ComponentProps } from 'react';
import { useState } from 'react';

interface GalleryImageProps extends Omit<ComponentProps<typeof Image>, 'src' | 'alt'> {
  src: string;
  alt: string;
}

export default function GalleryImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className = '',
  priority = false,
  ...props 
}: GalleryImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {hasError ? (
        <div className={`${className} bg-forest-green/10 flex items-center justify-center`}>
          <div className="text-center p-4">
            <p className="text-charcoal-black/50 text-sm">{alt}</p>
          </div>
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => {
            console.error(`Failed to load image: ${imgSrc}`);
            setHasError(true);
          }}
          unoptimized={imgSrc.includes('.s3.') || imgSrc.includes('amazonaws.com') || imgSrc.includes('s3.us-east-2')}
          {...props}
        />
      )}
    </>
  );
}