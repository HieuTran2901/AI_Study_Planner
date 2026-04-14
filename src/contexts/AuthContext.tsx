import apiClient from "@/api/axiosClient";
import { createContext, useState, useEffect, type ReactNode } from "react";
import { type User } from "@/types/User.type";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await apiClient.get("/auth/users/me");
      setUser(response.data.results);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setUser(null);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Load user info on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
    setIsLoading(false);
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
