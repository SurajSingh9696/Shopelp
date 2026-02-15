"use client";

import { useEffect, useState } from "react";
import ChartCard from "../../../components/ChartCard";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { formatCurrency } from "../../../utils/currency";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [status, setStatus] = useState("loading");
  const [period, setPeriod] = useState("6months");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [period, selectedItemId]);

  const loadItems = async () => {
    try {
      const response = await fetch("/api/items", { cache: "no-store" });
      const payload = await response.json();
      if (payload.success) {
        setItems(payload.data);
      }
    } catch (err) {
      console.error("Failed to load items:", err);
    }
  };

  const loadAnalytics = async () => {
    setStatus("loading");
    try {
      let url = `/api/analytics?period=${period}`;
      if (selectedItemId) url += `&itemId=${selectedItemId}`;
      
      const response = await fetch(url, { cache: "no-store" });
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
      <div className="space-y-4 md:space-y-6">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (status === "error" || !analytics) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-foreground shadow-soft">
        Unable to load analytics. Please try again.
      </div>
    );
  }

  const { trends, topItems, totals, ticks } = analytics;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Analytics & Insights</h2>
            <p className="mt-1 text-xs md:text-sm text-muted">
              Detailed trends and performance analysis
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Items</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <ChartCard 
          title="Purchase Trend" 
          data={trends.purchases} 
          dataKey="value" 
          stroke="#10B981"
          xKey="key"
          xTicks={ticks?.purchases}
        />
        <ChartCard
          title="Profit Margin Trend"
          data={trends.margins}
          dataKey="value"
          stroke="#F59E0B"
          xKey="key"
          xTicks={ticks?.margins}
        />
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-soft">
          <h3 className="text-sm md:text-base font-semibold text-foreground">Top Performing Items</h3>
          <p className="text-xs text-muted mt-1">Items with highest profit margins</p>
          {topItems.length === 0 ? (
            <p className="mt-4 text-xs md:text-sm text-muted">No items yet.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-xs md:text-sm text-muted">
              {topItems.map((item) => (
                <li key={item.itemId} className="flex items-center justify-between rounded-xl bg-card/90 p-3">
                  <div>
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="ml-2 text-xs text-muted">
                      Stock: {item.stock} · Value: {formatCurrency(item.stockValue)}
                    </span>
                  </div>
                  <span className="text-primary font-semibold">+{item.margin}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-soft">
          <h3 className="text-sm md:text-base font-semibold text-foreground">Performance Metrics</h3>
          <p className="text-xs text-muted mt-1">Key insights from your data</p>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-sm">
              <span className="text-muted">Total Realized Profit</span>
              <span className="font-semibold text-primary">
                {formatCurrency(totals.totalProfit || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-sm">
              <span className="text-muted">Avg. Profit Margin</span>
              <span className="font-semibold text-foreground">
                {trends.margins.length > 0
                  ? Math.round(
                      trends.margins.reduce((sum, m) => sum + m.value, 0) / trends.margins.length
                    )
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-sm">
              <span className="text-muted">Total Purchases</span>
              <span className="font-semibold text-foreground">
                {trends.purchases.reduce((sum, p) => sum + (p.count || 0), 0)} boxes
              </span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-card/90 p-3 text-sm">
              <span className="text-muted">Items Needing Restock</span>
              <span className={`font-semibold ${totals.lowStockCount > 0 ? 'text-danger' : 'text-muted'}`}>
                {totals.lowStockCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {trends.purchases.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-soft">
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-4">Purchase Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-muted font-medium">Period</th>
                  <th className="text-right py-2 px-2 text-muted font-medium">Boxes</th>
                  <th className="text-right py-2 px-2 text-muted font-medium">Cost</th>
                  <th className="text-right py-2 px-2 text-muted font-medium">Profit</th>
                </tr>
              </thead>
              <tbody>
                {trends.purchases.filter(p => p.count > 0).map((purchase, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-2 px-2 text-foreground">{purchase.label}</td>
                    <td className="py-2 px-2 text-right text-muted">{purchase.count}</td>
                    <td className="py-2 px-2 text-right text-muted">
                      {formatCurrency(purchase.value)}
                    </td>
                    <td className="py-2 px-2 text-right text-primary font-semibold">
                      {formatCurrency(purchase.profit || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
