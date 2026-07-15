import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  return (
    <ScrollReveal
      className={`flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="display text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-[var(--fg-muted)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
