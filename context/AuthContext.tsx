import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UsersAPI } from "@/service/users";
import { User } from "@/types/user";
import { LoginResponse } from "@/types/auth";
import { router } from "expo-router";

export interface AuthContextType {
  user: User | null;
  loading: boolean;

  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;

  // ⭐ Novo
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // RESTORE SESSION
  // ---------------------------
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
  // ⭐ REFRESH USER (importante)
  // ---------------------------
  async function refreshUser() {
    try {
      const res = await UsersAPI.me(); // GET /users/me
      const fresh = res.data;

      setUser(fresh);
      await AsyncStorage.setItem("@user", JSON.stringify(fresh));

      console.log("🔄 Usuário atualizado com sucesso:", fresh.plan?.name);
    } catch (err) {
      console.log("Erro ao atualizar usuário:", err);
    }
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
    } catch {
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
  // UPDATE LOCAL USER
  // ---------------------------
  async function updateUser(data: Partial<User>) {
    if (!user) return;

    let updated = { ...user, ...data };

    if (data.photo) {
      updated.photo = data.photo + "?t=" + Date.now();
    }

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
        updateUser,
        refreshUser,   // ⭐ agora está disponível para todo app
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
