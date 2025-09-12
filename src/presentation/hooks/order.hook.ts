"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Order } from "@/domain/entities/Order";
import { OrderFilter } from "@/domain/repositories/iorder.repository";
import { OrderApiRepository } from "@/infrastructure/repositories/order.repository";
import { ProductListUseCase } from "@/application/use-cases/order/list.order.usecase";

export function useOrders(initialFilter?: OrderFilter) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderFilter>(initialFilter || {});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialFilter?.page || 1);
  const [limit, setLimit] = useState(initialFilter?.limit || 10);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const repo = useMemo(() => new OrderApiRepository(), []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductListUseCase(repo, { ...filter, page, limit });
      setOrders(data.items);
      setTotal(data.total);
      setPage(data.page);
      setLimit(data.limit);
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setHasPrevPage(data.hasPrevPage);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [filter, page, limit, repo]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    filter,
    setFilter,
    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    refetch: fetchOrders,
  };
}
