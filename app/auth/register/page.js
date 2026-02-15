"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register, status } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const result = await register(form);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-muted">Start tracking inventory and profits today.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              placeholder="Shop owner"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              placeholder="you@shop.com"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">Password</label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          {error ? <p className="text-sm text-ember">{error}</p> : null}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-muted">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
