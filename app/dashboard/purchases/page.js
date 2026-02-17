"use client";

import { useEffect, useMemo, useState } from "react";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { formatCurrency } from "../../../utils/currency";

const emptyLineItem = {
  itemId: "",
  quantity: "",
  totalCost: ""
};

const emptyForm = {
  date: new Date().toISOString().split("T")[0],
  notes: "",
  lineItems: [emptyLineItem]
};

export default function PurchasesPage() {
  const [items, setItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterItemId, setFilterItemId] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [expandedPurchases, setExpandedPurchases] = useState(new Set());

  const loadData = async () => {
    setStatus("loading");
    try {
      let purchaseUrl = "/api/purchases?";
      if (filterItemId) purchaseUrl += `itemId=${filterItemId}&`;
      if (filterPeriod !== "all") {
        const now = new Date();
        let startDate = new Date();
        if (filterPeriod === "week") startDate.setDate(now.getDate() - 7);
        else if (filterPeriod === "month") startDate.setMonth(now.getMonth() - 1);
        else if (filterPeriod === "year") startDate.setFullYear(now.getFullYear() - 1);
        purchaseUrl += `startDate=${startDate.toISOString()}`;
      }

      const [itemsRes, purchasesRes] = await Promise.all([
        fetch("/api/items", { cache: "no-store" }),
        fetch(purchaseUrl, { cache: "no-store" })
      ]);
      const itemsPayload = await itemsRes.json();
      const purchasesPayload = await purchasesRes.json();
      if (!itemsPayload.success) {
        throw new Error(itemsPayload.error || "Failed to load items");
      }
      if (!purchasesPayload.success) {
        throw new Error(purchasesPayload.error || "Failed to load purchases");
      }
      setItems(itemsPayload.data);
      setPurchases(purchasesPayload.data);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Unable to load purchases");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadData();
    // Reset expanded state when filters change
    setExpandedPurchases(new Set());
  }, [filterItemId, filterPeriod]);

  const itemMap = useMemo(
    () => new Map(items.map((item) => [item._id, item])),
    [items]
  );

  const totalPurchaseValue = purchases.reduce((sum, purchase) => sum + (purchase.totalCost || 0), 0);
  const totalProfitPotential = purchases.reduce((sum, purchase) => {
    if (Number.isFinite(purchase.totalProfit)) return sum + purchase.totalProfit;
    const legacyProfit = (purchase.profitPerBox || 0) * (purchase.quantity || 0);
    const lineProfit = (purchase.lineItems || []).reduce(
      (lineSum, line) => lineSum + (line.profitPerBox || 0) * (line.quantity || 0),
      0
    );
    return sum + (lineProfit || legacyProfit || 0);
  }, 0);

  const handleLineItemChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.lineItems];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, lineItems: updated };
    });
  };

  const addLineItem = () => {
    setForm((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, { ...emptyLineItem }]
    }));
  };

  const removeLineItem = (index) => {
    setForm((prev) => {
      const updated = prev.lineItems.filter((_, i) => i !== index);
      return { ...prev, lineItems: updated.length ? updated : [{ ...emptyLineItem }] };
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const lineItems = form.lineItems
      .filter((line) => line.itemId && line.quantity && line.totalCost)
      .map((line) => ({
        itemId: line.itemId,
        quantity: Number(line.quantity),
        totalCost: Number(line.totalCost)
      }));

    if (!lineItems.length) {
      setError("Add at least one item to the purchase.");
      return;
    }

    const payload = {
      date: form.date,
      notes: form.notes,
      lineItems
    };

    const url = editingId ? `/api/purchases/${editingId}` : "/api/purchases";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!result.success) {
      setError(result.error || "Failed to save purchase");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    await loadData();
    // Reset expanded state when adding/updating purchases so new ones appear collapsed
    setExpandedPurchases(new Set());
  };

  const normalizeLineItems = (purchase) => {
    if (Array.isArray(purchase.lineItems) && purchase.lineItems.length > 0) {
      return purchase.lineItems.map((line) => ({
        itemId: line.itemId?.toString() || line.itemId,
        quantity: String(line.quantity || ""),
        totalCost: String(line.totalCost || "")
      }));
    }
    return [
      {
        itemId: purchase.itemId?.toString() || purchase.itemId || "",
        quantity: String(purchase.quantity || ""),
        totalCost: String(purchase.totalCost || "")
      }
    ];
  };

  const handleEdit = (purchase) => {
    setForm({
      date: new Date(purchase.date).toISOString().split("T")[0],
      notes: purchase.notes || "",
      lineItems: normalizeLineItems(purchase)
    });
    setEditingId(purchase._id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this purchase record?")) return;

    const response = await fetch(`/api/purchases/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!result.success) {
      alert(result.error || "Failed to delete purchase");
      return;
    }

    await loadData();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const togglePurchaseExpanded = (purchaseId) => {
    setExpandedPurchases((prev) => {
      const next = new Set(prev);
      if (next.has(purchaseId)) {
        next.delete(purchaseId);
      } else {
        next.add(purchaseId);
      }
      return next;
    });
  };

  const calculateLineItem = (line) => {
    const item = itemMap.get(line.itemId);
    if (!item || !line.quantity || !line.totalCost) return null;

    const quantity = Number(line.quantity);
    const totalCost = Number(line.totalCost);
    const perItemCost = totalCost / quantity;
    const sellingPricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
    const profitPerBox = sellingPricePerBox - perItemCost;
    const totalProfit = profitPerBox * quantity;

    return {
      perItemCost,
      sellingPricePerBox,
      profitPerBox,
      totalProfit
    };
  };

  if (status === "loading") {
    return (
      <div className="space-y-4 md:space-y-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-danger shadow-soft">
        {error || "Unable to load purchases."}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h2 className="text-lg md:text-xl font-semibold">Purchase Tracking</h2>
        <p className="mt-2 text-xs md:text-sm text-muted">
          Add multiple items in one purchase. The system calculates profits per item automatically.
        </p>
        <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3">
          <div className="rounded-xl bg-card p-3 md:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Total Purchases</p>
            <p className="mt-2 text-base md:text-lg font-semibold">{purchases.length}</p>
          </div>
          <div className="rounded-xl bg-card p-3 md:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Purchase Value</p>
            <p className="mt-2 text-base md:text-lg font-semibold">{formatCurrency(totalPurchaseValue)}</p>
          </div>
          <div className="rounded-xl bg-card p-3 md:p-4 col-span-2 md:col-span-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Profit Potential</p>
            <p className="mt-2 text-base md:text-lg font-semibold text-primary">{formatCurrency(totalProfitPotential)}</p>
          </div>
        </div>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          + Add New Purchase
        </button>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
          <h3 className="text-base md:text-lg font-semibold">
            {editingId ? "Edit Purchase" : "Add New Purchase"}
          </h3>
          <form onSubmit={handleSubmit} className="mt-4 md:mt-6 space-y-4">
            <div className="grid gap-3 md:grid-cols-1">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">Date *</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-3">
              {form.lineItems.map((line, index) => {
                const calculations = calculateLineItem(line);
                return (
                  <div key={index} className="rounded-xl border border-border bg-card/80 p-4">
                    <div className="grid gap-3 md:grid-cols-4">
                      <div className="md:col-span-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-muted">Item *</label>
                        <select
                          value={line.itemId}
                          onChange={(event) => handleLineItemChange(index, "itemId", event.target.value)}
                          required
                          className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select item</option>
                          {items.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name} ({item.smallPacketsPerBox} pkts/box)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted">Quantity *</label>
                        <input
                          type="number"
                          min="1"
                          value={line.quantity}
                          onChange={(event) => handleLineItemChange(index, "quantity", event.target.value)}
                          required
                          className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                          placeholder="Boxes"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted">Total Cost *</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={line.totalCost}
                          onChange={(event) => handleLineItemChange(index, "totalCost", event.target.value)}
                          required
                          className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                          placeholder="Amount"
                        />
                      </div>
                    </div>

                    {calculations ? (
                      <div className="mt-3 grid gap-2 rounded-lg bg-primary/10 p-3 text-xs text-foreground grid-cols-2 sm:grid-cols-4">
                        <div>
                          <span className="text-muted">Cost/Box</span>
                          <p className="font-semibold truncate">{formatCurrency(calculations.perItemCost)}</p>
                        </div>
                        <div>
                          <span className="text-muted">Sell/Box</span>
                          <p className="font-semibold truncate">{formatCurrency(calculations.sellingPricePerBox)}</p>
                        </div>
                        <div>
                          <span className="text-muted">Profit/Box</span>
                          <p className="font-semibold text-primary truncate">{formatCurrency(calculations.profitPerBox)}</p>
                        </div>
                        <div>
                          <span className="text-muted">Total Profit</span>
                          <p className="font-semibold text-primary truncate">{formatCurrency(calculations.totalProfit)}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeLineItem(index)}
                        className="rounded-lg bg-danger/15 px-4 py-3 text-xs font-semibold text-danger transition hover:bg-danger/25 touch-manipulation min-h-[44px]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addLineItem}
              className="w-full rounded-full border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-border/40 touch-manipulation min-h-[44px]"
            >
              + Add Another Item
            </button>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none touch-manipulation"
                rows={2}
                placeholder="Optional notes..."
              />
            </div>

            {error ? <p className="text-sm text-danger">{error}</p> : null}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
              <button
                type="submit"
                className="w-full sm:flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 touch-manipulation min-h-[44px]"
              >
                {editingId ? "Update Purchase" : "Record Purchase"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card touch-manipulation min-h-[44px]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base md:text-lg font-semibold">Purchase History</h3>
          <div className="flex flex-col gap-3 md:flex-row">
            <select
              value={filterItemId}
              onChange={(e) => setFilterItemId(e.target.value)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Items</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        <div className="mt-4 md:mt-6 space-y-3">
          {status === "loading" ? (
            <LoadingSkeleton />
          ) : purchases.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">No purchases yet.</p>
          ) : (
            purchases.map((purchase) => {
              const itemsList = purchase.lineItems?.length
                ? purchase.lineItems
                : [
                    {
                      itemId: purchase.itemId,
                      quantity: purchase.quantity,
                      totalCost: purchase.totalCost,
                      perItemCost: purchase.perItemCost,
                      sellingPricePerBox: purchase.sellingPricePerBox,
                      profitPerBox: purchase.profitPerBox,
                      profitMarginPercent: purchase.profitMarginPercent
                    }
                  ];

              const totalBoxes = purchase.totalBoxes || itemsList.reduce((sum, line) => sum + (line.quantity || 0), 0);
              const totalProfit = Number.isFinite(purchase.totalProfit)
                ? purchase.totalProfit
                : itemsList.reduce((sum, line) => sum + (line.profitPerBox || 0) * (line.quantity || 0), 0);

              const isExpanded = expandedPurchases.has(purchase._id);
              const displayedItems = isExpanded ? itemsList : itemsList.slice(0, 2);
              const hasMoreItems = itemsList.length > 2;

              return (
                <div
                  key={purchase._id}
                  className="flex flex-col gap-3 sm:gap-4 rounded-2xl border border-border bg-card/90 p-3 sm:p-4 text-sm text-muted"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-foreground">Purchase on {new Date(purchase.date).toLocaleDateString()}</p>
                      <p className="text-xs text-muted mt-1">
                        {itemsList.length} items · {totalBoxes} boxes · {formatCurrency(purchase.totalCost)}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      Profit: {formatCurrency(totalProfit)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {displayedItems.map((line, index) => {
                      const item = itemMap.get(line.itemId?.toString?.() || line.itemId);
                      return (
                        <div
                          key={`${purchase._id}-${index}`}
                          className="flex flex-col gap-2 rounded-xl border border-border bg-card/80 p-3 text-xs sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {item?.name || "Unknown item"}
                            </p>
                            <p className="text-xs text-muted">
                              {line.quantity} boxes · Cost/Box {formatCurrency(line.perItemCost || 0)}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-muted">
                            <span>Line Cost: {formatCurrency(line.totalCost || 0)}</span>
                            <span>Sell/Box: {formatCurrency(line.sellingPricePerBox || 0)}</span>
                            <span className="text-primary">
                              Profit/Box: {formatCurrency(line.profitPerBox || 0)}
                              {line.profitMarginPercent ? ` (${line.profitMarginPercent}%)` : ""}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {hasMoreItems && (
                    <button
                      onClick={() => togglePurchaseExpanded(purchase._id)}
                      className="text-xs text-primary font-semibold hover:underline self-start"
                    >
                      {isExpanded ? (
                        <>
                          <span>▲ Show Less</span>
                        </>
                      ) : (
                        <>
                          <span>▼ Show {itemsList.length - 2} More Items</span>
                        </>
                      )}
                    </button>
                  )}

                  {purchase.notes ? (
                    <p className="text-xs text-muted italic">{purchase.notes}</p>
                  ) : null}

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleEdit(purchase)}
                      className="rounded-lg bg-warning/15 px-4 py-3 text-xs font-semibold text-warning transition hover:bg-warning/25 touch-manipulation min-h-[44px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(purchase._id)}
                      className="rounded-lg bg-danger/15 px-4 py-3 text-xs font-semibold text-danger transition hover:bg-danger/25 touch-manipulation min-h-[44px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
