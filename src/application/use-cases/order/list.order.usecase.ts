import { Order } from "@/domain/entities/Order";
import {
  IOrderRepository,
  OrderFilter,
} from "@/domain/repositories/iorder.repository";

export const ProductListUseCase = async (
  orderRepository: IOrderRepository,
  filter?: OrderFilter
): Promise<{
  items: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}> => {
  return await orderRepository.list(filter);
};
