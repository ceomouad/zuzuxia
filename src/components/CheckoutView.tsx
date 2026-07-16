"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, HAS_WHATSAPP } from "@/lib/config";
import { openCartOrder } from "@/lib/order";
import { WhatsAppIcon } from "./BrandIcons";
import { BrandLogo } from "./BrandLogo";

export function CheckoutView() {
  const { items, count, subtotal, clear } = useCart();
  const [form, setForm] = useState({ name: "", contact: "", address: "", note: "" });
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!items.length) return;
    if (!form.name.trim() || !form.contact.trim() || !form.address.trim()) {
      setError("Please fill in your name, contact and delivery address.");
      return;
    }
    setError(null);
    await openCartOrder(items, form, subtotal);
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-ink">
            <Check size={28} />
          </span>
          <h1 className="display mt-6 text-4xl sm:text-5xl">Order sent</h1>
          <p className="mx-auto mt-3 max-w-md text-[var(--fg-muted)]">
            Your order opened in {HAS_WHATSAPP ? "WhatsApp" : "Instagram"} — just
            hit send. We&apos;ll confirm availability, condition and the final
            price right away.
          </p>
          <Link href="/shop" className="btn-brand mt-7">
            <ShoppingBag size={16} /> Back to the shop
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div>
          <BrandLogo className="mx-auto h-16 w-16 opacity-90" />
          <h1 className="display mt-6 text-4xl sm:text-5xl">Nothing to check out</h1>
          <p className="mt-3 text-[var(--fg-muted)]">Your cart is empty.</p>
          <Link href="/shop" className="btn-brand mt-7">
            <ShoppingBag size={16} /> Shop spikes
          </Link>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none transition focus:border-brand";

  return (
    <div className="container-x pb-20">
      <Link
        href="/cart"
        className="mono-label inline-flex items-center gap-2 transition hover:text-brand"
      >
        <ArrowLeft size={14} /> Back to cart
      </Link>
      <span className="eyebrow mt-6 block">Almost there</span>
      <h1 className="display mt-2 text-4xl sm:text-6xl">Checkout</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* Details form */}
        <form onSubmit={submit} className="space-y-5">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
            <h2 className="font-display text-lg uppercase tracking-tight">
              Delivery details
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Full name *
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`mt-1.5 ${inputCls}`}
                  placeholder="Alex Johnson"
                />
              </label>
              <label className="text-sm font-semibold">
                WhatsApp / WeChat *
                <input
                  value={form.contact}
                  onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                  className={`mt-1.5 ${inputCls}`}
                  placeholder="+86 …"
                />
              </label>
              <label className="sm:col-span-2 text-sm font-semibold">
                Delivery address (city, district, street) *
                <textarea
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  rows={3}
                  className={`mt-1.5 ${inputCls} resize-none`}
                  placeholder="Shanghai, Minhang district, …"
                />
              </label>
              <label className="sm:col-span-2 text-sm font-semibold">
                Notes (optional — condition preference, questions…)
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  rows={2}
                  className={`mt-1.5 ${inputCls} resize-none`}
                  placeholder="I'd prefer second hand if the condition is 9/10+"
                />
              </label>
            </div>
          </div>

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}

          <button type="submit" className="btn-brand w-full py-4 text-sm">
            <WhatsAppIcon size={17} />
            Place order on {HAS_WHATSAPP ? "WhatsApp" : "Instagram"}
          </button>
          <p className="text-center text-xs text-[var(--fg-muted)]">
            No payment is taken on the site — your order opens in{" "}
            {HAS_WHATSAPP ? "WhatsApp" : "Instagram"} where we confirm the final
            price, payment and delivery.
          </p>
        </form>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg uppercase tracking-tight">
            Your order ({count})
          </h2>
          <ul className="mt-4 space-y-3 border-t border-[var(--border)] pt-4">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <div className="relative h-14 w-16 shrink-0 rounded-lg bg-white/[0.04]">
                  <Image src={i.image} alt="" fill sizes="64px" className="object-contain p-1.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{i.name}</p>
                  <p className="mono-label mt-0.5">
                    Size {i.size} × {i.qty}
                  </p>
                </div>
                <p className="font-mono text-sm font-bold">
                  {formatPrice(i.price * i.qty)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-[var(--border)] pt-4">
            <span className="font-bold">Reference total</span>
            <span className="font-mono font-bold text-brand">
              {formatPrice(subtotal)}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
