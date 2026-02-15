"use client";

import { create } from "zustand";

// Get initial currency from localStorage
const getInitialCurrency = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("currency") || "INR";
  }
  return "INR";
};

// Get initial theme from localStorage
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "dark";
  }
  return "dark";
};

export const useUIStore = create((set, get) => ({
  sidebarOpen: false,
  sidebarExpanded: true,
  currency: getInitialCurrency(),
  theme: getInitialTheme(),
  toggleSidebar() {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },
  toggleSidebarExpanded() {
    set((state) => ({ sidebarExpanded: !state.sidebarExpanded }));
  },
  setSidebarExpanded(expanded) {
    set({ sidebarExpanded: expanded });
  },
  setCurrency(currency) {
    set({ currency });
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", currency);
    }
  },
  setTheme(theme) {
    set({ theme });
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  },
  toggleTheme() {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    get().setTheme(newTheme);
  }
}));
