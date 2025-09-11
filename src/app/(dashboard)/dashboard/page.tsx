"use client";

import OrdersSalesExpensesChart from "@/components/dashboard/OrdersSalesExpensesChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import SummaryAnalytics from "@/components/dashboard/SummaryAnalytics";
import TopSalesProducts from "@/components/dashboard/TopSalesProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function Home() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full  px-4">
     
      <div className="flex items-center justify-between py-4">
        <h2 className="text-lg font-semibold text-gray-800">{today}</h2>

        <Select defaultValue="month">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

     
      <SummaryAnalytics />

     
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
        <div className="md:col-span-2 min-w-0">
          <OrdersSalesExpensesChart />
        </div>
        <div className="md:col-span-1 min-w-0">
          <TopSalesProducts />
        </div>
      </div>
      <RecentOrders />
    </div>
  );
}
