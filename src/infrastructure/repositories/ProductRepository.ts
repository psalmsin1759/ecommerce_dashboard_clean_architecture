import { Product } from "@/domain/entities/Product";
import { IProductRepository } from "@/domain/repositories/IProductRepository";
import apiClient  from "../http/apiClient";

export class ProductApiRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const res = await apiClient.get("/products");
    return res.data;
  }

  async getById(id: string): Promise<Product | null> {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  }

  async create(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const res = await apiClient.post("/products", data);
    return res.data;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const res = await apiClient.put(`/products/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }
}
