import Link from "next/link";
import { Instagram } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { LaneLines } from "./LaneLines";
import { WhatsAppIcon, TikTokIcon } from "./BrandIcons";
import {
  HAS_WHATSAPP,
  INSTAGRAM_URL,
  SITE,
  TIKTOK_URL,
  whatsappUrl,
} from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#06080c] text-white">
      {/* Track-lane motif + oversized brand watermark */}
      <LaneLines
        lanes={8}
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] text-brand/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-display text-[22vw] uppercase leading-none tracking-tight text-white/[0.03]"
      >
        {SITE.name}
      </div>

      {/* Mono spec strip */}
      <div className="relative border-b border-white/10">
        <div className="container-x flex flex-wrap items-center gap-x-8 gap-y-1 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
          <span>◦ 100% Authentic</span>
          <span>◦ New &amp; second hand</span>
          <span>◦ 2–5 day delivery nationwide</span>
          <span>◦ WhatsApp support</span>
        </div>
      </div>

      <div className="container-x relative grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="h-10 w-10" />
            <span className="font-display text-xl uppercase tracking-tight">
              {SITE.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            {SITE.description} Authentic pairs, fast shipping, and friendly
            support in English — no complicated Chinese apps required.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-white/80">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop" },
              { href: "/cart", label: "Cart" },
              { href: "/checkout", label: "Checkout" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Contact
          </h3>
          <p className="mt-4 text-sm text-white/60">
            Order &amp; customer support on WhatsApp. Follow us for drops.
          </p>
          <a
            href={HAS_WHATSAPP ? whatsappUrl() : INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand mt-4"
          >
            {HAS_WHATSAPP ? <WhatsAppIcon size={16} /> : <Instagram size={16} />}
            {HAS_WHATSAPP ? "Chat on WhatsApp" : "Instagram DM"}
          </a>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-brand hover:text-brand"
            >
              <Instagram size={18} />
            </a>
            {TIKTOK_URL && (
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-brand hover:text-brand"
              >
                <TikTokIcon size={17} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© 2026 {SITE.name} · 租租侠. All rights reserved.</p>
          <p>Designed for foreigners living in China · Delivered nationwide</p>
        </div>
      </div>
    </footer>
  );
}
