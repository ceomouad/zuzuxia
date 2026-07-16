import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { repository } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse authentic Nike, Adidas, Puma and Asics track & field spikes — brand new and second hand, delivered anywhere in China.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { brand?: string; q?: string };
}) {
  const products = await repository.list();

  return (
    <main>
      <Navbar />
      <div className="container-x pt-28 md:pt-36">
        <span className="eyebrow">The collection</span>
        <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
          Shop Track Spikes
        </h1>
        <p className="mt-3 max-w-xl text-[var(--fg-muted)]">
          Authentic pairs, ready to ship across China — brand new and second
          hand. Prices shown are starting prices; the final price depends on
          condition and size, confirmed on WhatsApp. Filter by brand, event,
          size and price, then order in one tap.
        </p>
      </div>
      <div className="mt-10">
        <ProductGrid
          products={products}
          initialBrand={searchParams.brand}
          initialQuery={searchParams.q}
        />
      </div>
      <Footer />
    </main>
  );
}
