"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    title: "Add inventory",
    description: "Create SKUs, categorize items, and set starting stock in minutes."
  },
  {
    title: "Log purchases",
    description: "Capture wholesale lists and let the system compute item costs."
  },
  {
    title: "Set selling prices",
    description: "Update prices as markets shift and track margins instantly."
  },
  {
    title: "Analyze profit",
    description: "Review trends, compare months, and export polished reports."
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="space-y-10">
      <SectionHeader
        eyebrow="Clear workflow"
        title="From purchase list to profit insights"
        description="Designed for busy shopkeepers. Every action leads to measurable profit clarity."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Step {index + 1}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
