/**
 * Running-track lane lines — a signature Zu Zu Xia graphic device.
 * Concentric arcs evoke the bend of an athletics track. Purely decorative;
 * inherits `currentColor` so callers control the tint via text color.
 */
export function LaneLines({
  className,
  lanes = 7,
}: {
  className?: string;
  lanes?: number;
}) {
  const rings = Array.from({ length: lanes }, (_, i) => 150 - i * 20);
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="160"
          cy="160"
          r={r}
          stroke="currentColor"
          strokeWidth={i === 2 ? 3 : 1.5}
          strokeOpacity={i === 2 ? 0.9 : 0.4}
        />
      ))}
    </svg>
  );
}
