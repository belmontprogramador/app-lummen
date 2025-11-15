import { View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export function GlobalHeader() {
  function goBack() {
    // Se tiver histórico, volta
    if (router.canGoBack()) {
      router.back();
    } else {
      // Se não tiver, vai para a home
      router.replace("/inicio");
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#e5e5e5",
        backgroundColor: "#fff",
      }}
    >
      {/* Botão de voltar */}
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Centro: duas imagens */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={require("../../assets/images/logo2.png")}
          style={{ width: 32, height: 32 }}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/logo1.png")}
          style={{ width: 32, height: 32 }}
          resizeMode="contain"
        />
      </View>

      {/* Espaço vazio para equilibrar */}
      <View style={{ width: 24 }} />
    </View>
  );
}
