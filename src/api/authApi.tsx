import apiClient from "./axiosClient";
import { type User } from "@/types/User.type";

// ==================== REQUEST INTERFACES ====================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  password: string;
  email: string;
  phone: string;
}

// ==================== RESPONSE INTERFACES ====================
export interface AuthResponse {
  accessToken: string;
}

export interface ApiResponse<T> {
  code: number;
  message?: string;
  results: T;
}

// ==================== Auth Api ====================
export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  register: async (
    data: RegisterRequest,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get("/auth/users/me");
    return response.data;
  },

  refreshToken: async (): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },
};

export default authApi;
