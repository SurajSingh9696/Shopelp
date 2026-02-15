"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const features = [
  {
    title: "Inventory intelligence",
    description: "Monitor stock, get low stock alerts, and classify items by profit impact."
  },
  {
    title: "Wholesale tracking",
    description: "Log purchases, auto-calc per item cost, and spot rising supplier prices."
  },
  {
    title: "Pricing control",
    description: "Update selling prices, set bulk offers, and see margin impact instantly."
  },
  {
    title: "Profit analytics",
    description: "Track best and worst performers with weekly, monthly, and yearly views."
  },
  {
    title: "Reports on demand",
    description: "Export PDF summaries that keep your accountant and partners aligned."
  },
  {
    title: "Secure access",
    description: "JWT auth, protected routes, and secure access tokens by default."
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="space-y-10">
      <SectionHeader
        eyebrow="Everything in one hub"
        title="Tools that keep your margins predictable"
        description="A modern shopkeeper stack that covers inventory, pricing, purchasing, analytics, and export-ready reports."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-2xl border border-border bg-card/50 p-6 shadow-soft backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
