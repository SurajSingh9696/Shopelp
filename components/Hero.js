"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const highlights = [
  "Inventory & pricing clarity",
  "Wholesale cost tracking",
  "Profit insights in real time",
  "Premium analytics dashboards"
];

export default function Hero() {
  return (
    <section className="grid items-center gap-12 md:grid-cols-2">
      <div className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-primary"
        >
          Smart shopkeeping platform
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-semibold text-foreground md:text-6xl"
        >
          Run your shop with calm precision and higher margins.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted"
        >
          Shopelp tracks costs, selling prices, and profits in one place.
          Stay ahead with clean dashboards, visual trends, and instant PDF reports.
        </motion.p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/auth/register"
            className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-emerald-300"
          >
            Start free
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            View dashboard
          </Link>
        </div>
        <div className="grid gap-2 text-sm text-muted">
          {highlights.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="gradient-border"
      >
        <div className="card p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Monthly snapshot</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                +18% margin
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-card p-4 text-foreground">
                <p className="text-xs text-muted">Revenue</p>
                <p className="text-2xl font-semibold">$42,500</p>
              </div>
              <div className="rounded-xl bg-slate-100 p-4 text-slate-900">
                <p className="text-xs text-slate-500">Net profit</p>
                <p className="text-2xl font-semibold">$8,920</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 text-slate-700">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Low stock</p>
              <p className="text-lg font-semibold">Tea Leaves · 12 left</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
