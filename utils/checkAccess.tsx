// src/utils/checkAccess.tsx

import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export function checkAccess(user: any, requiredTag: string) {
  const allowed = user?.plan?.allowedRoutes?.includes(requiredTag);

  if (allowed) return null;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Função Bloqueada
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "#666",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Seu plano atual não permite acessar esta função.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/plans")}
        style={{
          backgroundColor: "#7b2cff",
          paddingVertical: 14,
          paddingHorizontal: 25,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          Ver Planos
        </Text>
      </TouchableOpacity>
    </View>
  );
}
