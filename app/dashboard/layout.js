"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardTopbar from "../../components/DashboardTopbar";
import { useUIStore } from "../../store/useUIStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function DashboardLayout({ children }) {
  const { sidebarExpanded } = useUIStore();
  const { user, checkAuth, status } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);
  
  if (status === "loading" || status === "idle") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }
  
  return (
    <div className={`min-h-screen bg-background text-foreground transition-all duration-300 ${sidebarExpanded ? "lg:pl-64" : "lg:pl-20"}`}>
      <DashboardSidebar />
      <div className="flex-1 space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-10">
        <DashboardTopbar />
        {children}
      </div>
    </div>
  );
}
