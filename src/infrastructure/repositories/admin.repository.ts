import { IAdminRepository, LoginResponse } from "@/domain/repositories/iadmin.repository";
import apiClient from "../http/apiClient";

export class AdminApiRepository implements IAdminRepository {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await apiClient.post("/admins/login", { email, password });
    return res.data as LoginResponse;
  }

  
}
