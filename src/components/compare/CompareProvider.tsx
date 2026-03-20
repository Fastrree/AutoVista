"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Listing } from "@/types/listing";

const MAX_COMPARE = 4;

interface CompareContextValue {
  items: Listing[];
  isInCompare: (id: string) => boolean;
  toggleCompare: (listing: Listing) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  count: number;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue>({
  items: [],
  isInCompare: () => false,
  toggleCompare: () => {},
  removeFromCompare: () => {},
  clearCompare: () => {},
  count: 0,
  isFull: false,
});

export function useCompare() {
  return useContext(CompareContext);
}

const STORAGE_KEY = "autovista-compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Listing[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Listing[];
        setItems(parsed.slice(0, MAX_COMPARE));
      }
    } catch {
      // Ignore
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items, mounted]);

  const isInCompare = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  const toggleCompare = useCallback(
    (listing: Listing) => {
      setItems((prev) => {
        const exists = prev.find((i) => i.id === listing.id);
        if (exists) {
          return prev.filter((i) => i.id !== listing.id);
        }
        if (prev.length >= MAX_COMPARE) return prev;
        return [...prev, listing];
      });
    },
    []
  );

  const removeFromCompare = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    },
    []
  );

  const clearCompare = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        items,
        isInCompare,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        count: items.length,
        isFull: items.length >= MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
