// src/components/componentsPerfil/componentsProfile/ComponentsPremium/perfil-editar-profile.tsx
import { View } from "react-native";
import { Stack } from "expo-router";
import { useAuthGuard } from "@/hooks/useAuthGuard";

// 🔹 Componente unificado
import ProfileFull from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/profileFull";

export default function PerfilEditarProfile() {
  useAuthGuard();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Profile — Preferred",
          headerShown: true,
        }}
      />

      {/* Chama o componente único que contém tudo */}
      <ProfileFull />
    </View>
  );
}
