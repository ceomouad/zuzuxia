"use client";

// Faithful port of the "MACH Store" design, wired to the real Zu Zu Xia
// catalog: live cart, category filters, size-picking ADD+, WhatsApp ordering.

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatPrice, HAS_WHATSAPP, INSTAGRAM_URL, whatsappUrl } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { QuickView } from "./ProductCard";
import { Footer } from "./Footer";

const TICKER =
  "AUTHENTIC SPIKES ✦ NEW & SECOND HAND ✦ DELIVERED ALL ACROSS CHINA ✦ ORDER ON WHATSAPP ✦ ";

export function MachHome({ products }: { products: Product[] }) {
  const { count } = useCart();
  const [filter, setFilter] = useState<string>("ALL");

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.category.toUpperCase()))).filter(
        Boolean
      ),
    [products]
  );

  const lineup = useMemo(() => {
    const base =
      filter === "ALL"
        ? [...products].sort((a, b) => Number(b.featured) - Number(a.featured))
        : products.filter((p) => p.category.toUpperCase() === filter);
    return base.slice(0, 8);
  }, [products, filter]);

  const hero = products.find((p) => p.featured) ?? products[0];
  const orderHref = HAS_WHATSAPP ? whatsappUrl() : INSTAGRAM_URL;

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      {/* ============ NAV ============ */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.08] bg-[#0A0A0A]/[0.82] px-5 py-[18px] backdrop-blur-xl sm:px-10">
        <Link
          href="/"
          className="font-display text-[30px] font-black italic leading-none tracking-[-0.02em]"
        >
          ZUZUXIA<span className="text-brand">.</span>
        </Link>
        <div className="hidden items-center gap-[34px] md:flex">
          <a href="#lineup" className="font-mono text-xs font-bold tracking-[0.16em] text-[#cfcfcf] transition-colors hover:text-brand">SPIKES</a>
          <a href="#tech" className="font-mono text-xs font-bold tracking-[0.16em] text-[#cfcfcf] transition-colors hover:text-brand">TECH</a>
          <Link href="/shop" className="font-mono text-xs font-bold tracking-[0.16em] text-[#cfcfcf] transition-colors hover:text-brand">STORE</Link>
          <Link href="/checkout" className="font-mono text-xs font-bold tracking-[0.16em] text-[#cfcfcf] transition-colors hover:text-brand">CHECKOUT</Link>
        </div>
        <div className="flex items-center gap-3.5">
          <Link
            href="/shop"
            className="hidden font-mono text-xs font-bold tracking-[0.12em] text-[#cfcfcf] transition-colors hover:text-brand sm:block"
          >
            SEARCH
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-[7px] bg-brand px-3.5 py-[9px] font-mono text-xs font-bold tracking-[0.08em] text-ink transition-colors hover:bg-white"
          >
            BAG · {count}
          </Link>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header id="top" className="relative grid min-h-[88vh] items-stretch lg:grid-cols-[1.15fr_0.85fr]">
        <div className="speedlines speedlines-anim pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[36%] top-[6%] select-none font-display text-[clamp(280px,34vw,560px)] font-black italic leading-[0.7] tracking-[-0.04em] text-white/[0.035]"
        >
          9
        </div>

        {/* copy */}
        <div className="relative z-[2] flex flex-col justify-center px-5 py-16 sm:px-14">
          <div className="mb-[26px] inline-flex items-center gap-2.5">
            <span className="h-0.5 w-[30px] bg-brand" />
            <span className="font-mono text-xs font-bold tracking-[0.26em] text-brand">
              TRACK &amp; FIELD SYSTEM
            </span>
          </div>
          <h1 className="font-display text-[clamp(64px,9.4vw,150px)] font-black italic leading-[0.8] tracking-[-0.02em]">
            SPEED.
            <br />
            CONTROL.
            <br />
            <span className="text-brand">DOMINATE.</span>
          </h1>
          <p className="mt-7 max-w-[440px] text-[17px] leading-normal text-[#b6b6b6]">
            Authentic Nike, Adidas, Asics &amp; Puma track spikes — brand new
            and second hand — delivered anywhere in China.
          </p>
          <div className="mt-[34px] flex flex-wrap gap-3.5">
            <a
              href="#lineup"
              className="bg-brand px-[26px] py-[17px] font-mono text-[13px] font-bold tracking-[0.08em] text-ink transition-colors hover:bg-white"
            >
              SHOP SPIKES →
            </a>
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/25 px-[26px] py-[17px] font-mono text-[13px] font-bold tracking-[0.08em] text-white transition-colors hover:border-brand hover:text-brand"
            >
              ORDER ON WHATSAPP
            </a>
          </div>
          <div className="mt-12 flex gap-10">
            <div>
              <div className="font-display text-[34px] font-extrabold leading-none">
                100<span className="text-base text-brand">%</span>
              </div>
              <div className="mt-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-[#7f7f7f]">
                AUTHENTIC
              </div>
            </div>
            <div>
              <div className="font-display text-[34px] font-extrabold leading-none">
                {products.length}+
              </div>
              <div className="mt-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-[#7f7f7f]">
                STYLES IN STOCK
              </div>
            </div>
            <div>
              <div className="font-display text-[34px] font-extrabold leading-none text-brand">
                2–5D
              </div>
              <div className="mt-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-[#7f7f7f]">
                CHINA DELIVERY
              </div>
            </div>
          </div>
        </div>

        {/* hero image */}
        <div className="relative z-[1] min-h-[340px] overflow-hidden">
          <Image
            src="/mach/hero.jpg"
            alt="Zu Zu Xia track spikes"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A0A0A_0%,rgba(10,10,10,0)_22%,rgba(10,10,10,0)_70%,rgba(10,10,10,0.5)_100%)]" />
          {hero && (
            <div className="absolute bottom-[26px] left-6 z-[2] border-l-2 border-brand bg-[#0A0A0A]/70 px-[18px] py-[13px] backdrop-blur-sm">
              <div className="font-mono text-[11px] font-bold tracking-[0.14em] text-brand">
                FEATURED · {hero.name.toUpperCase()}
              </div>
              <div className="mt-1.5 font-display text-2xl font-extrabold leading-[1.1]">
                FROM {formatPrice(hero.price)} · LANE-READY
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <div className="overflow-hidden whitespace-nowrap border-y border-[#0A0A0A] bg-brand text-ink">
        <div className="marquee gap-[34px] py-[13px] font-display text-[22px] font-extrabold italic tracking-[0.02em]">
          <span>{TICKER.repeat(2)}</span>
          <span>{TICKER.repeat(2)}</span>
        </div>
      </div>

      {/* ============ LINEUP ============ */}
      <section id="lineup" className="mx-auto max-w-[1320px] px-5 pb-10 pt-[88px] sm:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3.5 font-mono text-xs font-bold tracking-[0.24em] text-brand">
              THE LINEUP
            </div>
            <h2 className="font-display text-[clamp(40px,5.5vw,72px)] font-black italic leading-[0.86] tracking-[-0.02em]">
              RACE-DAY SPIKES.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {["ALL", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`px-3.5 py-[9px] font-mono text-[11px] font-bold tracking-[0.1em] transition-colors ${
                  filter === c
                    ? "bg-brand text-ink"
                    : "border border-white/20 text-[#cfcfcf] hover:border-brand hover:text-brand"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[18px]">
          {lineup.map((p) => (
            <LineupCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block border border-white/25 px-[26px] py-4 font-mono text-xs font-bold tracking-[0.1em] text-white transition-colors hover:border-brand hover:text-brand"
          >
            VIEW ALL {products.length} STYLES →
          </Link>
        </div>
      </section>

      {/* ============ TECH ============ */}
      <section id="tech" className="mt-[60px] border-y border-[#1c1c1c]">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="relative min-h-[380px] overflow-hidden bg-black lg:min-h-[560px]">
            <Image
              src="/mach/tech.jpg"
              alt="Spike plate and pins"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.2),rgba(10,10,10,0.65))]" />
            <div className="absolute bottom-[26px] left-7 font-mono text-[11px] font-bold tracking-[0.16em] text-brand">
              FIG. 01 — PROPULSION PLATE + PIN ARRAY
            </div>
          </div>
          <div className="flex flex-col justify-center px-5 py-16 sm:px-14 lg:py-[72px]">
            <div className="mb-4 font-mono text-xs font-bold tracking-[0.24em] text-brand">
              ENGINEERED TO BITE
            </div>
            <h2 className="font-display text-[clamp(38px,4.4vw,60px)] font-black italic leading-[0.86] tracking-[-0.02em]">
              EVERY GRAM
              <br />
              SPENT ON SPEED.
            </h2>
            <p className="mt-[22px] max-w-[460px] text-base leading-normal text-[#b6b6b6]">
              Carbon propulsion plates snap energy back into the track. Pyramid
              pins lock you to the surface from the gun to the line — pick your
              event and we&apos;ll match you to the right pair.
            </p>

            <div className="mt-[34px] max-w-[480px] font-mono text-[13px]">
              {[
                ["PLATE", "FULL-LENGTH CARBON", false],
                ["SPIKE PINS", "PYRAMID 7MM", false],
                ["EVENTS", "SPRINT · JUMPS · THROWS · DISTANCE", false],
                ["CONDITION", "NEW & SECOND HAND", false],
                ["DELIVERY", "2–5 DAYS · ALL CHINA", true],
              ].map(([k, v, last]) => (
                <div
                  key={k as string}
                  className={`flex justify-between gap-4 py-[11px] ${
                    last ? "" : "border-b border-dotted border-[#333]"
                  }`}
                >
                  <span className="text-[#8a8a8a]">{k}</span>
                  <span className={`text-right font-bold ${last ? "text-brand" : ""}`}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* feature row */}
        <div className="grid border-t border-[#1c1c1c] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "LIGHTWEIGHT FEEL", "Race builds that disappear at top speed."],
            ["02", "EXPLOSIVE TRACTION", "Pins grip from the very first stride."],
            ["03", "AUTHENTIC ONLY", "Every pair verified before it ships."],
            ["04", "BUILT FOR SPEED", "Carbon plates engineered for race day."],
          ].map(([n, t, d], i) => (
            <div
              key={n}
              className={`px-7 py-[30px] ${i < 3 ? "lg:border-r lg:border-[#1c1c1c]" : ""} ${
                i % 2 === 0 ? "sm:border-r sm:border-[#1c1c1c] lg:border-r" : ""
              } border-b border-[#1c1c1c] lg:border-b-0`}
            >
              <div className="font-mono text-xs font-bold text-brand">{n}</div>
              <div className="mt-3 font-display text-[22px] font-extrabold">{t}</div>
              <div className="mt-1.5 text-[13px] leading-snug text-[#9a9a9a]">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden px-5 py-[90px] text-center sm:px-10">
        <div className="speedlines-strong absolute inset-0" />
        <div className="relative z-[2]">
          <div className="mb-[18px] font-mono text-xs font-bold tracking-[0.24em] text-brand">
            LIMITED STOCK · MAX IMPACT
          </div>
          <h2 className="font-display text-[clamp(48px,8vw,108px)] font-black italic leading-[0.82] tracking-[-0.02em]">
            LEVEL UP
            <br />
            YOUR GAME.
          </h2>
          <Link
            href="/shop"
            className="mt-[34px] inline-block bg-brand px-[30px] py-[18px] font-mono text-[13px] font-bold tracking-[0.08em] text-ink transition-colors hover:bg-white"
          >
            FIND YOUR SPIKE →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- Lineup card (design card + working ADD with size pick) ---------- */
function LineupCard({ product }: { product: Product }) {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState(false);
  const [added, setAdded] = useState(false);

  function add(size: string) {
    cart.add(product, size);
    setPicking(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const sizeRange =
    product.sizes.length > 1
      ? `US ${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`
      : `US ${product.sizes[0] ?? "—"}`;

  return (
    <>
      <div className="group border border-[#1f1f1f] bg-[#121212] transition-all duration-200 hover:-translate-y-1.5 hover:border-brand">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-black"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.images[0] ?? "/logo-mark.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.05]"
          />
          <span className="absolute left-3 top-3 bg-brand px-[9px] py-1.5 font-mono text-[10px] font-bold tracking-[0.1em] text-ink">
            {product.category.toUpperCase()}
          </span>
        </button>
        <div className="p-[18px] pb-5">
          <div className="font-display text-[26px] font-extrabold uppercase leading-none tracking-[-0.01em]">
            {product.name}
          </div>
          <div className="mt-[5px] text-[13px] leading-snug text-[#9a9a9a]">
            {product.brand} · New &amp; second hand
          </div>

          {picking ? (
            <div className="mt-3.5 flex flex-wrap gap-[7px]">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => add(s)}
                  className="border border-brand/60 px-2 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-brand transition-colors hover:bg-brand hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-3.5 flex flex-wrap gap-[7px]">
              <span className="border border-[#2a2a2a] px-2 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#cfcfcf]">
                {sizeRange}
              </span>
              {product.priceUsed != null && (
                <span className="border border-[#2a2a2a] px-2 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#cfcfcf]">
                  2ND {formatPrice(product.priceUsed)}
                </span>
              )}
              <span className="border border-[#2a2a2a] px-2 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#cfcfcf]">
                AUTHENTIC
              </span>
            </div>
          )}

          <div className="mt-[18px] flex items-center justify-between">
            <span className="font-display text-2xl font-extrabold">
              {formatPrice(product.price)}
              <span className="ml-1 align-middle font-mono text-[10px] font-bold text-[#8a8a8a]">
                FROM
              </span>
            </span>
            <button
              type="button"
              onClick={() => (picking ? setPicking(false) : setPicking(true))}
              className={`px-3.5 py-2.5 font-mono text-[11px] font-bold tracking-[0.08em] transition-colors ${
                added
                  ? "bg-white text-ink"
                  : "bg-brand text-ink hover:bg-white"
              }`}
            >
              {added ? "ADDED ✓" : picking ? "PICK SIZE" : "ADD +"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && <QuickView product={product} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
