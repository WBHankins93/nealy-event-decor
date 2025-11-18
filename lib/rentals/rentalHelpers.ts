import { rentalCategories } from "./rentalData";
import { RentalItem } from "./rentalTypes";

/**
 * Get all rental items from all categories and subcategories
 * @returns Array of all RentalItem objects
 */
export function getAllRentalItems(): RentalItem[] {
  const allItems: RentalItem[] = [];
  
  rentalCategories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      allItems.push(...subcategory.items);
    });
  });
  
  return allItems;
}

/**
 * Get a single rental item by ID
 * @param itemId - The ID of the item to find
 * @returns The RentalItem or undefined if not found
 */
export function getRentalItemById(itemId: string): RentalItem | undefined {
  for (const category of rentalCategories) {
    for (const subcategory of category.subcategories) {
      const item = subcategory.items.find((item) => item.id === itemId);
      if (item) return item;
    }
  }
  return undefined;
}