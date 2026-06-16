import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "../utils/axios";

interface User {
  id: number;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (formData: any) => Promise<any>;
  register: (formData: any) => Promise<any>;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (formData: any) => {
    const res = await axiosInstance.post("/auth/login", formData);
    await checkUser();
    return res.data;
  };

  const register = async (formData: any) => {
    const res = await axiosInstance.post("/auth/register", formData);
    await checkUser();
    return res.data;
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


