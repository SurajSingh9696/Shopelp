"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Grocery owner",
    quote:
      "I used to guess margins. Now I know exactly what to reorder and which items to push."
  },
  {
    name: "Dinesh Patel",
    role: "Wholesale retailer",
    quote: "The purchase list feature is gold. Pricing updates are fast and consistent."
  },
  {
    name: "Mari Santos",
    role: "Corner shop manager",
    quote: "The dashboards look like a premium finance tool. My accountant loves the PDFs."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="space-y-10">
      <SectionHeader
        eyebrow="Trusted stories"
        title="Small shops, confident decisions"
        description="Built for the real-world workflow of independent retailers."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-border bg-card/80 p-6 text-foreground shadow-soft"
          >
            <p className="text-base">"{item.quote}"</p>
            <p className="mt-4 text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-muted">{item.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
