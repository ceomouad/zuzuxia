import { Navbar } from "@/components/Navbar";
import { ProductGridSkeleton } from "@/components/Skeletons";

export default function ShopLoading() {
  return (
    <main>
      <Navbar />
      <div className="container-x pt-14 md:pt-20">
        <div className="skeleton h-4 w-28 rounded" />
        <div className="skeleton mt-3 h-10 w-64 rounded" />
        <div className="skeleton mt-4 h-4 w-96 max-w-full rounded" />
        <div className="mt-10">
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </main>
  );
}
