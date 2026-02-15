"use client";

import { useEffect, useMemo, useState } from "react";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { formatCurrency } from "../../../utils/currency";

const emptyForm = {
  itemId: "",
  sellingPricePerSmallPacket: "",
  notes: ""
};

export default function SellingPricePage() {
  const [items, setItems] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");

  const loadData = async () => {
    setStatus("loading");
    try {
      const historyUrl = selectedItemId 
        ? `/api/price-history?itemId=${selectedItemId}`
        : "/api/price-history";

      const [itemsRes, historyRes] = await Promise.all([
        fetch("/api/items", { cache: "no-store" }),
        fetch(historyUrl, { cache: "no-store" })
      ]);
      const itemsPayload = await itemsRes.json();
      const historyPayload = await historyRes.json();
      if (!itemsPayload.success) {
        throw new Error(itemsPayload.error || "Failed to load items");
      }
      if (!historyPayload.success) {
        throw new Error(historyPayload.error || "Failed to load price history");
      }
      setItems(itemsPayload.data);
      setPriceHistory(historyPayload.data);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Unable to load data");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedItemId]);

  const itemMap = useMemo(
    () => new Map(items.map((item) => [item._id, item])),
    [items]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    
    const payload = {
      itemId: form.itemId,
      sellingPricePerSmallPacket: Number(form.sellingPricePerSmallPacket),
      notes: form.notes
    };

    const response = await fetch("/api/price-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!result.success) {
      setError(result.error || "Failed to update price");
      return;
    }
    setForm(emptyForm);
    await loadData();
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h2 className="text-lg md:text-xl font-semibold">Selling Price Management</h2>
        <p className="mt-2 text-xs md:text-sm text-muted">
          Update selling prices per small packet. All changes are tracked with date stamps for historical analysis.
        </p>
        <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3">
          <div className="rounded-xl bg-card p-3 md:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Total Items</p>
            <p className="mt-2 text-base md:text-lg font-semibold">{items.length}</p>
          </div>
          <div className="rounded-xl bg-card p-3 md:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Price Updates</p>
            <p className="mt-2 text-base md:text-lg font-semibold">{priceHistory.length}</p>
          </div>
          <div className="rounded-xl bg-card p-3 md:p-4 col-span-2 md:col-span-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Priced Items</p>
            <p className="mt-2 text-base md:text-lg font-semibold">
              {items.filter(i => i.sellingPricePerSmallPacket > 0).length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h3 className="text-base md:text-lg font-semibold">Update Selling Price</h3>
        <form onSubmit={handleSubmit} className="mt-4 md:mt-6 grid gap-3 md:gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Select Item *</label>
            <select
              name="itemId"
              value={form.itemId}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select item to update price</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} - Current: {formatCurrency(item.sellingPricePerSmallPacket)}/pkt
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">New Price Per Small Packet *</label>
            <input
              name="sellingPricePerSmallPacket"
              type="number"
              min="0"
              step="0.01"
              value={form.sellingPricePerSmallPacket}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., 2.50"
            />
          </div>
          {form.itemId && form.sellingPricePerSmallPacket && (
            <div className="md:col-span-2 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Calculated Values</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {itemMap.get(form.itemId) && (
                  <>
                    <div>
                      <span className="text-muted">Current Price/Pkt:</span>
                      <span className="ml-2 text-foreground font-semibold">
                        {formatCurrency(itemMap.get(form.itemId).sellingPricePerSmallPacket)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted">New Price/Pkt:</span>
                      <span className="ml-2 text-primary font-semibold">
                        {formatCurrency(Number(form.sellingPricePerSmallPacket))}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted">Pkts per Box:</span>
                      <span className="ml-2 text-foreground font-semibold">
                        {itemMap.get(form.itemId).smallPacketsPerBox}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted">New Price/Box:</span>
                      <span className="ml-2 text-primary font-semibold">
                        {formatCurrency(Number(form.sellingPricePerSmallPacket) * itemMap.get(form.itemId).smallPacketsPerBox)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Notes (Optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
              placeholder="Reason for price change..."
            />
          </div>
          {error ? <p className="text-sm text-danger md:col-span-2">{error}</p> : null}
          <button
            type="submit"
            className="md:col-span-2 rounded-full bg-primary px-4 py-2.5 md:py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Update Price & Save to History
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base md:text-lg font-semibold">Current Prices</h3>
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Items</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 md:mt-6 space-y-3">
          {status === "loading" ? (
            <LoadingSkeleton />
          ) : items.filter(item => !selectedItemId || item._id === selectedItemId).length === 0 ? (
            <p className="text-sm text-muted text-center py-8">No items found.</p>
          ) : (
            items
              .filter(item => !selectedItemId || item._id === selectedItemId)
              .map((item) => {
                const pricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
                return (
                  <div
                    key={item._id}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-card/90 p-4 text-sm text-muted md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-base font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted mt-1">
                        {item.category} · {item.smallPacketsPerBox} packets per {item.unit}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        <span className="text-primary font-semibold">
                          {formatCurrency(item.sellingPricePerSmallPacket)}/packet
                        </span>
                        <span>
                          {formatCurrency(pricePerBox)}/{item.unit}
                        </span>
                        <span className="text-muted">
                          Stock: {item.stock} {item.unit}s
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h3 className="text-base md:text-lg font-semibold">Price Change History</h3>
        <p className="mt-2 text-xs text-muted">
          Track all selling price updates with timestamps
        </p>

        <div className="mt-4 md:mt-6 space-y-3">
          {status === "loading" ? (
            <LoadingSkeleton />
          ) : priceHistory.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">No price history yet.</p>
          ) : (
            priceHistory.map((history) => {
              const item = itemMap.get(history.itemId);
              return (
                <div
                  key={history._id}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card/90 p-4 text-sm text-muted"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {item?.name || "Unknown item"}
                      </p>
                      <p className="text-xs text-muted mt-1">
                        {new Date(history.effectiveDate).toLocaleDateString()} at {new Date(history.effectiveDate).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="text-primary font-semibold">
                      {formatCurrency(history.sellingPricePerSmallPacket)}/pkt
                    </span>
                  </div>
                  {history.notes && (
                    <p className="text-xs text-muted italic mt-1">{history.notes}</p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
