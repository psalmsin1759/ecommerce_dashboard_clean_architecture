import { IOrderRepository } from "@/domain/repositories/iorder.repository";

export const getOrderCountUseCase = async (
  orderRepository: IOrderRepository,
  truncateTo: string,
): Promise<{  count: number }> => {
  return await orderRepository.countByDate(truncateTo);
};
