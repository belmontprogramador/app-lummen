import { useState, useContext } from "react";
import { View, Button, ScrollView, TouchableOpacity, Text } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { AuthContext } from "@/context/AuthContext";

import PerfilEditar from "@/components/componentsPerfil/perfil-editar";
import PerfilFotos from "@/components/componentsPerfil/perfil-fotos";

export default function Perfil() {
  useAuthGuard();
  const { signOut } = useContext(AuthContext);

  const [tab, setTab] = useState<"editar" | "fotos">("editar");

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
        <TouchableOpacity onPress={() => setTab("editar")}>
          <Text style={{
            fontSize: 16,
            fontWeight: tab === "editar" ? "bold" : "400",
            color: tab === "editar" ? "#000" : "#666"
          }}>
            Editar Perfil
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
        {tab === "editar" && <PerfilEditar />}
        {tab === "fotos" && <PerfilFotos />}
      </ScrollView>

      {/* --- LOGOUT --- */}
      <View style={{ padding: 20 }}>
        <Button title="Sair" onPress={signOut} />
      </View>

    </View>
  );
}
