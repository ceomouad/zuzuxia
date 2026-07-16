"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Menu, Search, ShoppingBag, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/config";
import { openOrder } from "@/lib/order";
import { BrandLogo } from "./BrandLogo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Collections" },
  { href: "/#faq", label: "Contact" },
];

// Diagonal gradient ribbons under the hero shoe (from the concept design).
const RIBBONS = [
  "from-violet-500 via-purple-500 to-blue-500",
  "from-fuchsia-500 via-pink-500 to-violet-500",
  "from-orange-400 via-rose-400 to-pink-500",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ShowcaseHero({ products }: { products: Product[] }) {
  const items = useMemo(() => products.slice(0, 7), [products]);
  const [active, setActive] = useState(0);
  const [imageIdx, setImageIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const product = items[active];
  if (!product) return null;

  const gallery = product.images.length ? product.images : [];
  const heroImage = gallery[imageIdx] ?? gallery[0] ?? "/logo-mark.png";
  const chosenSize = size ?? product.sizes[0] ?? null;

  function switchTo(i: number) {
    if (i === active) return;
    setActive(i);
    setImageIdx(0);
    setSize(null);
  }

  async function buy() {
    await openOrder(product.name, chosenSize ?? undefined);
    setSent(true);
    setTimeout(() => setSent(false), 2200);
  }

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.6rem] bg-[#131419] text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:rounded-[2rem]">
        {/* Giant watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid select-none place-items-center"
        >
          <span className="text-[24vw] font-black leading-none tracking-tight text-white/[0.045]">
            租租侠
          </span>
        </div>

        {/* Fluid gradient blob — bottom-left corner */}
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_210deg,#7c3aed,#db2777,#3b82f6,#7c3aed)] opacity-80 blur-2xl" />
          <div className="absolute inset-10 rounded-full bg-[conic-gradient(from_40deg,#ec4899,#8b5cf6,#2563eb,#ec4899)] opacity-90 blur-md" />
        </div>

        {/* ---------- In-frame navigation ---------- */}
        <header className="relative z-30 flex items-center justify-between gap-4 px-5 pt-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandLogo className="h-9 w-9" />
            <span className="hidden font-display text-lg uppercase tracking-tight sm:block">
              Zu Zu Xia
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <form action="/shop" className="relative hidden sm:block">
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                name="q"
                placeholder="Search"
                className="w-40 rounded-lg border border-white/10 bg-white/[0.06] py-2 pl-9 pr-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-brand lg:w-52"
              />
            </form>
            <Link
              href="/shop"
              aria-label="Shop bag"
              className="grid h-10 w-10 place-items-center rounded-xl bg-white text-ink transition hover:bg-white/85"
            >
              <ShoppingBag size={17} />
            </Link>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white transition hover:bg-brand-dark"
            >
              {menuOpen ? (
                <X size={17} />
              ) : (
                <span className="grid grid-cols-2 gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-[2px] bg-white" />
                  ))}
                </span>
              )}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-5 top-20 z-40 w-56 rounded-2xl border border-white/10 bg-[#1a1b21] p-2 shadow-soft sm:right-8"
            >
              {NAV.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ---------- Main stage ---------- */}
        <div className="relative z-10 grid gap-6 px-5 pb-10 pt-6 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)_150px] lg:gap-2 lg:pb-14 lg:pt-8 xl:grid-cols-[260px_minmax(0,1fr)_170px]">
          {/* Left: product panel (keyed swap — never gated on exit animations) */}
          <div className="relative z-30 order-2 lg:order-1 lg:pt-10">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease }}
            >
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  <FancyName name={product.name} />
                </h1>
                <p className="mt-3 font-mono text-xl font-bold">
                  {product.priceLabel ?? `From ${formatPrice(product.price)}`}
                </p>
                {product.priceUsed != null && (
                  <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white/45">
                    2nd hand from {formatPrice(product.priceUsed)}
                  </p>
                )}

                {gallery.length > 1 && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                      Colors
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {gallery.slice(0, 6).map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          aria-label={`Colorway ${i + 1}`}
                          onClick={() => setImageIdx(i)}
                          className={`relative h-6 w-6 overflow-hidden rounded-full border-2 bg-white transition ${
                            imageIdx === i
                              ? "border-brand"
                              : "border-white/25 hover:border-white/60"
                          }`}
                        >
                          <Image src={src} alt="" fill sizes="24px" className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                      Size
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.slice(0, 8).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSize(s)}
                          className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold transition ${
                            chosenSize === s
                              ? "border-white bg-white text-ink"
                              : "border-white/25 text-white/70 hover:border-white/60"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={buy}
                  className="mt-7 inline-flex h-12 min-w-[10rem] items-center justify-center gap-2 rounded-lg bg-brand px-8 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-brand-dark hover:shadow-glow active:scale-[0.97]"
                >
                  {sent ? (
                    <>
                      <Check size={16} /> Opening chat
                    </>
                  ) : (
                    "Buy"
                  )}
                </button>
            </motion.div>
          </div>

          {/* Center: hero shoe over gradient ribbons */}
          <div className="relative order-1 min-h-[320px] sm:min-h-[420px] lg:order-2 lg:min-h-[540px]">
            {/* Ribbons staircase */}
            <div aria-hidden className="absolute inset-0 hidden sm:block">
              {RIBBONS.map((g, i) => (
                <div
                  key={g}
                  className={`absolute h-14 -rotate-[24deg] rounded-sm bg-gradient-to-r ${g}`}
                  style={{
                    width: `${330 - i * 40}px`,
                    left: `${34 + i * 15}%`,
                    top: `${34 + i * 19}%`,
                    opacity: 0.9 - i * 0.12,
                  }}
                >
                  {gallery[i + 1] && (
                    <div className="absolute -top-10 left-1/2 h-20 w-28 -translate-x-1/2">
                      <Image
                        src={gallery[i + 1]}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Big shoe (keyed swap — new product mounts immediately) */}
            <motion.div
              key={product.id + heroImage}
              initial={{ opacity: 0, x: 80, rotate: -12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, rotate: -24, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="absolute left-1/2 top-1/2 z-20 h-[105%] w-[105%] -translate-x-[58%] -translate-y-[58%] lg:-translate-x-[62%] lg:-translate-y-[56%]"
            >
              <Image
                src={heroImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 96vw, 60vw"
                className="object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.55)]"
              />
            </motion.div>
          </div>

          {/* Right: arc product switcher (desktop) */}
          <div className="relative order-3 hidden lg:block">
            <ArcCarousel items={items} active={active} onSelect={switchTo} />
          </div>

          {/* Mobile product switcher */}
          <div className="order-3 -mx-1 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => switchTo(i)}
                aria-label={p.name}
                className={`relative h-16 w-20 shrink-0 rounded-xl border bg-white/[0.05] transition ${
                  i === active ? "border-brand" : "border-white/10"
                }`}
              >
                <Image
                  src={p.images[0] ?? "/logo-mark.png"}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Last word of the product name gets the accent color (like "Impact 4"). */
function FancyName({ name }: { name: string }) {
  const words = name.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-brand">{last}</span>
    </>
  );
}

/**
 * Semi-circular product switcher along the right edge — thumbnails ride an
 * arc; the selected one sits at the arc's leftmost point next to a marker dot.
 */
function ArcCarousel({
  items,
  active,
  onSelect,
}: {
  items: Product[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const R = 300; // arc radius (px)
  const STEP = 24; // degrees between items

  return (
    <div className="absolute inset-y-0 right-[-2rem] w-[170px] xl:right-[-2.5rem]">
      {/* Arc line */}
      <div
        aria-hidden
        className="absolute top-1/2 rounded-full border border-white/20"
        style={{
          width: R * 2,
          height: R * 2,
          left: 60,
          transform: "translateY(-50%)",
        }}
      />
      {/* Active marker dot on the arc */}
      <span
        aria-hidden
        className="absolute z-20 h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.15)]"
        style={{ left: 60 - 7, top: "50%", transform: "translateY(-50%)" }}
      />

      {items.map((p, i) => {
        const offset = i - active;
        const theta = (offset * STEP * Math.PI) / 180;
        const hidden = Math.abs(offset) > 3;
        // Circle center sits at x = 60 + R, y = 50%; items ride the left rim.
        const x = 60 + R - R * Math.cos(theta);
        const y = -R * Math.sin(theta);
        const isActive = i === active;
        return (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show ${p.name}`}
            initial={false}
            animate={{
              left: x - 34,
              top: `calc(50% + ${y}px - 26px)`,
              scale: isActive ? 1.25 : 0.95,
              opacity: hidden ? 0 : isActive ? 1 : 0.75,
            }}
            transition={{ duration: 0.45, ease }}
            className={`absolute z-10 h-[52px] w-[68px] ${
              hidden ? "pointer-events-none" : ""
            }`}
          >
            <Image
              src={p.images[0] ?? "/logo-mark.png"}
              alt=""
              fill
              sizes="68px"
              className={`object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.55)] transition ${
                isActive ? "" : "saturate-[0.85]"
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
