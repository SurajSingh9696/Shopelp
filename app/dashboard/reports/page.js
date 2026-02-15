"use client";

import { useState, useEffect } from "react";
import { generateProfitReport, generateInventoryReport, generatePurchaseReport } from "../../../utils/pdf";

export default function ReportsPage() {
  const [status, setStatus] = useState("idle");
  const [items, setItems] = useState([]);
  const [reportType, setReportType] = useState("profit");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

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

  const handleDownload = async () => {
    setStatus("loading");
    setError("");
    
    try {
      let url = `/api/reports?type=${reportType}`;
      if (selectedItemId) url += `&itemId=${selectedItemId}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const response = await fetch(url, { cache: "no-store" });
      const payload = await response.json();
      
      if (!payload.success) {
        throw new Error(payload.error || "Failed to generate report");
      }

      if (payload.data.length === 0) {
        setError("No data available for the selected filters.");
        setStatus("error");
        return;
      }

      // Generate the appropriate PDF based on report type
      if (reportType === "profit") {
        generateProfitReport(payload.data);
      } else if (reportType === "inventory") {
        generateInventoryReport(payload.data);
      } else if (reportType === "purchases") {
        generatePurchaseReport(payload.data);
      }

      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setError(err.message || "Unable to generate report");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h2 className="text-lg md:text-xl font-semibold">Reports & Export</h2>
        <p className="mt-2 text-xs md:text-sm text-muted">
          Generate comprehensive PDF reports with customizable filters for profit analysis, inventory overview, and purchase history.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Report Configuration</h3>
        
        <div className="grid gap-4 md:gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Report Type *</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="profit">Profit Margin Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="purchases">Purchase History Report</option>
            </select>
            <p className="mt-2 text-xs text-muted">
              {reportType === "profit" && "Shows cost, selling price, profit margin, and stock for all items"}
              {reportType === "inventory" && "Complete inventory list with stock levels and values"}
              {reportType === "purchases" && "Detailed purchase history with profit calculations"}
            </p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Filter by Item (Optional)</label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Items</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {reportType === "purchases" && (
            <>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">Start Date (Optional)</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">End Date (Optional)</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-danger/10 border border-danger/20 p-4">
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}

        {status === "success" && (
          <div className="mt-4 rounded-xl bg-primary/10 border border-primary/20 p-4">
            <p className="text-sm text-primary">✓ Report downloaded successfully!</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleDownload}
          disabled={status === "loading"}
          className="mt-6 w-full md:w-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating report...
            </span>
          ) : (
            "📄 Download PDF Report"
          )}
        </button>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/20 p-3">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Profit Report</h4>
              <p className="text-xs text-muted mt-1">Margins & profitability</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/15 p-3">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Inventory Report</h4>
              <p className="text-xs text-muted mt-1">Stock levels & values</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-500/20 p-3">
              <svg className="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Purchase Report</h4>
              <p className="text-xs text-muted mt-1">Complete purchase history</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h3 className="text-base font-semibold mb-3">Report Features</h3>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Comprehensive data tables with all key metrics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Filter by item or date range for focused analysis</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Automatic calculations for profits, margins, and values</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Professional PDF format ready for printing or sharing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Timestamped generation for accurate record-keeping</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
