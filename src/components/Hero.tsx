"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, ShieldCheck, Truck } from "lucide-react";
import { HAS_WHATSAPP, INSTAGRAM_URL, whatsappUrl } from "@/lib/config";
import { WhatsAppIcon } from "./BrandIcons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ heroImage }: { heroImage: string }) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-texture absolute inset-0 opacity-60" />
        <div className="absolute -right-40 top-1/4 h-[42rem] w-[42rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-brand/10 blur-[100px]" />
      </div>

      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          >
            <span className="h-2 w-2 rounded-full bg-brand" />
            Authentic · Delivered nationwide
          </motion.span>

          <h1 className="display mt-5 text-[clamp(3.2rem,9vw,7rem)]">
            {["Track spikes", "built to"].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.08 }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.21 }}
              className="block text-brand"
            >
              fly.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-md text-lg text-[var(--fg-muted)]"
          >
            Authentic Nike, Adidas, Asics &amp; Puma spikes — brand new and second
            hand — shipped anywhere in China for athletes, students &amp; expats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/shop" className="btn-brand">
              Shop Now <ArrowRight size={16} />
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold uppercase tracking-wide text-[var(--fg-muted)]"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand" /> 100% Authentic
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck size={18} className="text-brand" /> 2–5 day delivery
            </span>
          </motion.div>
        </div>

        {/* Product on a logo-echoing blue disc */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto flex w-full max-w-xl items-center justify-center"
        >
          <div className="relative aspect-square w-full">
            {/* Speed rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand to-brand-dark shadow-[0_40px_120px_-30px_rgba(14,144,236,0.7)]" />
            <div className="absolute inset-[6%] rounded-full border border-white/20" />
            <div className="absolute inset-[14%] rounded-full border border-white/10" />

            {/* Diagonal speed streaks */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              {[38, 52, 66].map((top, i) => (
                <motion.span
                  key={top}
                  initial={{ x: "-120%" }}
                  animate={{ x: "140%" }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                  style={{ top: `${top}%` }}
                  className="absolute left-0 h-[3px] w-1/2 rounded-full bg-white/40"
                />
              ))}
            </div>

            <motion.div
              animate={{ y: [0, -16, 0], rotate: [-8, -6, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[8%] z-10"
            >
              <Image
                src={heroImage}
                alt="Featured track spike"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
