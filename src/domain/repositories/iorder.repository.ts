import { Order } from "../entities/Order";

export interface OrderFilter {
  status?: string;
  userId?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface GraphPoint {
  month: string;
  count: number;
  total: number;
}

export interface TopSalesValue {
  name: string;
  count: number;
}

export interface OrderFilter {
  status?: string;
  paymentStatus?: string;
  shippingStatus?: string | undefined;
  userId?: string | undefined;
  customerEmail?: string | undefined;
  customerPhone?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  search?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  sortBy?: string;
  sortOrder?: string;
}

export interface IOrderRepository {
  /* create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(id: string, update: Partial<Order>): Promise<Order | null>;
  delete(id: string): Promise<boolean>; */

  list(filter?: OrderFilter): Promise<{
    items: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }>;
  countByDate(truncateTo: string): Promise<{ count: number }>;
  totalByDate(truncateTo: string): Promise<{ total: number }>;
  graphData(): Promise<GraphPoint[]>;

  topSellingProducts(truncateTo: string): Promise<TopSalesValue[]>;
}
