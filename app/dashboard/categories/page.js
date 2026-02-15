"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: ""
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadCategories = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/categories", { cache: "no-store" });
      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.error || "Failed to load categories");
      }
      setCategories(payload.data);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Unable to load categories");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const result = await response.json();
    if (!result.success) {
      setError(result.error || "Failed to save category");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    await loadCategories();
  };

  const handleEdit = (category) => {
    setForm({
      name: category.name,
      description: category.description || ""
    });
    setEditingId(category._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!result.success) {
      alert(result.error || "Failed to delete category");
      return;
    }

    await loadCategories();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
        <h2 className="text-lg md:text-xl font-semibold">Category Management</h2>
        <p className="mt-2 text-xs md:text-sm text-muted">
          Create categories to keep items organized across inventory and purchases.
        </p>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          + Add New Category
        </button>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft">
          <h3 className="text-base md:text-lg font-semibold">
            {editingId ? "Edit Category" : "Add New Category"}
          </h3>
          <form onSubmit={handleSubmit} className="mt-4 md:mt-6 grid gap-3 md:gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Grains"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Optional notes for this category"
              />
            </div>
            {error ? <p className="text-sm text-danger md:col-span-2">{error}</p> : null}
            <div className="md:col-span-2 flex flex-col gap-2 md:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-full bg-primary px-4 py-2.5 md:py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {editingId ? "Update Category" : "Save Category"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-full border border-border px-4 py-2.5 md:py-3 text-sm font-semibold text-foreground transition hover:bg-border/40"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {status === "error" ? (
        <div className="rounded-2xl border border-border bg-card p-4 text-danger shadow-soft">
          {error}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-soft">
          <h3 className="text-sm md:text-base font-semibold text-foreground">All Categories</h3>
          {categories.length === 0 ? (
            <p className="mt-4 text-xs md:text-sm text-muted">No categories yet.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-card/80 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-foreground">{category.name}</p>
                    {category.description ? (
                      <p className="text-xs text-muted mt-1">{category.description}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="rounded-lg bg-warning/15 px-4 py-2 text-xs font-semibold text-warning transition hover:bg-warning/25"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="rounded-lg bg-danger/15 px-4 py-2 text-xs font-semibold text-danger transition hover:bg-danger/25"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
