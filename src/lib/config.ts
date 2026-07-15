// Central site configuration. Safe values are exposed to the client.

export const SITE = {
  name: "Zu Zu Xia",
  tagline: "Premium Track & Field Spikes",
  description:
    "Authentic track & field spikes delivered all across China for athletes, international students, expats and foreigners.",
  currency: "¥",
  instagramUsername:
    process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "abderrv.hmvne",
  tiktokUsername: process.env.NEXT_PUBLIC_TIKTOK_USERNAME || "",
  // Digits only, incl. country code, no "+" (e.g. 8613800138000).
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
    /[^0-9]/g,
    ""
  ),
};

export const INSTAGRAM_URL = `https://instagram.com/${SITE.instagramUsername}`;
export const TIKTOK_URL = SITE.tiktokUsername
  ? `https://www.tiktok.com/@${SITE.tiktokUsername.replace(/^@/, "")}`
  : "";

/** WhatsApp is the primary customer-service / order channel when configured. */
export const HAS_WHATSAPP = SITE.whatsappNumber.length > 0;

/** Builds a wa.me link, optionally with pre-filled text (WhatsApp supports it). */
export function whatsappUrl(message?: string): string {
  const base = SITE.whatsappNumber
    ? `https://wa.me/${SITE.whatsappNumber}`
    : "https://wa.me/";
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Category cards on the homepage (shown even when a brand has no stock yet).
export const CATEGORIES: { name: string; blurb: string }[] = [
  { name: "Nike", blurb: "Air Zoom Maxfly & Dragonfly" },
  { name: "Adidas", blurb: "Adizero Prime & Avanti" },
  { name: "Puma", blurb: "evoSPEED NITRO energy" },
  { name: "Asics", blurb: "Metaspeed precision" },
];

export function formatPrice(value: number): string {
  return `${SITE.currency}${value.toLocaleString("en-US")}`;
}

/** Prices are starting/reference prices — shown as "From ¥55". */
export function formatFrom(value: number): string {
  return `From ${formatPrice(value)}`;
}
