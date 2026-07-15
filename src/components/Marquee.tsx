import { BrandLogo } from "./BrandLogo";

const ITEMS = [
  "Nike",
  "Adidas",
  "Asics",
  "Puma",
  "New & Second Hand",
  "Authentic Guaranteed",
  "2–5 Day Delivery",
  "Sprint · Jumps · Throws · Distance",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-[var(--border)] bg-[var(--fg)] py-4 text-[var(--bg)]">
      <div className="marquee items-center gap-8">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-lg uppercase tracking-wide sm:text-2xl">
              {item}
            </span>
            <BrandLogo className="h-6 w-6 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
