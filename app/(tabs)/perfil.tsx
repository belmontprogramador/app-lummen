import { useState, useContext } from "react";
import { View, Button, ScrollView, TouchableOpacity, Text } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { AuthContext } from "@/context/AuthContext";

import PerfilEditarUser from "@/components/componentsPerfil/perfil-editar";
import PerfilEditarProfile from "@/components/componentsPerfil/perfil-editar-profile";
import PerfilFotos from "@/components/componentsPerfil/perfil-fotos";

export default function Perfil() {
  useAuthGuard();
  const { signOut } = useContext(AuthContext);

  const [tab, setTab] = useState<"user" | "profile" | "fotos">("user");

  return (
    <View style={{ flex: 1 }}>
      
      {/* --- TOPO: BOTÕES DE TROCA --- */}
      <View 
        style={{ 
          flexDirection: "row", 
          justifyContent: "space-around", 
          paddingVertical: 12,
          backgroundColor: "#f2f2f2"
        }}
      >
        <TouchableOpacity onPress={() => setTab("user")}>
          <Text style={{
            fontSize: 16,
            fontWeight: tab === "user" ? "bold" : "400",
            color: tab === "user" ? "#000" : "#666"
          }}>
            Seu nome e foto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab("profile")}>
          <Text style={{
            fontSize: 16,
            fontWeight: tab === "profile" ? "bold" : "400",
            color: tab === "profile" ? "#000" : "#666"
          }}>
            Informações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab("fotos")}>
          <Text style={{
            fontSize: 16,
            fontWeight: tab === "fotos" ? "bold" : "400",
            color: tab === "fotos" ? "#000" : "#666"
          }}>
            Minhas Fotos
          </Text>
        </TouchableOpacity>
      </View>

      {/* --- CONTEÚDO --- */}
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {tab === "user" && <PerfilEditarUser />}
        {tab === "profile" && <PerfilEditarProfile />}
        {tab === "fotos" && <PerfilFotos />}
      </ScrollView>

      {/* --- LOGOUT --- */}
      <View style={{ padding: 20 }}>
        <Button title="Sair" onPress={signOut} />
      </View>

    </View>
  );
}
