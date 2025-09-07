import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product } from "@/domain/entities/Product";

export const createProduct = async (
  productRepository: IProductRepository,
  product: Product
): Promise<Product> => {
  return await productRepository.create(product);
};
