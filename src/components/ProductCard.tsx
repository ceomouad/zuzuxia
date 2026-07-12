"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Instagram, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/config";
import { openInstagramOrder } from "@/lib/instagram";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        layout
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="card group flex flex-col overflow-hidden"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-[4/3] w-full overflow-hidden bg-white"
          aria-label={`View ${product.name}`}
        >
          {product.featured && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
              Featured
            </span>
          )}
          <Image
            src={product.images[0] ?? "/products/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                {product.brand}
              </p>
              <h3 className="mt-1 font-display text-base font-bold leading-snug">
                {product.name}
              </h3>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-display text-base font-bold leading-tight">
                {product.priceLabel ?? formatPrice(product.price)}
              </p>
              {(product.priceUsedLabel ?? product.priceUsed) != null && (
                <p className="text-xs text-[var(--fg-muted)]">
                  used{" "}
                  {product.priceUsedLabel ??
                    formatPrice(product.priceUsed as number)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.sizes.slice(0, 6).map((s) => (
              <span
                key={s}
                className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]"
              >
                {s}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-primary mt-auto w-full"
          >
            Buy Now
          </button>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && (
          <QuickView product={product} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const gallery = product.images.length
    ? product.images
    : ["/products/placeholder.jpg"];

  async function buy() {
    await openInstagramOrder(product.name, size ?? undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="glass relative z-10 grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl md:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/20 text-white backdrop-blur transition hover:bg-black/40"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col bg-white">
          <div className="relative aspect-square w-full">
            <Image
              src={gallery[active] ?? gallery[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex flex-wrap gap-2 border-t border-black/5 p-3">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View colorway ${i + 1}`}
                  className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border transition ${
                    active === i
                      ? "border-gold ring-1 ring-gold"
                      : "border-black/10 hover:border-gold/60"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto p-7">
          <div>
            <p className="eyebrow">{product.brand}</p>
            <h3 className="mt-1 font-display text-2xl font-bold">
              {product.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-2xl font-bold sm:text-3xl">
              {product.priceLabel ?? formatPrice(product.price)}
            </span>
            {(product.priceUsedLabel ?? product.priceUsed) != null && (
              <span className="text-sm text-[var(--fg-muted)]">
                used{" "}
                {product.priceUsedLabel ??
                  formatPrice(product.priceUsed as number)}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
            {product.description}
          </p>

          <div>
            <p className="mb-2 text-sm font-semibold">Select size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] rounded-xl border px-3 py-2 text-sm font-medium transition ${
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

          <button type="button" onClick={buy} className="btn-gold mt-2 w-full">
            {copied ? (
              <>
                <Check size={16} /> Message copied — opening Instagram
              </>
            ) : (
              <>
                <Instagram size={16} /> Buy Now on Instagram
              </>
            )}
          </button>
          <p className="text-center text-xs text-[var(--fg-muted)]">
            We&apos;ll open our DM and copy your order message to paste.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
