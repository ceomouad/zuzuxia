import type { SVGProps } from "react";

/**
 * Zu Zu Xia emblem — a white leaping athlete inside an electric-blue disc,
 * recreated from the brand logo. Scales cleanly from favicon to hero size.
 */
export function BrandLogo({
  className,
  title = "Zu Zu Xia",
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="zzx-disc" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#41ABF6" />
          <stop offset="55%" stopColor="#0E90EC" />
          <stop offset="100%" stopColor="#0A6FBE" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#zzx-disc)" />
      <circle
        cx="60"
        cy="60"
        r="57"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      {/* Leaping athlete */}
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M99 41 L64 52 L56 75" />
        <path d="M64 52 L42 60 L37 73" />
        <path d="M56 75 L71 81 L64 97" />
        <path d="M56 75 L33 81 L18 87" />
      </g>
      <circle cx="76" cy="39" r="10.5" fill="#ffffff" />
    </svg>
  );
}
