"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/config";
import { SectionHeading } from "./SectionHeading";

export function Categories({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading
        eyebrow="Shop by brand"
        title="Categories"
        subtitle="The brands runners and sneakerheads trust — curated and authentic."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
                className="card group relative flex h-40 flex-col justify-between overflow-hidden p-5 transition-all hover:border-gold hover:shadow-glow"
              >
                <div className="absolute -right-6 -top-8 font-display text-8xl font-black text-[var(--fg)] opacity-[0.04] transition-opacity group-hover:opacity-[0.08]">
                  {cat.name.charAt(0)}
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-display text-xl font-bold">
                    {cat.name}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-[var(--fg-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                  />
                </div>
                <div>
                  <p className="text-sm text-[var(--fg-muted)]">{cat.blurb}</p>
                  <p className="mt-1 text-xs font-semibold text-gold">
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
