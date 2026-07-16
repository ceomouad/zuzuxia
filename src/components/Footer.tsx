import Link from "next/link";
import {
  HAS_WHATSAPP,
  INSTAGRAM_URL,
  TIKTOK_URL,
  whatsappUrl,
} from "@/lib/config";

export function Footer() {
  const chat = HAS_WHATSAPP ? whatsappUrl() : INSTAGRAM_URL;
  return (
    <footer className="border-t border-[#1c1c1c] bg-[#0A0A0A] px-5 pb-9 pt-[54px] text-white sm:px-10">
      <div className="mx-auto grid max-w-[1320px] gap-[30px] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="font-display text-[34px] font-black italic leading-none tracking-[-0.02em]">
            ZUZUXIA<span className="text-brand">.</span>
          </div>
          <p className="mt-3.5 max-w-[260px] text-[13px] leading-normal text-[#8a8a8a]">
            Authentic track &amp; field spikes — brand new and second hand —
            delivered all across China. 租租侠.
          </p>
        </div>
        <div>
          <div className="mb-3.5 font-mono text-[11px] font-bold tracking-[0.16em] text-brand">
            SHOP
          </div>
          <div className="flex flex-col gap-[9px] text-[13px] text-[#b6b6b6]">
            <Link href="/shop" className="transition-colors hover:text-brand">All Spikes</Link>
            <Link href="/" className="transition-colors hover:text-brand">Featured</Link>
            <Link href="/cart" className="transition-colors hover:text-brand">Cart</Link>
            <Link href="/checkout" className="transition-colors hover:text-brand">Checkout</Link>
          </div>
        </div>
        <div>
          <div className="mb-3.5 font-mono text-[11px] font-bold tracking-[0.16em] text-brand">
            SUPPORT
          </div>
          <div className="flex flex-col gap-[9px] text-[13px] text-[#b6b6b6]">
            <a href={chat} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">Sizing Help</a>
            <a href={chat} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">Shipping</a>
            <a href={chat} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">Returns</a>
            <a href={chat} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">Contact</a>
          </div>
        </div>
        <div>
          <div className="mb-3.5 font-mono text-[11px] font-bold tracking-[0.16em] text-brand">
            FOLLOW
          </div>
          <div className="flex flex-col gap-[9px] text-[13px] text-[#b6b6b6]">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">Instagram</a>
            {TIKTOK_URL && (
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">TikTok</a>
            )}
            <a href={chat} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-9 flex max-w-[1320px] flex-wrap justify-between gap-2.5 border-t border-[#1c1c1c] pt-[22px] font-mono text-[11px] leading-snug text-[#6f6f6f]">
        <span>© 2026 ZU ZU XIA · 租租侠</span>
        <span>BUILT FOR ATHLETES IN CHINA</span>
      </div>
    </footer>
  );
}
