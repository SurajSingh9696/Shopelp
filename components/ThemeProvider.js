"use client";

import { useEffect } from "react";
import { useUIStore } from "../store/useUIStore";

export default function ThemeProvider({ children }) {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    // Apply theme on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "dark";
      setTheme(savedTheme);
    }
  }, [setTheme]);

  return <>{children}</>;
}
