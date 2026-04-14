import authApi from "@/api/authApi";
import { type User } from "@/types/User.type";

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await authApi.getCurrentUser();
      return response.results;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
};
