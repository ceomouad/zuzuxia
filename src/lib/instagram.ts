import { INSTAGRAM_URL } from "./config";

/**
 * Builds the Instagram deep link for a "Buy Now" click. Instagram does not
 * support pre-filled DM text via URL, so we copy a ready-to-paste message to
 * the clipboard (handled at the call site) and open the profile DM.
 */
export function buildInstagramMessage(productName: string, size?: string): string {
  const sizePart = size ? ` in size ${size}` : "";
  return `Hi! I'm interested in buying the ${productName}${sizePart}. Is it available?`;
}

export function instagramUrl(): string {
  return INSTAGRAM_URL;
}

/**
 * Opens Instagram for the given product. Copies the order message to the
 * clipboard first so the user can paste it straight into the DM.
 */
export async function openInstagramOrder(productName: string, size?: string) {
  const message = buildInstagramMessage(productName, size);
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(message);
    }
  } catch {
    /* clipboard may be blocked; the DM still opens */
  }
  if (typeof window !== "undefined") {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
  }
  return message;
}
