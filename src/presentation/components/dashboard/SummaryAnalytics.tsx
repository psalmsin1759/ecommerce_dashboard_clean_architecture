"use client";

import { useDateRange } from "@/presentation/contexts/daterange.context";
import TotalRevenue from "./TotalRevenue";
import TotalCount from "./TotalCount";
import { analytics } from "@/constants/data";
import SummaryAnalyticsCard from "../cards/SummaryAnalyticsCard";

interface AnalyticsProps {
  total: number;
  count: number;
  loading: boolean;
  error: string | null;
}
export default function SummaryAnalytics({total, count, loading, error} : AnalyticsProps) {
  const { range } = useDateRange();
  
  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <TotalRevenue total={total.toString()} range={range} />
      <TotalCount count={count.toString()} range={range} />
      
      {analytics.map((item, index) => (
        <SummaryAnalyticsCard key={index} item={item} />
      ))} 
    </div>
  );
}
