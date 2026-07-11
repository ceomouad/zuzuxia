// Central site configuration. Safe values are exposed to the client.

export const SITE = {
  name: "Zu Zu Xia",
  tagline: "Premium Sneakers in China",
  description:
    "Authentic sneakers delivered all across China for international students, expats and foreigners.",
  currency: "¥",
  instagramUsername:
    process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "abderrv.hmvne",
};

export const INSTAGRAM_URL = `https://instagram.com/${SITE.instagramUsername}`;

// Category cards on the homepage (shown even when a brand has no stock yet).
export const CATEGORIES: { name: string; blurb: string }[] = [
  { name: "Nike", blurb: "Zoom & Air performance" },
  { name: "Adidas", blurb: "Adizero race DNA" },
  { name: "New Balance", blurb: "FuelCell speed" },
  { name: "Jordan", blurb: "Iconic legacy" },
  { name: "Converse", blurb: "Timeless classics" },
  { name: "Puma", blurb: "NITRO energy" },
  { name: "Asics", blurb: "MetaSpeed precision" },
];

export function formatPrice(value: number): string {
  return `${SITE.currency}${value.toLocaleString("en-US")}`;
}
