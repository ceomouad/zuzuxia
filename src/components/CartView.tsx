"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/config";
import { BrandLogo } from "./BrandLogo";

export function CartView() {
  const { items, count, subtotal, setQty, remove, clear } = useCart();

  if (!items.length) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div>
          <BrandLogo className="mx-auto h-16 w-16 opacity-90" />
          <h1 className="display mt-6 text-4xl sm:text-5xl">Your cart is empty</h1>
          <p className="mt-3 text-[var(--fg-muted)]">
            Find your next pair and add it to the cart.
          </p>
          <Link href="/shop" className="btn-brand mt-7">
            <ShoppingBag size={16} /> Shop spikes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x pb-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Your selection</span>
          <h1 className="display mt-2 text-4xl sm:text-6xl">Cart</h1>
        </div>
        <button
          type="button"
          onClick={clear}
          className="mono-label transition-colors hover:text-red-400"
        >
          Clear all
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <ul className="space-y-3">
          {items.map((i, idx) => (
            <motion.li
              key={i.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 sm:gap-6 sm:p-5"
            >
              <div className="relative h-20 w-24 shrink-0 rounded-xl bg-white/[0.04] sm:h-24 sm:w-28">
                <Image
                  src={i.image}
                  alt={i.name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand">
                  {i.brand}
                </p>
                <h3 className="mt-0.5 truncate font-display text-lg uppercase tracking-tight">
                  {i.name}
                </h3>
                <p className="mono-label mt-1">Size {i.size}</p>
              </div>

              <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center rounded-full border border-[var(--border)]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(i.id, i.qty - 1)}
                    className="grid h-9 w-9 place-items-center text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center font-mono text-sm font-bold">
                    {i.qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty(i.id, i.qty + 1)}
                    className="grid h-9 w-9 place-items-center text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <p className="w-24 text-right font-mono text-sm font-bold">
                  {formatPrice(i.price * i.qty)}
                </p>

                <button
                  type="button"
                  aria-label={`Remove ${i.name}`}
                  onClick={() => remove(i.id)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-red-400 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl uppercase tracking-tight">
            Summary
          </h2>
          <dl className="mt-5 space-y-3 border-t border-[var(--border)] pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--fg-muted)]">
                Items ({count})
              </dt>
              <dd className="font-mono font-bold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--fg-muted)]">Delivery</dt>
              <dd className="font-mono">Confirmed on chat</dd>
            </div>
            <div className="flex justify-between border-t border-[var(--border)] pt-3 text-base">
              <dt className="font-bold">Reference total</dt>
              <dd className="font-mono font-bold text-brand">
                {formatPrice(subtotal)}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-[var(--fg-muted)]">
            Prices are starting prices for brand-new pairs. The final price
            depends on condition (new / second hand) and size — we confirm
            everything on WhatsApp before you pay.
          </p>
          <Link href="/checkout" className="btn-brand mt-6 w-full">
            Checkout <ArrowRight size={16} />
          </Link>
          <Link
            href="/shop"
            className="mt-3 block text-center text-sm font-medium text-[var(--fg-muted)] transition hover:text-brand"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
