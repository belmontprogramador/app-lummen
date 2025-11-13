import { View, Text } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Curtidas() {
  useAuthGuard();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>Curtidas</Text>
    </View>
  );
}
