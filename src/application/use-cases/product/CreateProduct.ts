import { IProductRepository } from "@/domain/repositories/iproduct.repository";
import { Product } from "@/domain/entities/Product";

export const createProduct = async (
  productRepository: IProductRepository,
  product: Product
): Promise<Product> => {
  return await productRepository.create(product);
};
