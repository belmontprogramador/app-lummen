import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";

const BASE_URL = "https://botgrupo.lummen-app.com";

export default function UserCard({ user }: any) {
  const screenWidth = Dimensions.get("window").width;

  // Fotos: foto de perfil + fotos do carrossel
  const photos = [
    user.photo ? `${BASE_URL}${user.photo}` : null,
    ...(user.photos?.length ? user.photos.map((p: any) => `${BASE_URL}${p.url}`) : [])
  ].filter(Boolean);

  const [index, setIndex] = useState(0);

  function nextPhoto() {
    setIndex((prev) => (prev + 1) % photos.length);
  }

  // Nome
  const name = user.name || "";

  // Idade
  let age = "";
  if (user.profile?.birthday) {
    const birth = new Date(user.profile.birthday);
    const diff = Date.now() - birth.getTime();
    age = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000)).toString();
  }

  // Cidade
  const city = user.profile?.city || "";

  return (
    <View style={{ width: screenWidth, padding: 20 }}>
      
      {/* FOTO PRINCIPAL + CARROSSEL */}
      <TouchableOpacity onPress={nextPhoto}>
        <Image
          source={{ uri: photos[index] }}
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
          {name} {age ? `, ${age}` : ""}
        </Text>
        <Text style={{ fontSize: 18, color: "#666" }}>{city}</Text>
      </View>
    </View>
  );
}
