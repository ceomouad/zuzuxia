import Link from "next/link";
import { Instagram } from "lucide-react";
import { SpikeMark } from "./SpikeMark";
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
    <footer className="mt-24 border-t border-[var(--border)]">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-black">
              <SpikeMark className="h-6 w-6" />
            </span>
            <span className="font-display text-lg font-bold">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-[var(--fg-muted)]">
            {SITE.description} Authentic pairs, fast shipping, and friendly
            support in English — no complicated Chinese apps required.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--fg-muted)]">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-gold">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-gold">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Contact
          </h3>
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            Order &amp; customer support on WhatsApp. Follow us for drops.
          </p>
          <a
            href={HAS_WHATSAPP ? whatsappUrl() : INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-4"
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
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram size={18} />
            </a>
            {TIKTOK_URL && (
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] transition-colors hover:border-gold hover:text-gold"
              >
                <TikTokIcon size={17} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-[var(--fg-muted)] sm:flex-row">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p>
            Designed for foreigners living in China · Delivered nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}
