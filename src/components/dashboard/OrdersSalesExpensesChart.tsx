"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";


const data = [
  { month: "Jan", orders: 120, sales: 4000, expenses: 2400 },
  { month: "Feb", orders: 98, sales: 3000, expenses: 2000 },
  { month: "Mar", orders: 150, sales: 5000, expenses: 3000 },
  { month: "Apr", orders: 200, sales: 7000, expenses: 3500 },
  { month: "May", orders: 180, sales: 6000, expenses: 3200 },
  { month: "Jun", orders: 160, sales: 5500, expenses: 3100 },
  { month: "Jul", orders: 220, sales: 8000, expenses: 4000 },
  { month: "Aug", orders: 210, sales: 7500, expenses: 3700 },
  { month: "Sep", orders: 190, sales: 6800, expenses: 3300 },
  { month: "Oct", orders: 170, sales: 6400, expenses: 3000 },
  { month: "Nov", orders: 200, sales: 7200, expenses: 3600 },
  { month: "Dec", orders: 250, sales: 9000, expenses: 4200 },
];


const chartConfig = {
  orders: {
    label: "Orders",
    color: "#cedcfe", 
  },
  sales: {
    label: "Sales",
    color: "#3D72Fd", 
  },
  expenses: {
    label: "Expenses",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export default function OrdersSalesExpensesBarChart() {
  return (
    <div className="p-4 bg-white shadow rounded-xl w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Monthly Orders, Sales & Expenses
      </h2>

      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
