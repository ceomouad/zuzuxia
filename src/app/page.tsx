import { ShowcaseHero } from "@/components/ShowcaseHero";
import { repository } from "@/lib/store";

export const dynamic = "force-dynamic";

// The home page is a single full-viewport showcase — no scrolling.
export default async function HomePage() {
  const products = await repository.list();
  const featured = products.filter((p) => p.featured).slice(0, 7);
  const featuredList = featured.length ? featured : products.slice(0, 7);

  return (
    <main className="h-[100svh] overflow-hidden">
      <ShowcaseHero products={featuredList} />
    </main>
  );
}
