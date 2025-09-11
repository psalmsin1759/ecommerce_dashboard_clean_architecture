import { IAdminRepository, LoginResponse } from "@/domain/repositories/iadmin.repository";

export class LoginAdmin {
  constructor(private adminRepo: IAdminRepository) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    return await this.adminRepo.login(email, password);
  }
}
