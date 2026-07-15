import type { ImgHTMLAttributes } from "react";

/**
 * Zu Zu Xia emblem — the real brand mark (white leaping athlete in an electric
 * blue disc), cropped from the logo. Sized via `className` (e.g. `h-9 w-9`).
 */
export function BrandLogo({
  className,
  alt = "Zu Zu Xia",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-mark.png"
      alt={alt}
      className={className}
      draggable={false}
      {...props}
    />
  );
}
