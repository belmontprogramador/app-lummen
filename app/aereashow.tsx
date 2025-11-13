import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AereaShow() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");  // Login
    } else {
      router.replace("/(tabs)/inicio"); // <-- CORRETO
    }
  }, [loading, user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
