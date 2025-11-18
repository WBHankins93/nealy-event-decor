"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useWishlist } from './useWishlist';

interface WishlistContextType {
  wishlistItems: string[];
  addToWishlist: (itemId: string) => void;
  removeFromWishlist: (itemId: string) => void;
  toggleWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
  isLoaded: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const wishlist = useWishlist();

  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
}