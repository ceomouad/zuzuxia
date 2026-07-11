import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./ScrollReveal";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="container-x py-20 md:py-28">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Hand-picked"
          title="Featured Products"
          subtitle="Our most-wanted pairs, ready to ship."
        />
        <Link
          href="/shop"
          className="btn-outline shrink-0 whitespace-nowrap"
        >
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ScrollReveal key={p.id} delay={(i % 4) * 0.06}>
            <ProductCard product={p} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
