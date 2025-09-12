import {
  GraphPoint,
  IOrderRepository,
  TopSalesValue,
} from "@/domain/repositories/iorder.repository";
import apiClient from "../http/apiClient";

export class OrderApiRepository implements IOrderRepository {
  async countByDate(truncateTo: string): Promise<{ count: number }> {
    const res = await apiClient.get(`/orders/count/${truncateTo}`);
    return res.data;
  }

  async totalByDate(truncateTo: string): Promise<{ total: number }> {
    const res = await apiClient.get(`/orders/total/${truncateTo}`);
    return res.data;
  }

  async graphData(): Promise<GraphPoint[]> {
    const res = await apiClient.get("/orders/graph/data");
    return res.data as GraphPoint[];
  }

  async topSellingProducts(truncateTo: string): Promise<TopSalesValue[]> {
    const res = await apiClient.get(`/orders/top/seller/${truncateTo}`);
    return res.data as TopSalesValue[];
  }
}
