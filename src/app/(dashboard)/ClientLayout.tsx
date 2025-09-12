"use client";
import Header from "@/presentation/components/shared/Header";
import Sidebar from "@/presentation/components/shared/Sidebar";
import React, { useState } from "react";
import { Toaster } from "@/presentation/components/ui/sonner";
import { AuthProvider } from "@/presentation/contexts/auth.context";
import {
  DateRangeProvider,
} from "@/presentation/contexts/daterange.context";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden max-w-full overflow-x-hidden">
      <AuthProvider>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <DateRangeProvider>{children}</DateRangeProvider>
          </main>
        </div>
        <Toaster />
      </AuthProvider>
    </div>
  );
}
