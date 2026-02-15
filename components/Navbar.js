"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-40 mx-auto flex w-full items-center justify-between border-b border-border/50 bg-card/50 px-6 py-4 backdrop-blur md:px-12"
    >
      <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
        Shopkeeper Helper
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
        <Link href="#features" className="transition hover:text-primary">
          Features
        </Link>
        <Link href="#how" className="transition hover:text-primary">
          How it works
        </Link>
        <Link href="#testimonials" className="transition hover:text-primary">
          Testimonials
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
        >
          Sign in
        </Link>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
