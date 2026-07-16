"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

const LINKS = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "STORE" },
  { href: "/checkout", label: "CHECKOUT" },
];

// MACH-style top bar shared by the store, cart and checkout pages.
export function Navbar() {
  const { count } = useCart();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.08] bg-[#0A0A0A]/[0.82] px-5 py-[18px] backdrop-blur-xl sm:px-10">
      <Link
        href="/"
        className="font-display text-[30px] font-black italic leading-none tracking-[-0.02em] text-white"
      >
        ZUZUXIA<span className="text-brand">.</span>
      </Link>
      <div className="hidden items-center gap-[34px] md:flex">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`font-mono text-xs font-bold tracking-[0.16em] transition-colors hover:text-brand ${
              pathname === l.href ? "text-brand" : "text-[#cfcfcf]"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        href="/cart"
        className="inline-flex items-center gap-[7px] bg-brand px-3.5 py-[9px] font-mono text-xs font-bold tracking-[0.08em] text-ink transition-colors hover:bg-white"
      >
        BAG · {count}
      </Link>
    </nav>
  );
}
