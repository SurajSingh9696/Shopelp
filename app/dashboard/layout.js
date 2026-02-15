"use client";

import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardTopbar from "../../components/DashboardTopbar";
import { useUIStore } from "../../store/useUIStore";

export default function DashboardLayout({ children }) {
  const { sidebarExpanded } = useUIStore();
  
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
