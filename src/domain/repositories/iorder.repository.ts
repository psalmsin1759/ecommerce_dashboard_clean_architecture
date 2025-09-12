

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
  count: number
}

export interface IOrderRepository {
  /* create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(id: string, update: Partial<Order>): Promise<Order | null>;
  delete(id: string): Promise<boolean>;
  list(filter?: OrderFilter): Promise<{ items: Order[]; total: number }>; */

  countByDate(
    truncateTo: string,
  ): Promise<{  count: number }>;
  totalByDate(
    truncateTo: string,
  ): Promise<{ total: number }>;
  graphData(): Promise<GraphPoint[]>;

  topSellingProducts(
    truncateTo: string,
  ): Promise<TopSalesValue []>;
}
