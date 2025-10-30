import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get public URL for an image in the gallery bucket
 */
export function getImageUrl(path: string): string {
  const { data } = supabase.storage.from('gallery').getPublicUrl(path);
  return data.publicUrl;
}