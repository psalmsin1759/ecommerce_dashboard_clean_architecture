import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product } from "@/domain/entities/Product";

export const getProducts = async (
  productRepository: IProductRepository
): Promise<Product[]> => {
  return await productRepository.getAll();
};
