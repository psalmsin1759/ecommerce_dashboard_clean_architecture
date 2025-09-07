import { IProductRepository } from "@/domain/repositories/IProductRepository";

export const deleteProduct = async (
  productRepository: IProductRepository,
  id: string
): Promise<void> => {
  return await productRepository.delete(id);
};
