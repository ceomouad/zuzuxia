import { Globe, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./ScrollReveal";
import { WhatsAppIcon } from "./BrandIcons";

const POINTS = [
  {
    icon: Globe,
    title: "No language barrier",
    text: "Shop entirely in English — no complicated Chinese apps or accounts.",
  },
  {
    icon: ShieldCheck,
    title: "New & second hand",
    text: "Every pair is 100% genuine — pick brand new or a great-value used pair.",
  },
  {
    icon: WhatsAppIcon,
    title: "Support on WhatsApp",
    text: "Real people, fast replies. Order and track everything on WhatsApp.",
  },
];

export function About() {
  return (
    <section id="about" className="container-x scroll-mt-24 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why us"
            title="Why Zu Zu Xia?"
            subtitle="We help athletes and foreigners living in China buy authentic track & field spikes quickly and easily — brand new or second hand. No complicated Chinese apps, no language barriers, and reliable customer support through WhatsApp."
          />
        </div>
        <div className="grid gap-4">
          {POINTS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <div className="card flex items-start gap-4 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <p.icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-[var(--fg-muted)]">{p.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
