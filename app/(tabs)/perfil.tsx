import { View, Button, ScrollView } from "react-native";
import PerfilEditar from "@/components/componentsPerfil/perfil-editar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Perfil() {
  useAuthGuard();
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <PerfilEditar />
      </ScrollView>

      <View style={{ padding: 20 }}>
        <Button title="Sair" onPress={signOut} />
      </View>

    </View>
  );
}
