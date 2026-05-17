import authApi from "@/api/authApi";

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    return response.results.accessToken;
  },
  register: async (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    const response = await authApi.register({
      fullName,
      email,
      password,
      phone,
    });
    return response.results.accessToken;
  },
  getCurrentUser: async () => {
    const response = await authApi.getCurrentUser();
    return response.results;
  },
  refreshToken: async () => {
    const response = await authApi.refreshToken();
    return response.results.accessToken;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
};
