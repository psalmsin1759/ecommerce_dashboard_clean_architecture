"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

// Example data
const data = [
  { name: "Burger", value: 450 },
  { name: "Pizza", value: 320 },
  { name: "Pasta", value: 210 },
  { name: "Salad", value: 150 },
];

// Chart config for shadcn
const chartConfig = {
  Burger: { label: "Burger", color: "#3b82f6" }, // blue
  Pizza: { label: "Pizza", color: "#10b981" }, // green
  Pasta: { label: "Pasta", color: "#f59e0b" }, // amber
  Salad: { label: "Salad", color: "#ef4444" }, // red
} satisfies ChartConfig;

export default function TopSalesProducts() {
  return (
    <div className="p-4 bg-white shadow rounded-xl w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Top Sales Products
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Pie Chart */}
        <ChartContainer config={chartConfig} className="w-full md:w-1/2 h-[280px]">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent className="md:ml-20" />} />
          </PieChart>
        </ChartContainer>

        {/* Product List */}
        <div className="w-full md:w-1/2 space-y-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="text-gray-600">{item.value} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
