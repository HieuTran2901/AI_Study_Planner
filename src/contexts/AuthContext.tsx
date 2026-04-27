import { createContext, useState, useEffect, type ReactNode } from "react";
import { type User } from "@/types/User.type";
import { AuthService } from "@/services/AuthService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setUser(null);
      AuthService.logout();
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

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const token = await AuthService.login(email, password);

      localStorage.setItem("token", token);

      await fetchUser();
      window.location.href = "/"; // Redirect to home page after login
    } catch (err) {
      console.error("Login failed:", err);
      throw err; // ⭐ để UI bắt lỗi
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    setIsLoading(true);

    try {
      const token = await AuthService.register(
        fullName,
        email,
        phone,
        password,
      );

      localStorage.setItem("token", token);

      await fetchUser();
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
