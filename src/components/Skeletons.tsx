import { BrandLogo } from "./BrandLogo";

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex gap-1.5">
          <div className="skeleton h-5 w-8 rounded" />
          <div className="skeleton h-5 w-8 rounded" />
          <div className="skeleton h-5 w-8 rounded" />
        </div>
        <div className="skeleton h-10 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BrandLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <BrandLogo className="h-16 w-16 animate-pulse" />
        <div className="skeleton h-1.5 w-40 overflow-hidden rounded-full" />
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]">
          Loading…
        </p>
      </div>
    </div>
  );
}
