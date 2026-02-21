"use client";

import { useEffect, useMemo, useState } from "react";
import useDebouncedValue from "../../../hooks/useDebouncedValue";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { formatCurrency } from "../../../utils/currency";

const emptyForm = {
  name: "",
  category: "",
  description: "",
  imageUrl: "",
  stock: "0",
  smallPacketsPerBox: "1",
  sellingPricePerSmallPacket: "0",
  unit: "box"
};

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const debouncedQuery = useDebouncedValue(query, 300);

  const loadData = async () => {
    setStatus("loading");
    try {
      const [itemsRes, categoriesRes] = await Promise.all([
        fetch("/api/items", { cache: "no-store" }),
        fetch("/api/categories", { cache: "no-store" })
      ]);
      const itemsPayload = await itemsRes.json();
      const categoriesPayload = await categoriesRes.json();
      if (!itemsPayload.success) {
        throw new Error(itemsPayload.error || "Failed to load inventory");
      }
      if (!categoriesPayload.success) {
        throw new Error(categoriesPayload.error || "Failed to load categories");
      }
      setItems(itemsPayload.data);
      setCategories(categoriesPayload.data || []);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Unable to load inventory");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const categoryOptions = useMemo(() => {
    const fromApi = categories.map((category) => category.name);
    const fromItems = items.map((item) => item.category);
    const unique = new Set([...(fromApi.length ? fromApi : []), ...fromItems]);
    return ["all", ...Array.from(unique).filter(Boolean)];
  }, [categories, items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [items, debouncedQuery, categoryFilter]);

  const lowStockCount = items.filter((item) => item.stock <= 5).length;
  const totalStockValue = items.reduce((sum, item) => 
    sum + ((item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1) * (item.stock || 0)), 0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const payload = {
      ...form,
      stock: Number(form.stock),
      smallPacketsPerBox: Number(form.smallPacketsPerBox),
      sellingPricePerSmallPacket: Number(form.sellingPricePerSmallPacket)
    };

    const url = editingId ? `/api/items/${editingId}` : "/api/items";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!result.success) {
      setError(result.error || "Failed to save item");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    await loadData();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      category: item.category,
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      stock: String(item.stock),
      smallPacketsPerBox: String(item.smallPacketsPerBox),
      sellingPricePerSmallPacket: String(item.sellingPricePerSmallPacket),
      unit: item.unit || "box"
    });
    setEditingId(item._id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const response = await fetch(`/api/items/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!result.success) {
      alert(result.error || "Failed to delete item");
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

  const handleCSVUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResults(null);
    setError("");

    try {
      const text = await file.text();
      const lines = text.split("\n").filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error("CSV file is empty or invalid");
      }

      // Parse CSV - simple parser that handles basic CSV format
      const parseCSVLine = (line) => {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        values.push(current.trim());
        return values;
      };

      const headers = parseCSVLine(lines[0]);
      const items = [];

      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) continue;

        const item = {};
        headers.forEach((header, index) => {
          item[header] = values[index];
        });

        if (item.name && item.category) {
          items.push(item);
        }
      }

      if (items.length === 0) {
        throw new Error("No valid items found in CSV");
      }

      // Send to API
      const response = await fetch("/api/items/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to import items");
      }

      setImportResults(result.data);
      await loadData();
      
      // Reset file input
      event.target.value = "";
    } catch (err) {
      setError(err.message || "Failed to process CSV file");
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    // Check if there are existing items
    if (items.length === 0) {
      // Download empty template
      const link = document.createElement("a");
      link.href = "/inventory-template.csv";
      link.download = "inventory-template.csv";
      link.click();
      return;
    }

    // Export current inventory as CSV
    const headers = ["sku", "name", "category", "description", "stock", "smallPacketsPerBox", "sellingPricePerSmallPacket", "unit"];
    const csvRows = [headers.join(",")];

    items.forEach(item => {
      const row = [
        item.sku || "",
        `"${item.name}"`,
        `"${item.category}"`,
        `"${(item.description || "").replace(/"/g, '""')}"`,
        item.stock || 0,
        item.smallPacketsPerBox || 1,
        item.sellingPricePerSmallPacket || 0,
        item.unit || "box"
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 text-foreground shadow-soft">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold">Inventory Management</h2>
        <p className="mt-2 text-xs sm:text-sm text-muted">
          Track items with big packets (boxes) containing small packets. Set prices per small packet.
          <br />
          <span className="inline-flex items-center gap-1 mt-1">
            💡 <span className="font-medium">Tip:</span> Use CSV import to add multiple items at once. Download the template to get started.
          </span>
        </p>
        <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 lg:gap-4 grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-card p-3 sm:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Low Stock</p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg font-semibold">{lowStockCount} items</p>
          </div>
          <div className="rounded-xl bg-card p-3 sm:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Total Items</p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg font-semibold">{items.length}</p>
          </div>
          <div className="rounded-xl bg-card p-3 sm:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Categories</p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg font-semibold">{categoryOptions.length - 1}</p>
          </div>
          <div className="rounded-xl bg-card p-3 sm:p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Stock Value</p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg font-semibold truncate">{formatCurrency(totalStockValue)}</p>
          </div>
        </div>
      </div>

      {!showForm ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 touch-manipulation min-h-[44px]"
          >
            + Add New Item
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="relative w-full sm:w-auto rounded-full border-2 border-primary bg-card px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 cursor-pointer touch-manipulation min-h-[44px] flex items-center justify-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                disabled={importing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span>{importing ? "Importing..." : "📁 Import CSV"}</span>
            </label>
            
            <button
              onClick={downloadTemplate}
              className="w-full sm:w-auto rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card touch-manipulation min-h-[44px]"
            >
              ⬇️ Download Template
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 text-foreground shadow-soft">
          <h3 className="text-base sm:text-lg font-semibold">
            {editingId ? "Edit Item" : "Add New Item"}
          </h3>
          <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">Item Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                    placeholder="e.g., Organic Rice"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                  >
                    <option value="">Select category</option>
                    {categoryOptions
                      .filter((category) => category !== "all")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                  {categoryOptions.length <= 1 ? (
                    <p className="mt-2 text-xs text-muted">
                      No categories available. <a href="/dashboard/categories" className="text-primary hover:underline">Add categories</a> first.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">Small Packets Per Box *</label>
                  <input
                    name="smallPacketsPerBox"
                    type="number"
                    min="1"
                    value={form.smallPacketsPerBox}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                    placeholder="e.g., 12"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">Selling Price/Small Packet *</label>
                  <input
                    name="sellingPricePerSmallPacket"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.sellingPricePerSmallPacket}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                    placeholder="e.g., 2.50"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">Initial Stock (Boxes) *</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">Unit</label>
                  <input
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                    placeholder="box, carton, etc."
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-[0.2em] text-muted">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                  rows={3}
                  placeholder="Additional details..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-[0.2em] text-muted">Image URL</label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                  placeholder="https://..."
                />
              </div>
              {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
              <div className="sm:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 touch-manipulation min-h-[44px]"
                >
                  {editingId ? "Update Item" : "Save Item"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-full border border-border bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-border/50 touch-manipulation min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {importResults && (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Import Results</h3>
              <div className="mt-3 space-y-2">
                {importResults.created > 0 && (
                  <p className="text-sm">
                    <span className="text-primary font-semibold">✓ {importResults.created} items</span> created
                  </p>
                )}
                {importResults.updated > 0 && (
                  <p className="text-sm">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">↻ {importResults.updated} items</span> updated
                  </p>
                )}
                {importResults.failed > 0 && (
                  <div>
                    <p className="text-sm">
                      <span className="text-danger font-semibold">✗ {importResults.failed} items</span> failed
                    </p>
                    {importResults.details.failed.length > 0 && (
                      <div className="mt-2 text-xs text-muted space-y-1">
                        {importResults.details.failed.map((fail, idx) => (
                          <p key={idx}>• {fail.name}: {fail.error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setImportResults(null)}
              className="text-muted hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base md:text-lg font-semibold">Inventory List</h3>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or SKU"
              className="w-full md:w-64 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 md:mt-6 space-y-3">
          {status === "loading" ? (
            <LoadingSkeleton />
          ) : filteredItems.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">No items found.</p>
          ) : (
            filteredItems.map((item) => {
              const sellingPricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
              const stockValue = sellingPricePerBox * (item.stock || 0);
              
              return (
                <div
                  key={item._id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card/90 p-4 text-sm text-muted md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    <p className="text-base font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted mt-1">
                      {item.category} · SKU: {item.sku}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      <span>
                        Stock: <span className={item.stock <= 5 ? "text-danger font-semibold" : "text-primary"}>{item.stock} {item.unit}s</span>
                      </span>
                      <span>{item.smallPacketsPerBox} pkts/{item.unit}</span>
                      <span>{formatCurrency(item.sellingPricePerSmallPacket)}/pkt</span>
                      <span className="text-primary">{formatCurrency(sellingPricePerBox)}/{item.unit}</span>
                      <span className="text-muted">Value: {formatCurrency(stockValue)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-lg bg-warning/15 px-4 py-2 text-xs font-semibold text-warning transition hover:bg-warning/25"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="rounded-lg bg-danger/15 px-4 py-2 text-xs font-semibold text-danger transition hover:bg-danger/25"
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
