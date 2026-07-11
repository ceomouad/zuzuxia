"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/config";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

export function ProductGrid({
  products,
  initialBrand,
}: {
  products: Product[];
  initialBrand?: string;
}) {
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );
  const sizes = useMemo(
    () =>
      Array.from(new Set(products.flatMap((p) => p.sizes))).sort(
        (a, b) => Number(a) - Number(b)
      ),
    [products]
  );
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices, 0), max: Math.max(...prices, 1000) };
  }, [products]);

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string>(
    initialBrand && brands.includes(initialBrand) ? initialBrand : "All"
  );
  const [size, setSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(priceBounds.max);
  const [sort, setSort] = useState<Sort>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (brand !== "All" && p.brand !== brand) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (p.price > maxPrice) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        default:
          return Number(b.featured) - Number(a.featured) || a.price - b.price;
      }
    });
    return list;
  }, [products, brand, size, maxPrice, query, sort]);

  const resetAll = () => {
    setQuery("");
    setBrand("All");
    setSize(null);
    setMaxPrice(priceBounds.max);
    setSort("featured");
  };

  return (
    <div className="container-x">
      {/* Search + sort bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers or brands…"
            className="w-full rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gold"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm outline-none focus:border-gold"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="btn-outline sm:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Brand chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...brands].map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBrand(b)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              brand === b
                ? "border-gold bg-gold text-black"
                : "border-[var(--border)] hover:border-gold"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Size + price filters */}
      <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSize(null)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                  size === null
                    ? "border-gold bg-gold text-black"
                    : "border-[var(--border)] hover:border-gold"
                }`}
              >
                Any
              </button>
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                    size === s
                      ? "border-gold bg-gold text-black"
                      : "border-[var(--border)] hover:border-gold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="md:min-w-[16rem]">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
                Max price
              </p>
              <span className="text-sm font-semibold text-gold">
                {formatPrice(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5">
        <p className="text-sm text-[var(--fg-muted)]">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </p>
        {(query || brand !== "All" || size || maxPrice !== priceBounds.max) && (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
          >
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length ? (
        <motion.div
          layout
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-display text-xl font-bold">No matches</p>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            Try clearing a filter or searching a different brand.
          </p>
          <button type="button" onClick={resetAll} className="btn-gold mt-6">
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
