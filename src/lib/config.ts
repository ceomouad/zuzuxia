// Central site configuration. Safe values are exposed to the client.

export const SITE = {
  name: "Zu Zu Xia",
  tagline: "Premium Track & Field Spikes",
  description:
    "Authentic track & field spikes delivered all across China for athletes, international students, expats and foreigners.",
  currency: "¥",
  instagramUsername:
    process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "abderrv.hmvne",
};

export const INSTAGRAM_URL = `https://instagram.com/${SITE.instagramUsername}`;

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
