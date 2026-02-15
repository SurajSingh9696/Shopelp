"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-border bg-gradient-to-br from-emerald-400/20 via-slate-900/50 to-emerald-300/10 p-10 text-foreground"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Ready to start
          </p>
          <h3 className="mt-3 text-3xl font-semibold">
            Bring calm and clarity to your shop operations.
          </h3>
          <p className="mt-2 text-sm text-muted">
            Get inventory control, pricing, profit analytics, and export-ready reports.
          </p>
        </div>
        <Link
          href="/auth/register"
          className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-emerald-200"
        >
          Create account
        </Link>
      </div>
    </motion.section>
  );
}
