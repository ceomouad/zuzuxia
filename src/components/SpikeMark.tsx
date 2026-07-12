/**
 * Zu Zu Xia brand mark — a stylized track & field sprint spike (side profile,
 * toe pointing left) with spikes and a speed stripe. Uses currentColor so it
 * inherits the surrounding text/badge color.
 */
export function SpikeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* shoe upper + sole */}
      <path
        d="M5 35.5C11 29.8 17.5 26.4 27 25.2c6.4-.8 12.8-1.9 19.2-4 3.6-1.2 7.4-.6 9.6 2.1 1.8 2.2 1.7 5-.2 6.8-2.1 2-5 3-8 3.4l-33.4 4.2z"
        fill="currentColor"
      />
      <path
        d="M9 39.5h39c2.6 0 4 1.2 4 3.2 0 2-1.6 3.3-4.2 3.3H14c-3.4 0-6-1.3-7.6-3.9-.7-1.1 0-2.6 2.6-2.6z"
        fill="currentColor"
      />
      {/* speed stripe (negative space) */}
      <path
        d="M13 34.2c8-3.4 17-5 27.5-5.2"
        stroke="#D4AF37"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* spikes */}
      <path
        d="M15 46l-2.2 6 4.4 0zM24 46l-2.2 6 4.4 0zM33 46l-2.2 6 4.4 0zM42 46l-2.2 6 4.4 0z"
        fill="currentColor"
      />
    </svg>
  );
}
