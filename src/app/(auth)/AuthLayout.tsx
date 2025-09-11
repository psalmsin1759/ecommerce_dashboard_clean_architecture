"use client";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/presentation/contexts/auth.context";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <AuthProvider>{children}</AuthProvider>

        <Toaster />
      </div>
    </div>
  );
}
