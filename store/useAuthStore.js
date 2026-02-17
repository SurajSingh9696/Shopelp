"use client";

import { create } from "zustand";
import { jsonFetcher } from "../utils/fetcher";

export const useAuthStore = create((set, get) => ({
  user: null,
  status: "idle",
  async checkAuth() {
    const currentStatus = get().status;
    // Avoid redundant checks if already loading or authenticated
    if (currentStatus === "loading") return;
    
    set({ status: "loading" });
    try {
      const response = await jsonFetcher("/api/auth/me", { method: "GET" });
      if (response.success && response.data?.user) {
        set({ user: response.data.user, status: "authenticated" });
      } else {
        set({ user: null, status: "unauthenticated" });
      }
    } catch (error) {
      set({ user: null, status: "unauthenticated" });
    }
  },
  async register(payload) {
    set({ status: "loading" });
    const response = await jsonFetcher("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (!response.success) {
      set({ status: "error" });
      return { error: response.error };
    }
    set({ user: response.data.user, status: "authenticated" });
    return response;
  },
  async login(payload) {
    set({ status: "loading" });
    const response = await jsonFetcher("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (!response.success) {
      set({ status: "error" });
      return { error: response.error };
    }
    set({ user: response.data.user, status: "authenticated" });
    return response;
  },
  async logout() {
    await jsonFetcher("/api/auth/logout", { method: "POST" });
    set({ user: null, status: "unauthenticated" });
  }
}));
