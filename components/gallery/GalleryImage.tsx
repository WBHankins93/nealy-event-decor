"use client";

import Image from 'next/image';
import type { ComponentProps } from 'react';

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
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}