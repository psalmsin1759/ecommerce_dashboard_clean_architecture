import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product } from "@/domain/entities/Product";

export const getProductById = async (
  productRepository: IProductRepository,
  id: string
): Promise<Product | null> => {
  return await productRepository.getById(id);
};
