import { Search, Ruler, MousePointerClick, PackageCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./ScrollReveal";
import { WhatsAppIcon } from "./BrandIcons";

const STEPS = [
  { icon: Search, title: "Browse spikes", text: "Explore our curated authentic collection by brand and event." },
  { icon: Ruler, title: "Choose your size", text: "Pick from the available sizes on each pair." },
  { icon: MousePointerClick, title: "Click Buy Now", text: "We prepare your order message instantly." },
  { icon: WhatsAppIcon, title: "Message us on WhatsApp", text: "We confirm price, condition, size, payment & delivery." },
  { icon: PackageCheck, title: "Receive your spikes", text: "Delivered anywhere in China in 2–5 days." },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Simple process"
          title="How It Works"
          subtitle="From browsing to your doorstep in five easy steps."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.08}>
              <div className="card relative flex h-full flex-col items-center gap-3 p-6 text-center">
                <span className="absolute -top-3 right-4 font-display text-sm font-bold text-brand">
                  0{i + 1}
                </span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <s.icon size={24} />
                </span>
                <h3 className="font-display text-base font-bold">{s.title}</h3>
                <p className="text-sm text-[var(--fg-muted)]">{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
