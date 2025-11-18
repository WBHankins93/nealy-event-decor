// Rental item interface
export interface RentalItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  images?: string[]; // Additional images for gallery view
  dimensions?: string; // Clean measurements only (H, W, L)
  dimensionsNote?: string; // Additional details/notes about dimensions
  quantity?: string;
}

// Subcategory interface
export interface RentalSubcategory {
  id: string;
  name: string;
  description: string;
  items: RentalItem[];
}

// Main category interface
export interface RentalCategory {
  id: string;
  name: string;
  subcategories: RentalSubcategory[];
}