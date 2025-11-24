import { View, Text, Image, TouchableOpacity } from "react-native";

const BASE_URL = "https://botgrupo.lummen-app.com"; // 🔥 sua API

export default function LikeCard({ user, type, onPress }: any) {
  // 🔥 Foto completa
  const photoUrl = user?.photo
    ? `${BASE_URL}${user.photo}`
    : "https://via.placeholder.com/150";

  // 🔥 Texto automático baseado no tipo
  const label =
    type === "received"
      ? "Curtiu você"
      : type === "sent"
      ? "Você curtiu"
      : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: photoUrl }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginRight: 12,
        }}
      />

      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {user.name}
        </Text>

        <Text style={{ color: "#888", marginTop: 2 }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
