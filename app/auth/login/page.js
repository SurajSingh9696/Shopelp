"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../../store/useAuthStore";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/dashboard";
  const { login, status } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const result = await login(form);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.push(redirectTo);
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
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">Sign in to continue managing your shop.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border bg-card"
            />
            Remember me
          </label>
          {error ? <p className="text-sm text-ember">{error}</p> : null}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-muted">
          New here?{" "}
          <Link href="/auth/register" className="font-semibold text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background px-6 py-24 text-foreground flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
