/**
 * S3 Configuration and Utilities
 * 
 * S3 Benefits:
 * - Scalable storage
 * - Fast CDN delivery
 * - Organized folder structure
 * - Cost-effective
 * - Direct access to media files
 * 
 * Folder Structure in S3:
 * - nealy-decor-bucket/
 *   - 01-Website-Creation/
 *     - 01 Landing Page/
 *     - 02 Home Page/
 *     - 03 Gallery/
 *     - 04 Services/
 *     - 05 About/
 *     - 06 Contact/
 *     - 07 Rentals/
 */

/**
 * Get S3 URL for an image or video
 * @param path - Path relative to the bucket (e.g., "01-Website-Creation/03 Gallery/image.jpg")
 * @returns S3 URL or local path if not configured
 */
export function getS3Url(path: string): string {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_S3_REGION || 'us-east-1';
  
  // If S3 is not configured, fallback to local path
  if (!bucketName) {
    // Convert S3 path to local path format
    // e.g., "01-Website-Creation/03 Gallery/image.jpg" -> "/images/gallery/image.jpg"
    return convertS3PathToLocal(path);
  }
  
  // Remove leading slash if present
  const pathWithoutSlash = path.startsWith('/') ? path.slice(1) : path;
  
  // Ensure path starts with folder structure
  const cleanPath = pathWithoutSlash.startsWith('01-Website-Creation/') 
    ? pathWithoutSlash 
    : `01-Website-Creation/${pathWithoutSlash}`;
  
  // Generate S3 URL
  // Format: https://{bucket}.s3.{region}.amazonaws.com/{path}
  // Or if using CloudFront: https://{cloudfront-domain}/{path}
  const cloudfrontDomain = process.env.NEXT_PUBLIC_S3_CLOUDFRONT_DOMAIN;
  
  if (cloudfrontDomain) {
    // Use CloudFront for faster CDN delivery
    // URL encode each path segment but preserve slashes
    const pathParts = cleanPath.split('/');
    const encodedParts = pathParts.map(part => encodeURIComponent(part));
    const encodedPath = encodedParts.join('/');
    return `https://${cloudfrontDomain}/${encodedPath}`;
  }
  
  // URL encode each path segment separately (preserve slashes)
  // This ensures spaces in folder names like "03 Gallery" become "%20"
  const pathParts = cleanPath.split('/');
  const encodedParts = pathParts.map(part => encodeURIComponent(part));
  const encodedPath = encodedParts.join('/');
  
  // For us-east-1, use s3.amazonaws.com (no region in domain)
  // For other regions, use s3.{region}.amazonaws.com
  if (region === 'us-east-1') {
    return `https://${bucketName}.s3.amazonaws.com/${encodedPath}`;
  }
  
  // Other regions use s3.{region}.amazonaws.com
  return `https://${bucketName}.s3.${region}.amazonaws.com/${encodedPath}`;
}

/**
 * Get S3 URL for an image with optional optimizations
 * @param folder - Folder name (e.g., "03 Gallery", "07 Rentals", or "03 Gallery/BlueSofaLounge" for subfolders)
 * @param filename - Filename with or without extension
 * @param options - Optional image transformation parameters (for future use)
 * @returns S3 URL
 */
export function getS3ImageUrl(
  folder: string,
  filename: string,
  _options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): string {
  // Preserve the original extension if present, otherwise default to .jpg
  // This handles files like "HP_Banner.png", "IMG_0936.jpg", or "IMG_0936"
  let fileWithExt = filename;
  
  // If no extension, add .jpg as default
  if (!filename.match(/\.[a-zA-Z0-9]+$/)) {
    fileWithExt = `${filename}.jpg`;
  }
  
  // Construct S3 path - folder should already include full path within 01-Website-Creation/
  // e.g., "03 Gallery" or "03 Gallery/BlueSofaLounge"
  const s3Path = `01-Website-Creation/${folder}/${fileWithExt}`;
  
  // For now, return the S3 URL directly
  // In the future, you could use CloudFront with Lambda@Edge for image transformations
  // or AWS Image Resizing service
  return getS3Url(s3Path);
}

/**
 * Get S3 URL for a video
 * @param folder - Folder name (e.g., "02 Home Page", "05 About")
 * @param filename - Filename with or without extension
 * @returns S3 URL
 */
export function getS3VideoUrl(folder: string, filename: string): string {
  // Remove extension from filename if present
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  
  if (!bucketName) {
    return convertS3PathToLocal(`${folder}/${nameWithoutExt}.mp4`);
  }
  
  // For now, default to .mp4 - you can enhance this to check file existence
  const s3Path = `01-Website-Creation/${folder}/${nameWithoutExt}.mp4`;
  return getS3Url(s3Path);
}

/**
 * Convert S3 path to local path format (for development fallback)
 * @param s3Path - S3 path (e.g., "01-Website-Creation/03 Gallery/image.jpg")
 * @returns Local path (e.g., "/images/gallery/image.jpg")
 */
function convertS3PathToLocal(s3Path: string): string {
  let localPath = s3Path;
  
  // Remove "01-Website-Creation/" prefix
  localPath = localPath.replace(/^01-Website-Creation\//, '');
  
  // Map folder names to local paths
  const folderMap: Record<string, string> = {
    '01 Landing Page ': '/images/banner', // Note: trailing space matches S3
    '01 Landing Page': '/images/banner', // Fallback for paths without trailing space
    '02 Home Page': '/images/home',
    '03 Gallery': '/images/gallery',
    '04 Services': '/images/services',
    '05 About': '/images/about',
    '06 Contact': '/images/contact',
    '07 Rentals': '/images/rentals',
  };
  
  // Extract folder and filename
  const parts = localPath.split('/');
  if (parts.length >= 2) {
    const folder = parts[0];
    const filename = parts.slice(1).join('/');
    
    if (folderMap[folder]) {
      return `${folderMap[folder]}/${filename}`;
    }
  }
  
  // Default fallback
  return localPath.startsWith('/') ? localPath : `/${localPath}`;
}

/**
 * Map page/section names to S3 folder names
 */
export const S3_FOLDER_MAP = {
  banner: '02 Home Page', // Banner image is in 02 Home Page folder
  home: '02 Home Page',
  gallery: '03 Gallery',
  services: '04 Services',
  about: '05 About',
  contact: '06 Contact',
  rentals: '07 Rentals',
} as const;

/**
 * Helper to get S3 image URL by section and filename
 */
export function getS3ImageBySection(
  section: keyof typeof S3_FOLDER_MAP,
  filename: string
): string {
  const folder = S3_FOLDER_MAP[section];
  return getS3ImageUrl(folder, filename);
}

/**
 * Helper to get S3 video URL by section and filename
 */
export function getS3VideoBySection(
  section: keyof typeof S3_FOLDER_MAP,
  filename: string
): string {
  const folder = S3_FOLDER_MAP[section];
  return getS3VideoUrl(folder, filename);
}

/**
 * Convert a local image path to S3 path
 * Handles paths like "/images/rentals/file.jpg" -> S3 URL
 * @param localPath - Local path (e.g., "/images/rentals/file.jpg")
 * @returns S3 URL or local path if S3 not configured
 */
export function convertToS3Path(localPath: string): string {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  
  // If S3 is not configured, return local path as-is
  if (!bucketName) {
    return localPath;
  }
  
  // Skip placeholder images
  if (localPath.includes('placeholder')) {
    return localPath;
  }
  
  // Remove leading slash if present
  const cleanPath = localPath.startsWith("/") ? localPath.slice(1) : localPath;
  
  // Map local paths to S3 folders
  const pathMap: Record<string, string> = {
    'images/banner': '01 Landing Page ', // Note: trailing space matches S3 folder name
    'images/home': '02 Home Page',
    'images/gallery': '03 Gallery',
    'images/services': '04 Services',
    'images/about': '05 About',
    'images/contact': '06 Contact',
    'images/rentals': '07 Rentals',
  };
  
  // Extract the base path (e.g., "images/rentals" or "images/banner")
  const pathParts = cleanPath.split('/');
  if (pathParts.length >= 2) {
    const basePath = `${pathParts[0]}/${pathParts[1]}`; // e.g., "images/rentals"
    
    if (pathMap[basePath]) {
      // Extract filename (everything after the base path)
      const filename = pathParts.slice(2).join('/');
      const folder = pathMap[basePath];
      
      // Handle subfolders (e.g., "images/gallery/03-Gallery/BlueSofaLounge/image.jpg")
      if (basePath === 'images/gallery' && pathParts.length >= 4) {
        // Gallery has subfolders: images/gallery/03-Gallery/BlueSofaLounge/image.jpg
        const subfolder = pathParts.slice(2, -1).join('/'); // Get subfolder path
        const imageName = pathParts[pathParts.length - 1]; // Get filename
        return getS3ImageUrl(`${folder}/${subfolder}`, imageName);
      }
      
      return getS3ImageUrl(folder, filename);
    }
  }
  
  // If we can't map it, return the local path
  return localPath;
}

