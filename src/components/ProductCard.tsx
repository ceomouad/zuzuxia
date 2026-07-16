"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Instagram, Plus, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, HAS_WHATSAPP } from "@/lib/config";
import { openOrder } from "@/lib/order";
import { useCart } from "@/lib/cart";
import { WhatsAppIcon } from "./BrandIcons";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index?: number;
}) {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the quick-view is open so touch-scrolling
  // stays inside the popup instead of moving the page behind it (phones).
  // Keyed on `open` so scroll is restored the instant it closes.
  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  return (
    <>
      <motion.article
        layout
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-shadow hover:shadow-soft"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-square w-full overflow-hidden bg-[var(--bg-sunken)]"
          aria-label={`View ${product.name}`}
        >
          {product.featured && (
            <span className="absolute left-0 top-3 z-10 bg-brand px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
              Featured
            </span>
          )}
          {index != null && (
            <span className="absolute right-3 top-3 z-10 font-mono text-xs text-[var(--fg-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-full bg-[var(--fg)] py-2.5 text-center font-mono text-xs font-bold uppercase tracking-widest text-[var(--bg)] transition-transform duration-300 group-hover:translate-y-0">
            Quick view →
          </span>
          <Image
            src={product.images[0] ?? "/products/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.08]"
          />
        </button>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-brand">
              {product.brand}
            </p>
            <h3 className="mt-1 font-display text-lg uppercase leading-[1.05] tracking-tight">
              {product.name}
            </h3>
          </div>

          <div className="flex items-baseline justify-between gap-2 border-t border-[var(--border)] pt-3">
            <p className="font-mono text-sm font-bold">
              {product.priceLabel ?? `From ${formatPrice(product.price)}`}
            </p>
            {(product.priceUsedLabel ?? product.priceUsed) != null && (
              <p className="font-mono text-[0.7rem] text-[var(--fg-muted)]">
                2ND{" "}
                {product.priceUsedLabel ??
                  `${formatPrice(product.priceUsed as number)}`}
              </p>
            )}
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

export function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const cart = useCart();
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);
  const [added, setAdded] = useState(false);
  const gallery = product.images.length
    ? product.images
    : ["/products/placeholder.jpg"];

  async function buy() {
    await openOrder(product.name, size ?? undefined);
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  function addToCart() {
    if (!size) return;
    cart.add(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
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
        className="glass relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto overscroll-contain rounded-3xl md:grid md:grid-cols-2 md:overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/20 text-white backdrop-blur transition hover:bg-black/40"
        >
          <X size={18} />
        </button>

        <div className="flex shrink-0 flex-col bg-[var(--bg-sunken)]">
          <div className="relative aspect-square w-full">
            <Image
              src={gallery[active] ?? gallery[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8 drop-shadow-[0_24px_28px_rgba(0,0,0,0.45)]"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex flex-wrap gap-2 border-t border-[var(--border)] p-3">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View colorway ${i + 1}`}
                  className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border transition ${
                    active === i
                      ? "border-brand ring-1 ring-brand"
                      : "border-[var(--border)] hover:border-brand/60"
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

        <div className="flex flex-col gap-4 p-7 md:overflow-y-auto md:overscroll-contain">
          <div>
            <p className="eyebrow">{product.brand}</p>
            <h3 className="mt-1 font-display text-2xl font-bold">
              {product.name}
            </h3>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-2xl font-bold sm:text-3xl">
                {product.priceLabel ?? `From ${formatPrice(product.price)}`}
              </span>
              {(product.priceUsedLabel ?? product.priceUsed) != null && (
                <span className="text-sm text-[var(--fg-muted)]">
                  2nd-hand{" "}
                  {product.priceUsedLabel ??
                    `from ${formatPrice(product.priceUsed as number)}`}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs text-[var(--fg-muted)]">
              Starting price — final price depends on condition (brand new or
              second hand) and size. We confirm the exact price on chat.
            </p>
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
                      ? "border-brand bg-brand text-ink"
                      : "border-[var(--border)] hover:border-brand"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={buy} className="btn-brand w-full">
              {sent ? (
                <>
                  <Check size={16} /> Opening…
                </>
              ) : HAS_WHATSAPP ? (
                <>
                  <WhatsAppIcon size={16} /> Buy now
                </>
              ) : (
                <>
                  <Instagram size={16} /> Buy now
                </>
              )}
            </button>
            <button
              type="button"
              onClick={addToCart}
              className="btn-outline w-full"
            >
              {added ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <Plus size={16} /> Add to cart
                </>
              )}
            </button>
          </div>
          <p className="text-center text-xs text-[var(--fg-muted)]">
            {HAS_WHATSAPP
              ? "Opens WhatsApp with your order message ready to send."
              : "We’ll open our DM and copy your order message to paste."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
