import { IOrderRepository } from "@/domain/repositories/iorder.repository";

export const getOrderTotalUseCase = async (
  orderRepository: IOrderRepository,
  truncateTo: string,
): Promise<{  total: number }> => {
  return await orderRepository.totalByDate(truncateTo);
};
