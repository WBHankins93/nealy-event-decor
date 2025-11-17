/**
 * Cloudinary Configuration and Utilities
 * 
 * Cloudinary Benefits:
 * - 25GB free storage
 * - 25GB bandwidth/month
 * - Automatic image/video optimization
 * - On-the-fly transformations
 * - Fast global CDN
 * - Excellent video support
 * 
 * Free Tier: 25GB storage, 25GB bandwidth/month
 */

/**
 * Get Cloudinary URL for an image
 * @param publicId - Public ID of the image (e.g., "images/gallery/section/folder/image")
 * @param options - Transformation options
 * @returns Cloudinary URL or local path if not configured
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    fetchFormat?: 'auto';
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    // Fallback to local path
    const localPath = publicId.startsWith('/') ? publicId : `/${publicId}`;
    return localPath;
  }

  // Remove leading slash if present
  let cleanPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId;
  
  // Ensure "public/" prefix is present (files were uploaded with this structure)
  if (!cleanPublicId.startsWith('public/')) {
    cleanPublicId = `public/${cleanPublicId}`;
  }
  
  // Build transformation string
  const transformations: string[] = [];
  
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.quality) {
    const quality = options.quality === 'auto' ? 'auto' : `q_${options.quality}`;
    transformations.push(quality);
  }
  if (options?.format || options?.fetchFormat) {
    transformations.push(`f_${options.format || options.fetchFormat || 'auto'}`);
  }
  
  // Default optimizations if no options provided
  // Using q_100 for maximum quality preservation (can be changed to q_auto for intelligent optimization)
  if (!options || Object.keys(options).length === 0) {
    transformations.push('f_auto', 'q_100'); // q_100 = original quality, q_auto = intelligent optimization
  }
  
  const transformationString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${cleanPublicId}`;
}

/**
 * Get Cloudinary URL for a video
 * @param publicId - Public ID of the video (e.g., "videos/entrance/video-name")
 * @param options - Transformation options
 * @returns Cloudinary URL or local path if not configured
 */
export function getCloudinaryVideoUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'mp4' | 'webm';
    streaming?: boolean;
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    // Fallback to local path
    const localPath = publicId.startsWith('/') ? publicId : `/${publicId}`;
    return localPath;
  }

  // Remove leading slash if present
  let cleanPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId;
  
  // Remove file extension if present (Cloudinary public_id doesn't include extension)
  cleanPublicId = cleanPublicId.replace(/\.[^/.]+$/, '');
  
  // Try multiple public_id formats for manually uploaded videos
  // Videos uploaded manually might not have "public/" prefix
  // We'll try both with and without the prefix
  const publicIdVariants = [
    cleanPublicId, // Try as-is first (in case uploaded without public/ prefix)
    cleanPublicId.startsWith('public/') ? cleanPublicId : `public/${cleanPublicId}`, // Try with public/ prefix
  ];
  
  // Use the first variant (we'll let Cloudinary handle 404s gracefully)
  // If the video doesn't exist, the browser will show an error, but we can add fallback
  cleanPublicId = publicIdVariants[0];
  
  // Build transformation string
  const transformations: string[] = [];
  
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.quality) {
    const quality = options.quality === 'auto' ? 'auto' : `q_${options.quality}`;
    transformations.push(quality);
  }
  if (options?.format) {
    transformations.push(`f_${options.format}`);
  }
  
  // Default optimizations for video
  // Using q_100 for maximum quality preservation (can be changed to q_auto for intelligent optimization)
  if (!options || Object.keys(options).length === 0) {
    transformations.push('f_auto', 'q_100'); // q_100 = original quality, q_auto = intelligent optimization
  }
  
  const transformationString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';
  
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformationString}${cleanPublicId}`;
}

/**
 * Convert a local image path to Cloudinary path
 * Handles paths like "/images/rentals/file.jpg" -> "public/images/rentals/file" (without extension)
 * Note: Files were uploaded with "public/" prefix and without file extension in public_id
 * Also handles special characters and spaces in filenames
 * @param localPath - Local path (e.g., "/images/rentals/file.jpg")
 * @returns Cloudinary URL or local path
 */
export function convertToCloudinaryPath(localPath: string): string {
  // Skip placeholder images - they don't exist in Cloudinary
  if (localPath.includes('placeholder')) {
    return localPath; // Return local path so it fails gracefully
  }
  
  // Remove leading slash if present
  let cleanPath = localPath.startsWith("/") ? localPath.slice(1) : localPath;
  
  // Remove file extension (Cloudinary public_id doesn't include extension)
  cleanPath = cleanPath.replace(/\.[^/.]+$/, '');
  
  // Remove trailing spaces (some filenames have spaces before .jpg)
  cleanPath = cleanPath.trim();
  
  // Handle special cases where Cloudinary filename differs from local filename
  // Map known mismatches (after extension removal and trimming)
  const filenameMappings: Record<string, string> = {
    // Viola - has space in original filename
    "images/rentals/TheViola BlueMediterraneanPlate": "images/rentals/TheViolaBlueMediterraneanPlate-Type1",
    // Olive Side Table - has trailing space in original filename (already trimmed, but mapping for safety)
    "images/rentals/TheOlive:SideTable4'GreenTiledBar": "images/rentals/TheOlive:SideTable4'GreenTiledBar",
    // These should work automatically, but adding explicit mappings for safety
    "images/rentals/ThePapaveroLargeItalianFountain": "images/rentals/ThePapaveroLargeItalianFountain",
    "images/rentals/TheFERNBrassBirdCage": "images/rentals/TheFERNBrassBirdCage",
    "images/rentals/TheDelphiniumBlueGlassVase": "images/rentals/TheDelphiniumBlueGlassVase",
    "images/rentals/TheLariatCollectionClearCrystalAssortment": "images/rentals/TheLariatCollectionClearCrystalAssortment",
    "images/rentals/TheLariatCollectionClearCrystalCandleHolder": "images/rentals/TheLariatCollectionClearCrystalCandleHolder",
  };
  
  if (filenameMappings[cleanPath]) {
    cleanPath = filenameMappings[cleanPath];
  }
  
  // Add "public/" prefix to match upload structure
  if (!cleanPath.startsWith("public/")) {
    cleanPath = `public/${cleanPath}`;
  }
  
  return getCloudinaryImageUrl(cleanPath);
}

/**
 * Get optimized image URL with automatic format and quality
 * @param publicId - Public ID of the image
 * @param preserveQuality - If true, uses q_100 (original quality), otherwise q_auto (intelligent optimization)
 * @returns Optimized Cloudinary URL
 */
export function getOptimizedImageUrl(publicId: string, preserveQuality: boolean = false): string {
  return getCloudinaryImageUrl(publicId, {
    fetchFormat: 'auto',
    quality: preserveQuality ? 100 : 'auto',
  });
}

/**
 * Get original quality image URL (no quality loss)
 * @param publicId - Public ID of the image
 * @returns Cloudinary URL with original quality
 */
export function getOriginalQualityImageUrl(publicId: string): string {
  return getCloudinaryImageUrl(publicId, {
    fetchFormat: 'auto',
    quality: 100, // Original quality, no compression
  });
}

/**
 * Get original quality video URL (no quality loss)
 * @param publicId - Public ID of the video
 * @returns Cloudinary URL with original quality
 */
export function getOriginalQualityVideoUrl(publicId: string): string {
  return getCloudinaryVideoUrl(publicId, {
    format: 'auto',
    quality: 100, // Original quality, no compression
  });
}

/**
 * Check if Cloudinary is configured
 */
export function isCloudinaryConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
}

