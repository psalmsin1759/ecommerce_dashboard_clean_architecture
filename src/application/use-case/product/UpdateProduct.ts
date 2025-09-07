import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product } from "@/domain/entities/Product";

export const updateProduct = async (
  productRepository: IProductRepository,
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  return await productRepository.update(id, product);
};
