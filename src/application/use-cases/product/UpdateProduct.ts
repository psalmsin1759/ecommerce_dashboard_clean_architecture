import { IProductRepository } from "@/domain/repositories/iproduct.repository";
import { Product } from "@/domain/entities/Product";

export const updateProduct = async (
  productRepository: IProductRepository,
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  return await productRepository.update(id, product);
};
