"use client";

import { create } from "zustand";
import { jsonFetcher } from "../utils/fetcher";

export const useAuthStore = create((set) => ({
  user: null,
  status: "idle",
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
    set({ user: response.data.user, status: "success" });
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
    set({ user: response.data.user, status: "success" });
    return response;
  },
  async logout() {
    await jsonFetcher("/api/auth/logout", { method: "POST" });
    set({ user: null, status: "idle" });
  }
}));
