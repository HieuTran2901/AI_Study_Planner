import apiClient from "./axiosClient";

import type { ApiResponse } from "@/types/Common";
import type { UserPreferenceRequest } from "@/types/Request";
import type { UserPreferenceResponse } from "@/types/Response";

export const preferenceApi = {
  getUserPreference: async (): Promise<ApiResponse<UserPreferenceResponse>> => {
    const response = await apiClient.get("/preferences/me");
    return response.data;
  },

  updateUserPreference: async (
    data: UserPreferenceRequest,
  ): Promise<ApiResponse<UserPreferenceResponse>> => {
    const response = await apiClient.put("/preferences/me", data);
    return response.data;
  },

  deleteUserPreference: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete("/preferences/me");
    return response.data;
  },
};
