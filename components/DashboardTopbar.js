"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "../store/useAuthStore";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "Inventory", href: "/dashboard/inventory", icon: "📦" },
  { label: "Purchases", href: "/dashboard/purchases", icon: "🛒" },
  { label: "Selling Price", href: "/dashboard/selling-price", icon: "💰" },
  { label: "Categories", href: "/dashboard/categories", icon: "🏷️" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { label: "Reports", href: "/dashboard/reports", icon: "📄" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" }
];

export default function DashboardTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout: storeLogout } = useAuthStore();

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await storeLogout();
    router.push("/auth/login");
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-foreground shadow-soft">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-1.5 sm:p-2 hover:bg-border/50 transition touch-manipulation"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Welcome back</p>
            <p className="text-sm sm:text-base md:text-lg font-semibold">Your shop pulse today</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard/reports"
            className="rounded-full border border-border px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition hover:border-primary touch-manipulation"
          >
            <span className="hidden sm:inline">Export report</span>
            <span className="sm:hidden">Export</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="sm:hidden">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden rounded-2xl border border-border bg-card p-3 sm:p-4 text-foreground shadow-soft mt-3 sm:mt-4">
          <nav className="grid grid-cols-2 sm:flex sm:flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 sm:gap-3 rounded-xl px-3 py-2.5 sm:py-3 text-xs sm:text-sm transition touch-manipulation ${
                    isActive 
                      ? "bg-primary/20 text-primary font-semibold" 
                      : "hover:bg-border/50"
                  }`}
                >
                  <span className="text-sm sm:text-base">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 sm:mt-4 space-y-2">
            <Link
              href="/dashboard/reports"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center rounded-full border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary touch-manipulation"
            >
              Export Report
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-danger/10 px-4 py-3 text-sm font-semibold text-danger transition hover:bg-danger/20 touch-manipulation"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
