"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Admin } from "@/domain/entities/Admin";
import { LoginAdmin } from "@/application/use-cases/admin/admin.login.usecase";
import { AdminApiRepository } from "@/infrastructure/repositories/admin.repository";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthContextProps {
  admin: Admin | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const adminRepo = new AdminApiRepository();
const loginUseCase = new LoginAdmin(adminRepo);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedAdmin = localStorage.getItem("admin");

    if (token && storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch {
        localStorage.removeItem("admin");
        Cookies.remove("token");
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token, admin } = await loginUseCase.execute(email, password);

      localStorage.setItem("accessToken", token);
      localStorage.setItem("adminId", String(admin.id));
      localStorage.setItem("admin", JSON.stringify(admin));
      Cookies.set("token", token, { expires: 7, secure: true });

      setAdmin(admin);
      router.push("/dashboard");
    } catch (err: unknown) {
      let message = "Login failed";
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          message = "Invalid email or password.";
        } else if (err.response?.status === 403) {
          message = "You don’t have permission to access this account.";
        } else {
          message = err.response?.data?.message || "Server error.";
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("admin");
    Cookies.remove("token");

    setAdmin(null);
    setError(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
