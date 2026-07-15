"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { HAS_WHATSAPP, INSTAGRAM_URL, whatsappUrl } from "@/lib/config";
import { WhatsAppIcon } from "./BrandIcons";
import { BrandLogo } from "./BrandLogo";
import { LaneLines } from "./LaneLines";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ heroImage }: { heroImage: string }) {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-24">
      <div className="container-x grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pb-24">
        {/* ---- Left: editorial copy ---- */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 text-[var(--fg-muted)]"
          >
            <span className="mono-label text-brand">/ 中国</span>
            <span className="h-px flex-1 bg-[var(--border)]" />
            <span className="mono-label">Est. 2026 · China</span>
          </motion.div>

          <h1 className="display mt-6 text-[clamp(3.4rem,9.5vw,7.5rem)]">
            {["Chase", "every"].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.08 }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.21 }}
              className="block text-brand"
            >
              second.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-[var(--fg-muted)]"
          >
            Authentic Nike, Adidas, Asics &amp; Puma track &amp; field spikes —
            brand new and second hand — shipped anywhere in China for athletes,
            students &amp; expats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/shop" className="btn-brand">
              Shop Spikes <ArrowRight size={16} />
            </Link>
            <a
              href={HAS_WHATSAPP ? whatsappUrl() : INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {HAS_WHATSAPP ? (
                <>
                  <WhatsAppIcon size={16} /> Chat to order
                </>
              ) : (
                <>
                  <Instagram size={16} /> Contact us
                </>
              )}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--border)] pt-6"
          >
            {[
              ["100%", "Authentic"],
              ["2–5", "Day delivery"],
              ["47+", "Styles in stock"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl leading-none">{n}</dt>
                <dd className="mono-label mt-1.5">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---- Right: product on an electric-blue panel ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-light via-brand to-brand-dark">
            {/* Lane lines bleeding from a corner */}
            <LaneLines
              lanes={8}
              className="absolute -right-24 -top-28 h-[34rem] w-[34rem] text-white/25"
            />
            {/* Emblem badge */}
            <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 shadow-soft">
              <BrandLogo className="h-8 w-8" />
              <span className="font-display text-sm uppercase tracking-tight text-ink">
                Zu Zu Xia
              </span>
            </div>
            {/* Rotated bib tag */}
            <div className="absolute right-5 top-6 z-20 rotate-3 border-2 border-white/80 px-3 py-1.5 text-right">
              <p className="mono-label leading-none text-white/80">No.</p>
              <p className="font-display text-2xl leading-none text-white">
                01
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-4 inset-y-10 z-10"
            >
              <Image
                src={heroImage}
                alt="Featured track spike"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="object-contain drop-shadow-[0_36px_44px_rgba(0,0,0,0.5)]"
              />
            </motion.div>

            {/* Bottom spec bar */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-white/25 bg-black/15 px-5 py-3 backdrop-blur-sm">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white">
                New · Second hand
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white">
                Sprint / Jumps / Throws
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
