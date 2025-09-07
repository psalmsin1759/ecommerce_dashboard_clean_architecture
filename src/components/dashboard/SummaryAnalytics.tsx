"use client";


import { analytics } from "@/constants/data";
import SummaryAnalyticsCard from "../cards/SummaryAnalyticsCard";

export default function SummaryAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {analytics.map((item, index) => (
        <SummaryAnalyticsCard key={index} item={item} />
      ))}
    </div>
  );
}
