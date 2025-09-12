import {  IOrderRepository, TopSalesValue } from "@/domain/repositories/iorder.repository";

export const TopSellerUseCase = async (
  orderRepository: IOrderRepository,
    truncateTo: string,
): Promise<TopSalesValue[]> => {
  return await orderRepository.topSellingProducts(truncateTo);
};
