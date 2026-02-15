"use client";

import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { formatCurrency } from "../../utils/currency";
import Link from "next/link";

export default function DashboardOverview() {
  const [analytics, setAnalytics] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setStatus("loading");
    try {
      const response = await fetch(`/api/analytics?period=month`, { cache: "no-store" });
      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.error || "Failed to load analytics");
      }
      setAnalytics(payload.data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "loading") {
    return (
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (status === "error" || !analytics) {
    return (
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 text-foreground shadow-soft">
        Unable to load analytics. Please try again.
      </div>
    );
  }

  const { totals, trends, topItems } = analytics;

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 text-foreground shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold">Dashboard Overview</h2>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              Quick snapshot of your business
            </p>
          </div>
          <Link
            href="/dashboard/analytics"
            className="rounded-full bg-primary/10 px-4 py-3 text-xs sm:text-sm font-medium text-primary transition hover:bg-primary/20 touch-manipulation min-h-[44px] flex items-center justify-center self-start sm:self-auto"
          >
            View Analytics →
          </Link>
        </div>
      </div>

      <div className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total Items" value={`${totals.itemCount}`} />
        <StatCard label="Purchase Value" value={formatCurrency(totals.purchaseValue)} />
        <StatCard label="Stock Value" value={formatCurrency(totals.salesValue)} />
        <StatCard
          label="Estimated Profit"
          value={formatCurrency(totals.netProfit)}
          tone="ember"
        />
        <StatCard 
          label="Low Stock Alert" 
          value={`${totals.lowStockCount} items`}
          tone={totals.lowStockCount > 0 ? "ember" : "default"}
        />
      </div>

      <div className="grid gap-3 sm:gap-4 lg:gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 shadow-soft">
          <h3 className="text-sm sm:text-base font-semibold text-foreground">Top Performing Items</h3>
          <p className="text-xs text-muted mt-1">Items with highest profit margins</p>
          {topItems.length === 0 ? (
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted">No items yet.</p>
          ) : (
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted">
              {topItems.map((item) => (
                <li key={item.itemId} className="flex items-center justify-between rounded-xl bg-card/90 p-3">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground block truncate">{item.name}</span>
                    <span className="text-xs text-muted block mt-0.5">
                      Stock: {item.stock} · Value: {formatCurrency(item.stockValue)}
                    </span>
                  </div>
                  <span className="text-primary font-semibold ml-2 text-xs sm:text-sm">+{item.margin}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 shadow-soft">
          <h3 className="text-sm sm:text-base font-semibold text-foreground">Quick Stats</h3>
          <p className="text-xs text-muted mt-1">Key performance indicators</p>
          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-xs sm:text-sm">
              <span className="text-muted">Total Realized Profit</span>
              <span className="font-semibold text-primary truncate ml-2">
                {formatCurrency(totals.totalProfit || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-xs sm:text-sm">
              <span className="text-muted">Avg. Profit Margin</span>
              <span className="font-semibold text-foreground ml-2">
                {trends.margins.length > 0
                  ? Math.round(
                      trends.margins.reduce((sum, m) => sum + m.value, 0) / trends.margins.length
                    )
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-xs sm:text-sm">
              <span className="text-muted">Total Purchases</span>
              <span className="font-semibold text-foreground ml-2">
                {trends.purchases.reduce((sum, p) => sum + (p.count || 0), 0)} boxes
              </span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-xs sm:text-sm">
              <span className="text-muted">Items Needing Restock</span>
              <span className={`font-semibold ml-2 ${totals.lowStockCount > 0 ? 'text-danger' : 'text-muted'}`}>
                {totals.lowStockCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
