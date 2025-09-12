import React from "react";
import { AnalyticsItem } from "@/constants/data";
import { IoIosMore } from "react-icons/io";

interface AnalyticsItemProps {
  item: AnalyticsItem;
}

export default function SummaryAnalyticsCard({ item }: AnalyticsItemProps) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-2 bg-white shadow">
      <div className="flex justify-between items-center">
        <div className="rounded-full p-2 bg-secondary">
          <item.icon className="text-xl text-primary" />
        </div>
        <IoIosMore />
      </div>

      <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
      <p className="text-2xl font-bold text-gray-900">{item.amount}</p>
      <p
        className={`text-sm font-semibold ${
          item.percentage.startsWith("-") ? "text-red-600" : "text-green-600"
        }`}
      >
        {item.percentage}
      </p>
      <span className="text-xs text-gray-400">{item.time}</span>
    </div>
  );
}
