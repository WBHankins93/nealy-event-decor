/**
 * Vercel Blob Storage Configuration and Utilities
 * 
 * Vercel Blob Benefits:
 * - Fast global CDN
 * - No egress fees (unlike S3)
 * - Automatic optimization
 * - Reliable uploads
 * - Perfect for Next.js
 * 
 * Free Tier: 1GB storage, 10GB bandwidth/month
 * Paid: $0.15/GB storage, $0.40/GB bandwidth
 */

import { put, list, head } from '@vercel/blob';

/**
 * Get Vercel Blob URL for a file
 * @param filePath - Path to the file in blob storage (with or without 'public/' prefix)
 * @returns Blob URL
 */
export function getBlobUrl(filePath: string): string {
  const blobStoreUrl = process.env.NEXT_PUBLIC_BLOB_STORE_URL;
  
  if (!blobStoreUrl) {
    // Fallback to local path if blob not configured
    return filePath.startsWith("/") ? filePath : `/${filePath}`;
  }

  // Remove leading slash if present
  let cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
  
  // Add 'public/' prefix if not present (files are uploaded with this prefix)
  if (!cleanPath.startsWith("public/")) {
    cleanPath = `public/${cleanPath}`;
  }
  
  return `${blobStoreUrl}/${cleanPath}`;
}

/**
 * Upload file to Vercel Blob (server-side only)
 * @param file - File buffer or path
 * @param fileName - Name for the file in blob storage
 * @param folder - Optional folder path
 * @returns Upload result with URL
 */
export async function uploadToBlob(
  file: Buffer | string,
  fileName: string,
  folder?: string
): Promise<{ url: string; pathname: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN not configured");
  }

  const filePath = folder ? `${folder}/${fileName}` : fileName;

  try {
    const blob = await put(filePath, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
    };
  } catch (error) {
    console.error("Vercel Blob upload error:", error);
    throw error;
  }
}

/**
 * Check if file exists in Vercel Blob
 * @param filePath - Path to check
 * @returns True if file exists
 */
export async function blobFileExists(filePath: string): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return false;
  }

  try {
    await head(filePath, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * List files in a folder
 * @param prefix - Folder prefix to list
 * @returns Array of file paths
 */
export async function listBlobFiles(prefix: string): Promise<string[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return [];
  }

  try {
    const { blobs } = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blobs.map(blob => blob.pathname);
  } catch (error) {
    console.error("Error listing blob files:", error);
    return [];
  }
}

/**
 * Convert a local image path to Vercel Blob path if enabled
 * Handles paths like "/images/rentals/file.jpg" -> "images/rentals/file.jpg" for Vercel Blob
 * @param localPath - Local path (e.g., "/images/rentals/file.jpg")
 * @returns Vercel Blob URL or local path
 */
export function convertToBlobPath(localPath: string): string {
  const useBlob = !!process.env.NEXT_PUBLIC_BLOB_STORE_URL;
  
  if (!useBlob) {
    return localPath;
  }

  // Remove leading slash for blob path
  const cleanPath = localPath.startsWith("/") ? localPath.slice(1) : localPath;
  
  return getBlobUrl(cleanPath);
}

