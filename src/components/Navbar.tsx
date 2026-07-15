"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppIcon, TikTokIcon } from "./BrandIcons";
import {
  HAS_WHATSAPP,
  INSTAGRAM_URL,
  SITE,
  TIKTOK_URL,
  whatsappUrl,
} from "@/lib/config";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Brands" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "glass shadow-soft"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="group flex items-center gap-2.5">
            <BrandLogo className="h-9 w-9 transition-transform group-hover:scale-105 group-hover:-rotate-6" />
            <span className="font-display text-xl uppercase tracking-tight">
              {SITE.name}
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-sm font-bold uppercase tracking-wide text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-0 after:bg-brand after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden h-10 w-10 place-items-center rounded-full text-[var(--fg-muted)] transition-colors hover:text-brand sm:grid"
            >
              <Instagram size={18} />
            </a>
            {TIKTOK_URL && (
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hidden h-10 w-10 place-items-center rounded-full text-[var(--fg-muted)] transition-colors hover:text-brand sm:grid"
              >
                <TikTokIcon size={17} />
              </a>
            )}
            <ThemeToggle />
            <a
              href={HAS_WHATSAPP ? whatsappUrl() : INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden btn-brand md:inline-flex"
            >
              {HAS_WHATSAPP ? <WhatsAppIcon size={16} /> : <Instagram size={16} />}
              Order
            </a>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass container-x mx-4 mt-2 rounded-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-bold uppercase tracking-wide transition-colors hover:bg-[var(--border)]"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={HAS_WHATSAPP ? whatsappUrl() : INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-brand mt-2"
              >
                {HAS_WHATSAPP ? (
                  <WhatsAppIcon size={16} />
                ) : (
                  <Instagram size={16} />
                )}
                {HAS_WHATSAPP ? "Order on WhatsApp" : "Order on Instagram"}
              </a>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1"
                >
                  <Instagram size={16} /> Instagram
                </a>
                {TIKTOK_URL && (
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1"
                  >
                    <TikTokIcon size={16} /> TikTok
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
