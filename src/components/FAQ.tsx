"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "How much do the spikes cost?",
    a: "The price shown on each pair is a starting price. The final price depends on the model, the condition (brand new or second hand) and the size — we confirm the exact price with you on WhatsApp before you pay.",
  },
  {
    q: "Do you sell new and second-hand spikes?",
    a: "Both. Every pair lists a starting price for new and an approximate second-hand price, so you can pick what fits your budget.",
  },
  {
    q: "How do I order?",
    a: "Click Buy Now on any product to message us on WhatsApp (or DM us on Instagram). We reply fast and confirm price, size, payment and delivery.",
  },
  { q: "How long is shipping?", a: "2–5 days anywhere in China." },
  { q: "Are the spikes authentic?", a: "Yes — every pair is 100% genuine and verified before it ships." },
  { q: "Can I return them?", a: "Yes, within 7 days if unworn and in original condition." },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="container-x scroll-mt-24 py-20 md:py-28">
      <SectionHeading eyebrow="Questions" title="FAQ" />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQS.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={item.q} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-display text-base font-semibold sm:text-lg">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"
                >
                  <Plus size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-5 pb-5 text-sm text-[var(--fg-muted)]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
