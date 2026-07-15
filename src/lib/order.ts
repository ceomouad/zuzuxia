import { INSTAGRAM_URL, SITE, whatsappUrl } from "./config";

/**
 * Ordering / customer service runs through WhatsApp (with Instagram as a
 * fallback when no WhatsApp number is configured). Because prices are starting
 * prices that depend on condition (new / second hand) and size, the pre-filled
 * message asks us to confirm the exact price.
 */
export function buildOrderMessage(productName: string, size?: string): string {
  const sizePart = size ? ` (size ${size})` : "";
  return (
    `Hi Zu Zu Xia! I'm interested in the ${productName}${sizePart}. ` +
    `Is it available, and what's the price for new / second hand?`
  );
}

export type OrderChannel = "whatsapp" | "instagram";

/** The order URL for a given product (WhatsApp if configured, else Instagram). */
export function orderUrl(productName: string, size?: string): string {
  if (SITE.whatsappNumber) {
    return whatsappUrl(buildOrderMessage(productName, size));
  }
  return INSTAGRAM_URL;
}

/**
 * Opens the order chat. On WhatsApp the message is pre-filled in the URL. On the
 * Instagram fallback (which can't pre-fill DMs) we copy the message to paste.
 */
export async function openOrder(
  productName: string,
  size?: string
): Promise<OrderChannel> {
  const message = buildOrderMessage(productName, size);
  const useWhatsApp = Boolean(SITE.whatsappNumber);

  if (!useWhatsApp) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(message);
      }
    } catch {
      /* clipboard may be blocked; the DM still opens */
    }
  }

  const url = useWhatsApp ? whatsappUrl(message) : INSTAGRAM_URL;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return useWhatsApp ? "whatsapp" : "instagram";
}
