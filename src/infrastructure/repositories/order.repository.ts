import {
  GraphPoint,
  IOrderRepository,
  OrderFilter,
  TopSalesValue,
} from "@/domain/repositories/iorder.repository";
import apiClient from "../http/apiClient";
import { Order } from "@/domain/entities/Order";

export class OrderApiRepository implements IOrderRepository {

  
  async list(filter?: OrderFilter): Promise<{
    items: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }> {
    const params = new URLSearchParams();

    if (filter) {
      if (filter.status) params.append("status", filter.status);
      if (filter.paymentStatus)
        params.append("paymentStatus", filter.paymentStatus);
      if (filter.shippingStatus)
        params.append("shippingStatus", filter.shippingStatus);
      if (filter.userId) params.append("userId", filter.userId);
      if (filter.customerEmail)
        params.append("customerEmail", filter.customerEmail);
      if (filter.customerPhone)
        params.append("customerPhone", filter.customerPhone);
      if (filter.from) params.append("from", filter.from);
      if (filter.to) params.append("to", filter.to);
      if (filter.search) params.append("search", filter.search);
      if (filter.page !== undefined)
        params.append("page", filter.page.toString());
      if (filter.limit !== undefined)
        params.append("limit", filter.limit.toString());
      if (filter.sortBy) params.append("sortBy", filter.sortBy);
      if (filter.sortOrder) params.append("sortOrder", filter.sortOrder);
    }

    const queryString = params.toString();
    const url = queryString ? `/orders?${queryString}` : `/orders`;

    const res = await apiClient.get(url);
    return res.data;
  }

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
