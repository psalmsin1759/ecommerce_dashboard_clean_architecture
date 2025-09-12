import { useEffect, useState } from "react";
import { OrderApiRepository } from "@/infrastructure/repositories/order.repository";
import { getOrderTotalUseCase } from "@/application/use-cases/order/total.order.usecase";
import { getOrderCountUseCase } from "@/application/use-cases/order/count.order.usecase";
import { getOrderGraphDataUseCase } from "@/application/use-cases/order/graph.order.usecase";
import { GraphPoint, TopSalesValue } from "@/domain/repositories/iorder.repository";
import { TopSellerUseCase } from "@/application/use-cases/order/topseller.order.usecase";



interface AnalyticsData {
  total: number;
  count: number;
  graphData: GraphPoint[];
  topSellerData: TopSalesValue[],
  loading: boolean;
  error: string | null;
}

export function useAnalytics(range: string): AnalyticsData {
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [graphData, setGraphData] = useState<GraphPoint[]>([]);
  const [topSellerData, setTopSellerData] = useState<TopSalesValue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const repo = new OrderApiRepository();

    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        const [totalResult, countResult, graphResult, topSellerResult] = await Promise.all([
          getOrderTotalUseCase(repo, range),
          getOrderCountUseCase(repo, range),
          getOrderGraphDataUseCase(repo),
          TopSellerUseCase(repo, range)
        ]);

        if (!isMounted) return;

        setTotal(totalResult.total);
        setCount(countResult.count);
        setGraphData(graphResult);
        setTopSellerData(topSellerResult)
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
        if (isMounted) setError("Failed to load analytics");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnalytics();

    return () => {
      isMounted = false;
    };
  }, [range]);

  return { total, count, graphData,topSellerData, loading, error };
}
