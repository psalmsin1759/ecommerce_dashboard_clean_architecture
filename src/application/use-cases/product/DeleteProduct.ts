import { IProductRepository } from "@/domain/repositories/iproduct.repository";

export const deleteProduct = async (
  productRepository: IProductRepository,
  id: string
): Promise<void> => {
  return await productRepository.delete(id);
};
