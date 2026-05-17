import { preferenceApi } from "@/api";
import type { UserPreferenceRequest } from "@/types/Request";

export const PreferenceService = {
  getPreferences: async () => {
    const response = await preferenceApi.getUserPreference();
    return response.results;
  },

  updatePreferences: async (data: UserPreferenceRequest) => {
    const response = await preferenceApi.updateUserPreference(data);
    return response.results;
  },

  deletePreferences: async () => {
    const response = await preferenceApi.deleteUserPreference();
    return response.results;
  },
};
