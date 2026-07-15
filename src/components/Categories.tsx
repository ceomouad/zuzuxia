"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/config";
import { SectionHeading } from "./SectionHeading";

export function Categories({ counts }: { counts: Record<string, number> }) {
  return (
    <section id="categories" className="container-x scroll-mt-24 py-20 md:py-28">
      <SectionHeading
        eyebrow="Shop by brand"
        title="Pick your brand"
        subtitle="The spike brands sprinters, jumpers and distance runners trust — curated and authentic."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat, i) => {
          const count = counts[cat.name] ?? 0;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/shop?brand=${encodeURIComponent(cat.name)}`}
                className="group relative flex h-48 flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 transition-colors hover:border-brand"
              >
                {/* Blue wash slides up on hover */}
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-brand to-brand-dark transition-transform duration-300 ease-out group-hover:scale-y-100" />
                <div className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[9rem] leading-none text-[var(--fg)] opacity-[0.05] transition-all group-hover:text-white group-hover:opacity-[0.14]">
                  {cat.name.charAt(0)}
                </div>
                <div className="relative flex items-start justify-between">
                  <span className="font-display text-2xl uppercase tracking-tight transition-colors group-hover:text-white">
                    {cat.name}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-[var(--fg-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </div>
                <div className="relative">
                  <p className="text-sm text-[var(--fg-muted)] transition-colors group-hover:text-white/85">
                    {cat.blurb}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand transition-colors group-hover:text-white">
                    {count > 0 ? `${count} in stock` : "Coming soon"}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
