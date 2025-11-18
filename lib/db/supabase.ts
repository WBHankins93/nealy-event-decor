import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if both values exist
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Get public URL for an image in the gallery bucket
 */
export function getImageUrl(path: string): string {
  if (!supabase) {
    // Return placeholder during build or if not configured
    return '';
  }
  
  const { data } = supabase.storage.from('gallery').getPublicUrl(path);
  return data.publicUrl;
}