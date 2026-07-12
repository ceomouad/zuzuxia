import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { repository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await repository.list();

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const featuredList = featured.length ? featured : products.slice(0, 8);

  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.brand] = (counts[p.brand] ?? 0) + 1;
  }

  const heroImage =
    featuredList[0]?.images[0] ??
    products[0]?.images[0] ??
    "/products/s17a.jpg";

  return (
    <main>
      <Navbar />
      <Hero heroImage={heroImage} />
      <Categories counts={counts} />
      <FeaturedProducts products={featuredList} />
      <About />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  );
}
