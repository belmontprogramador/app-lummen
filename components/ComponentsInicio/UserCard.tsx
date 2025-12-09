// src/components/UserCard.tsx

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://botgrupo.lummen-app.com";

export default function UserCard({ user }: any) {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get("window").width;

  /** ------------------------------------------
   * Fotos do usuário (1 foto + galeria)
   * -----------------------------------------*/
  const photos = [
    user.photo ? `${BASE_URL}${user.photo}` : null,
    ...(user.photos?.length
      ? user.photos.map((p: any) => `${BASE_URL}${p.url}`)
      : []),
  ].filter(Boolean);

  const hasPhotos = photos.length > 0;
  const [index, setIndex] = useState(0);

  function nextPhoto() {
    if (hasPhotos) {
      setIndex((prev) => (prev + 1) % photos.length);
    }
  }

  const photoUrl = hasPhotos
    ? photos[index]
    : "https://via.placeholder.com/400x400.png?text=No+Photo";

  /** ------------------------------------------
   * Nome, idade e cidade
   * -----------------------------------------*/
  const name = user.name || t("userCard.unknownName");

  let age = "";
  if (user.profile?.birthday) {
    const birth = new Date(user.profile.birthday);
    const diff = Date.now() - birth.getTime();
    age = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000)).toString();
  }

  const city = user.profile?.city || t("userCard.unknownCity");

  return (
    <View style={{ width: screenWidth, padding: 20 }}>
      {/* FOTO + CARROSSEL */}
      <TouchableOpacity onPress={nextPhoto}>
        <Image
          source={{ uri: photoUrl }}
          style={{
            width: "100%",
            height: 380,
            borderRadius: 20,
            backgroundColor: "#eee",
          }}
        />
      </TouchableOpacity>

      {/* NOME + IDADE + CIDADE */}
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>
          {name} {age ? `, ${age} ${t("userCard.years")}` : ""}
        </Text>

        <Text style={{ fontSize: 18, color: "#666" }}>{city}</Text>
      </View>
    </View>
  );
}
