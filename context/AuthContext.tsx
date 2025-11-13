import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UsersAPI } from "@/service/users";
import { User } from "@/types/user";
import { LoginResponse } from "@/types/auth";
import { router } from "expo-router";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔵 Restaurar sessão ao abrir o app
  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    const token = await AsyncStorage.getItem("@token");
    const userData = await AsyncStorage.getItem("@user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      router.replace("/aereashow");
    }

    setLoading(false);
  }

  // 🟢 Login
  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      const res = await UsersAPI.login(email, password);
      const data: LoginResponse = res.data;

      // Salvar token e usuário
      await AsyncStorage.setItem("@token", data.token);
      await AsyncStorage.setItem("@user", JSON.stringify(data.user));

      setUser(data.user);

      // Redirecionar
      router.replace("/aereashow");

    } catch (error) {
      throw new Error("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  // 🔴 Logout
  async function signOut() {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
    setUser(null);
    router.replace("/");
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
