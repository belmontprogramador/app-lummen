import { View, Text, Button } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Perfil() {
  useAuthGuard();
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>Meu Perfil</Text>

      <Button title="Sair" onPress={signOut} />
    </View>
  );
}
