import apiClient from "./axiosClient";
import type { User } from "@/types/Entity";
import type { ApiResponse } from "@/types/Common";
import type { LoginRequest, RegisterRequest } from "@/types/Request";
import type { AuthResponse } from "@/types/Response";

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
