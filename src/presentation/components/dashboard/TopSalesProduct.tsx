"use client";

import { TopSalesValue } from "@/domain/repositories/iorder.repository";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/presentation/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface AnalyticsProps {
  data: TopSalesValue[];
  loading: boolean;
  error: string | null;
}

export default function TopSalesProducts({
  data,
  loading,
  error,
}: AnalyticsProps) {
  if (loading) {
    return (
      <div className="p-4 bg-white shadow rounded-xl w-full">
        <p className="text-sm text-gray-500">Loading top sellers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white shadow rounded-xl w-full">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }


  const chartData = data.map((item) => ({
    name: item.name,
    value: item.count,
  }));

  
  const chartConfig: ChartConfig = chartData.reduce(
    (acc, item, index) => ({
      ...acc,
      [item.name]: {
        label: item.name,
        color: COLORS[index % COLORS.length],
      },
    }),
    {}
  );

  return (
    <div className="p-4 bg-white shadow rounded-xl w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Top Sales Products
      </h2>

      {chartData.length === 0 ? (
        <p className="text-sm text-gray-500">No sales data available.</p>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-6">
         
          <ChartContainer config={chartConfig} className="w-full md:w-1/2 h-[280px]">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={<ChartLegendContent className="md:ml-20 text-[8px]" />}
              />
            </PieChart>
          </ChartContainer>

         
          <div className="w-full md:w-1/2 space-y-3">
            {chartData.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center border-b pb-2 gap-2"
              >
                <span className="font-medium text-xs text-gray-700">
                  {item.name}
                </span>
                <span className="text-gray-600 text-md">
                  {item.value} 
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
