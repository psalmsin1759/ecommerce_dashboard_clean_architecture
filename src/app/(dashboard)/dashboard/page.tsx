"use client";

import OrdersSalesExpensesChart from "@/presentation/components/dashboard/OrdersSalesExpensesChart";
import RecentOrders from "@/presentation/components/dashboard/RecentOrders";
import SummaryAnalytics from "@/presentation/components/dashboard/SummaryAnalytics";
import TopSalesProducts from "@/presentation/components/dashboard/TopSalesProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import React from "react";
import { useDateRange } from "@/presentation/contexts/daterange.context";
import { useAnalytics } from "@/presentation/hooks/analytics.hook";

export default function Home() {
  const { range, setRange } = useDateRange();

  const { total, count, graphData, topSellerData, loading, error } = useAnalytics(range);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full  px-4">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-lg font-semibold text-gray-800">{today}</h2>

        <Select value={range} onValueChange={(val) => setRange(val as string)}>
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

      <SummaryAnalytics
        total={total}
        count={count}
        loading={loading}
        error={error}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
        <div className="md:col-span-2 min-w-0">
          <OrdersSalesExpensesChart
            graphData={graphData}
            loading={loading}
            error={error}
          />
        </div>
        <div className="md:col-span-1 min-w-0">
          <TopSalesProducts data={topSellerData}
            loading={loading}
            error={error} />
        </div>
      </div>
      <RecentOrders />
    </div>
  );
}
