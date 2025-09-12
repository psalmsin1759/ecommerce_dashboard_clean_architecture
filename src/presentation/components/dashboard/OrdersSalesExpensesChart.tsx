"use client";

import { GraphPoint } from "@/domain/repositories/iorder.repository";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/presentation/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "#cedcfe",
  },
  sales: {
    label: "Sales",
    color: "#3D72Fd",
  },
} satisfies ChartConfig;

interface AnalyticsProps {
  graphData: GraphPoint[];
  loading: boolean;
  error: string | null;
}

export default function OrdersSalesExpensesBarChart({
  graphData,
  loading,
  error,
}: AnalyticsProps) {
  
  const chartData = graphData.map((g) => ({
    month: g.month,
    orders: g.count, 
    sales: g.total, 
  }));

  if (loading) {
    return (
      <div className="p-4 bg-white shadow rounded-xl w-full text-center text-gray-500">
        Loading chart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white shadow rounded-xl w-full text-center text-red-500">
        Failed to load chart: {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow rounded-xl w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Monthly Orders & Sales
      </h2>

      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />

            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
