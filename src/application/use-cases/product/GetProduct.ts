import { IProductRepository } from "@/domain/repositories/iproduct.repository";
import { Product } from "@/domain/entities/Product";

export const getProducts = async (
  productRepository: IProductRepository
): Promise<Product[]> => {
  return await productRepository.getAll();
};
