import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UsersAPI } from "@/service/users";
import { User } from "@/types/user";
import { LoginResponse } from "@/types/auth";
import { router } from "expo-router";

// ---------------------------
// TIPAGEM DO CONTEXTO
// ---------------------------
export interface AuthContextType {
  user: User | null;
  loading: boolean;

  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;

  // 👇 função usada pelo PerfilEditar
  updateUser: (data: Partial<User>) => Promise<void>;
}

// ---------------------------
// CRIAÇÃO DO CONTEXTO
// ---------------------------
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

// ---------------------------
// PROVIDER
// ---------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restaurar sessão ao abrir o app
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

  // ---------------------------
  // LOGIN
  // ---------------------------
  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      const res = await UsersAPI.login(email, password);
      const data: LoginResponse = res.data;

      await AsyncStorage.setItem("@token", data.token);
      await AsyncStorage.setItem("@user", JSON.stringify(data.user));

      setUser(data.user);

      router.replace("/aereashow");
    } catch (error) {
      throw new Error("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------
  // LOGOUT
  // ---------------------------
  async function signOut() {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
    setUser(null);
    router.replace("/");
  }

  // ---------------------------
  // UPDATE USER (LOCAL)
  // Perfeito para PerfilEditar
  // ---------------------------
  async function updateUser(data: Partial<User>) {
    if (!user) return;

    const updated = { ...user, ...data };

    setUser(updated);
    await AsyncStorage.setItem("@user", JSON.stringify(updated));
  }

  // ---------------------------
  // RETURN
  // ---------------------------
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        updateUser, // 👈 totalmente tipado e funcionando
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
