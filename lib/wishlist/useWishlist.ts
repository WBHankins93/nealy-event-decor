"use client";

import { useState, useEffect } from 'react';
import { RentalItem } from './rentalTypes';

const WISHLIST_STORAGE_KEY = 'nealy-event-decor-wishlist';
const WISHLIST_EXPIRY_DAYS = 30; // Wishlist expires after 30 days

interface WishlistData {
  items: string[]; // Array of item IDs
  timestamp: number; // When wishlist was created/updated
}

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isLoaded) {
      saveWishlist(wishlistItems);
    }
  }, [wishlistItems, isLoaded]);

  const loadWishlist = () => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const data: WishlistData = JSON.parse(stored);
        
        // Check if wishlist has expired
        const daysSinceCreation = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
        
        if (daysSinceCreation < WISHLIST_EXPIRY_DAYS) {
          setWishlistItems(data.items);
        } else {
          // Expired - clear it
          localStorage.removeItem(WISHLIST_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveWishlist = (items: string[]) => {
    try {
      const data: WishlistData = {
        items,
        timestamp: Date.now(),
      };
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  };

  const addToWishlist = (itemId: string) => {
    setWishlistItems((prev) => {
      if (prev.includes(itemId)) {
        return prev; // Already in wishlist
      }
      return [...prev, itemId];
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((id) => id !== itemId));
  };

  const toggleWishlist = (itemId: string) => {
    if (wishlistItems.includes(itemId)) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist(itemId);
    }
  };

  const isInWishlist = (itemId: string): boolean => {
    return wishlistItems.includes(itemId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  };

  const getWishlistCount = (): number => {
    return wishlistItems.length;
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    isLoaded,
  };
}

// Helper function to get wishlist item details
export function getWishlistItemDetails(
  wishlistItemIds: string[],
  allItems: RentalItem[]
): RentalItem[] {
  return wishlistItemIds
    .map((id) => allItems.find((item) => item.id === id))
    .filter((item): item is RentalItem => item !== undefined);
}