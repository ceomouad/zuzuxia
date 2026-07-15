"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, ShieldCheck, Truck } from "lucide-react";
import { HAS_WHATSAPP, INSTAGRAM_URL, whatsappUrl } from "@/lib/config";
import { WhatsAppIcon } from "./BrandIcons";

export function Hero({ heroImage }: { heroImage: string }) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          >
            <span className="h-2 w-2 rounded-full bg-gold" />
            Delivering nationwide across China
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Premium Track Spikes <span className="gold-text">in China</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-lg text-lg text-[var(--fg-muted)]"
          >
            Authentic Nike, Adidas, Asics &amp; Puma track &amp; field spikes —
            brand new and second hand — delivered all across China.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/shop" className="btn-primary">
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
                  <WhatsAppIcon size={16} /> Chat on WhatsApp
                </>
              ) : (
                <>
                  <Instagram size={16} /> Contact on Instagram
                </>
              )}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-6 text-sm text-[var(--fg-muted)]"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={18} className="text-gold" /> 100% Authentic
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck size={18} className="text-gold" /> 2–5 day delivery
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-gold/30 to-transparent blur-2xl" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass relative rounded-[2.5rem] p-6 shadow-soft"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={heroImage}
                alt="Featured track spike"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
