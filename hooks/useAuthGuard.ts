import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export function useAuthGuard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem("@token");

      if (!token) {
        router.replace("/"); // voltar ao login
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, []);

  return { loading };
}
