import { GraphPoint, IOrderRepository } from "@/domain/repositories/iorder.repository";

export const getOrderGraphDataUseCase = async (
  orderRepository: IOrderRepository
): Promise<GraphPoint[]> => {
  return await orderRepository.graphData();
};
