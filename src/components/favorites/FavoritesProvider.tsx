"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Listing } from "@/types/listing";

interface FavoriteItem {
  listing: Listing;
  addedAt: string;
  priceAtAdd: number;
  hadExpertReport: boolean;
}

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (listing: Listing) => void;
  removeFavorite: (id: string) => void;
  clearAll: () => void;
  count: number;
  /** Returns price diff since add (negative = price dropped, positive = price rose) */
  getPriceChange: (listing: Listing) => number | null;
  /** Whether expert report appeared after adding */
  hasNewExpertReport: (listing: Listing) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  removeFavorite: () => {},
  clearAll: () => {},
  count: 0,
  getPriceChange: () => null,
  hasNewExpertReport: () => false,
});

export function useFavorites() {
  return useContext(FavoritesContext);
}

const STORAGE_KEY = "autovista-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteItem[];
        setFavorites(parsed);
      }
    } catch {
      // Ignore parse errors
    }
    setMounted(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage full, ignore
    }
  }, [favorites, mounted]);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.listing.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (listing: Listing) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.listing.id === listing.id);
        if (exists) {
          return prev.filter((f) => f.listing.id !== listing.id);
        }
        return [
          ...prev,
          {
            listing,
            addedAt: new Date().toISOString(),
            priceAtAdd: listing.priceAmount,
            hadExpertReport: listing.condition?.hasExpertReport ?? false,
          },
        ];
      });
    },
    []
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((f) => f.listing.id !== id));
    },
    []
  );

  const clearAll = useCallback(() => {
    setFavorites([]);
  }, []);

  const getPriceChange = useCallback(
    (listing: Listing): number | null => {
      const fav = favorites.find((f) => f.listing.id === listing.id);
      if (!fav) return null;
      const diff = listing.priceAmount - fav.priceAtAdd;
      return diff !== 0 ? diff : null;
    },
    [favorites]
  );

  const hasNewExpertReport = useCallback(
    (listing: Listing): boolean => {
      const fav = favorites.find((f) => f.listing.id === listing.id);
      if (!fav) return false;
      return !fav.hadExpertReport && (listing.condition?.hasExpertReport ?? false);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearAll,
        count: favorites.length,
        getPriceChange,
        hasNewExpertReport,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
