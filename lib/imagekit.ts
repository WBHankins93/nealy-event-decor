/**
 * ImageKit Configuration and Utilities
 * 
 * ImageKit Free Tier:
 * - 20GB storage
 * - 20GB bandwidth/month
 * - Image optimization
 * - Video hosting
 * - CDN
 */

import ImageKit from "imagekit";

// Initialize ImageKit only if keys are available (lazy initialization)
let imagekit: ImageKit | null = null;

function getImageKitInstance(): ImageKit | null {
  // Only initialize if all required keys are present
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return null;
  }

  // Initialize on first use
  if (!imagekit) {
    imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }

  return imagekit;
}

/**
 * Get ImageKit URL for an image or video
 * @param filePath - Path to the file in ImageKit (e.g., "images/gallery/03-Gallery/BlueSofaLounge/IMG_0936.jpg")
 * @param options - Optional transformation parameters
 * @returns ImageKit URL
 */
export function getImageKitUrl(
  filePath: string,
  options?: {
    transformation?: string;
    quality?: number;
    width?: number;
    height?: number;
    format?: "auto" | "webp" | "jpg" | "png";
  }
): string {
  // If ImageKit is not configured, return local path as fallback
  if (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    console.warn("ImageKit not configured, using local path:", filePath);
    return filePath.startsWith("/") ? filePath : `/${filePath}`;
  }

  // Remove leading slash if present
  const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;

  // Build transformation string
  let transformation = "";
  if (options) {
    const params: string[] = [];
    if (options.width) params.push(`w-${options.width}`);
    if (options.height) params.push(`h-${options.height}`);
    if (options.quality) params.push(`q-${options.quality}`);
    if (options.format) params.push(`f-${options.format}`);
    if (options.transformation) params.push(options.transformation);
    if (params.length > 0) {
      transformation = `?tr=${params.join(",")}`;
    }
  }

  // Return ImageKit URL
  return `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${cleanPath}${transformation}`;
}

/**
 * Get optimized image URL with automatic format and quality
 * @param filePath - Path to the image
 * @param width - Optional width
 * @param height - Optional height
 * @returns Optimized ImageKit URL
 */
export function getOptimizedImageUrl(
  filePath: string,
  width?: number,
  height?: number
): string {
  return getImageKitUrl(filePath, {
    format: "auto",
    quality: 80,
    width,
    height,
  });
}

/**
 * Get video URL from ImageKit
 * @param filePath - Path to the video
 * @returns ImageKit video URL
 */
export function getImageKitVideoUrl(filePath: string): string {
  return getImageKitUrl(filePath);
}

/**
 * Upload file to ImageKit (server-side only)
 * @param file - File buffer or path
 * @param fileName - Name for the file in ImageKit
 * @param folder - Optional folder path in ImageKit
 * @returns Upload result with URL
 */
export async function uploadToImageKit(
  file: Buffer | string,
  fileName: string,
  folder?: string
) {
  const instance = getImageKitInstance();
  if (!instance) {
    throw new Error("ImageKit not configured. Please set IMAGEKIT_PRIVATE_KEY, NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY, and NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT");
  }

  try {
    const result = await instance.upload({
      file: file,
      fileName: fileName,
      folder: folder,
    });

    return {
      url: result.url,
      fileId: result.fileId,
      filePath: result.filePath,
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
}

export default getImageKitInstance;


