import { Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./ScrollReveal";

const REVIEWS = [
  { quote: "Fast delivery and authentic shoes!", name: "Liam", role: "Exchange student, Shanghai" },
  { quote: "Finally an easy way to buy track spikes in China.", name: "Aïcha", role: "Sprinter, Shenzhen" },
  { quote: "Great prices and amazing customer support.", name: "Marco", role: "Teacher, Beijing" },
];

export function Reviews() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading
        eyebrow="Loved by foreigners"
        title="Reviews"
        subtitle="Trusted by international students, expats and travellers across China."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <ScrollReveal key={r.name} delay={i * 0.08}>
            <figure className="card h-full p-7">
              <div className="flex gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={18} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-4 font-display text-lg font-semibold leading-snug">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/15 font-bold text-brand">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{r.name}</span>
                  <span className="block text-xs text-[var(--fg-muted)]">
                    {r.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
