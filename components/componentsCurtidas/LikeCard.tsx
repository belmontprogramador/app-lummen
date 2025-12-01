// src/components/LikeCard.tsx

import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://botgrupo.lummen-app.com"; // 🔥 sua API

export default function LikeCard({ user, type, onPress }: any) {
  const { t } = useTranslation(); // ✅ i18n

  // 🔥 Foto completa
  const photoUrl = user?.photo
    ? `${BASE_URL}${user.photo}`
    : t("likeCard.placeholderImage"); // ✅ fallback internacionalizado

  // 🔥 Texto automático baseado no tipo (internacionalizado)
  const label =
    type === "received"
      ? t("likeCard.received")
      : type === "sent"
      ? t("likeCard.sent")
      : t("likeCard.unknown");

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
      accessibilityLabel={t("likeCard.openProfile")}
    >
      <Image
        source={{ uri: photoUrl }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginRight: 12,
        }}
        accessibilityLabel={t("likeCard.userPhoto")}
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
