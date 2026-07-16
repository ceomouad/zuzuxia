"use client";

// Lightweight cart shared across the app. Persists to localStorage.
// Checkout hands the composed order to WhatsApp — no on-site payments.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./types";

export interface CartItem {
  /** `${productId}__${size}` — one line per product+size combination. */
  id: string;
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  priceUsed?: number;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, size: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "zzx-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* corrupted storage — start fresh */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [items]);

  const add = useCallback((product: Product, size: string, qty = 1) => {
    setItems((prev) => {
      const id = `${product.id}__${size}`;
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, qty: Math.min(9, i.qty + qty) } : i
        );
      }
      return [
        ...prev,
        {
          id,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.images[0] ?? "/logo-mark.png",
          price: product.price,
          priceUsed: product.priceUsed,
          size,
          qty,
        },
      ];
    });
  }, []);

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i.id !== id)),
    []
  );

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(9, qty) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    return { items, count, subtotal, add, remove, setQty, clear };
  }, [items, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
