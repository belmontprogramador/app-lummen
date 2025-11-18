import { useState, useContext } from "react";
import { View, Button, ScrollView, TouchableOpacity, Text } from "react-native";
import { Stack } from "expo-router"; // ⭐ PARA ESCONDER O HEADER PADRÃO

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { AuthContext } from "@/context/AuthContext";

import PerfilEditarUser from "@/components/componentsPerfil/perfil-editar";
import PerfilEditarProfile from "@/components/componentsPerfil/perfil-editar-profile";
import PerfilFotos from "@/components/componentsPerfil/perfil-fotos";

import PreferencesFreeScreen from "@/components/compenentsPreferences/PreferencesFreeScreen";
import PreferencesPremiumScreen from "@/components/compenentsPreferences/PreferencesPremiumScreen";

export default function Perfil() {
  useAuthGuard();
  const { signOut } = useContext(AuthContext);

  const [tab, setTab] = useState<
    "user" | "profile" | "fotos" | "preferencesFree" | "preferencesPremium"
  >("user");

  return (
    <View style={{ flex: 1 }}>
      
      {/* 🔥 REMOVE O HEADER PADRÃO QUE ESTAVA QUEBRANDO O LAYOUT */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- TOPO: BOTÕES DE TROCA --- */}
      <View style={{ backgroundColor: "#f2f2f2" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setTab("user")} style={{ marginRight: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: tab === "user" ? "bold" : "400",
                color: tab === "user" ? "#000" : "#666",
              }}
            >
              Seu nome e foto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab("profile")} style={{ marginRight: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: tab === "profile" ? "bold" : "400",
                color: tab === "profile" ? "#000" : "#666",
              }}
            >
              Informações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab("fotos")} style={{ marginRight: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: tab === "fotos" ? "bold" : "400",
                color: tab === "fotos" ? "#000" : "#666",
              }}
            >
              Minhas Fotos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTab("preferencesFree")}
            style={{ marginRight: 20 }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: tab === "preferencesFree" ? "bold" : "400",
                color: tab === "preferencesFree" ? "#000" : "#666",
              }}
            >
              Preferências
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab("preferencesPremium")}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: tab === "preferencesPremium" ? "bold" : "400",
                color: tab === "preferencesPremium" ? "#000" : "#666",
              }}
            >
              Premium
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* --- CONTEÚDO --- */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {tab === "user" && <PerfilEditarUser />}
        {tab === "profile" && <PerfilEditarProfile />}
        {tab === "fotos" && <PerfilFotos />}
        {tab === "preferencesFree" && <PreferencesFreeScreen />}
        {tab === "preferencesPremium" && <PreferencesPremiumScreen />}
      </ScrollView>

      {/* --- LOGOUT --- */}
      <View style={{ padding: 20 }}>
        <Button title="Sair" onPress={signOut} />
      </View>

    </View>
  );
}
