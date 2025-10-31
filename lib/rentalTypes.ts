// Type definitions for rental inventory

export interface RentalItem {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    dimensions?: string;
    quantity: number;
    price?: number; // Optional: add pricing later
    images?: string[]; // Optional: add image URLs later
    available?: boolean; // Optional: track availability
    tags?: string[]; // Optional: for search/filtering
    featured?: boolean; // Optional: to highlight certain items
  }
  
  export interface RentalCategory {
    id: string;
    name: string;
    description?: string;
    items: RentalItem[];
    featured?: boolean;
    order?: number; // For custom sorting
  }