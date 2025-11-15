import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function SwipeUserCard({ user, onSkip }: any) {
  
  // 🔥 todas as fotos: foto de perfil + carrossel
  const allPhotos = useMemo(() => {
    const arr = [];
    if (user.photo) arr.push(user.photo); // foto do perfil
    if (user.photos?.length > 0) {
      arr.push(...user.photos.map((p: any) => p.url));
    }
    return arr;
  }, [user]);

  const [photoIndex, setPhotoIndex] = useState(0);

  function nextPhoto() {
    setPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  }

  // 🔥 idade
  const age = useMemo(() => {
    if (!user.profile?.birthday) return "";
    const birth = new Date(user.profile.birthday);
    const now = new Date();
    let a = now.getFullYear() - birth.getFullYear();
    if (
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
    ) {
      a--;
    }
    return a;
  }, [user]);

  const city = user.profile?.city || "";

  return (
    <View style={{ alignItems: "center" }}>
      
      {/* FOTO ATUAL */}
      <TouchableOpacity onPress={nextPhoto}>
        <Image
          source={{
            uri: `https://botgrupo.lummen-app.com${allPhotos[photoIndex]}`
          }}
          style={{
            width: 330,
            height: 330,
            borderRadius: 20,
            backgroundColor: "#ccc",
            marginBottom: 15,
          }}
        />
      </TouchableOpacity>

      {/* NOME + IDADE + CIDADE */}
      <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
        {user.name} {age ? `, ${age}` : ""}
      </Text>

      {city !== "" && (
        <Text style={{ fontSize: 18, color: "#444", marginTop: 4 }}>
          {city}
        </Text>
      )}

      {/* BOTÃO SKIP */}
      <TouchableOpacity
        onPress={onSkip}
        style={{
          marginTop: 25,
          backgroundColor: "#000",
          paddingVertical: 12,
          paddingHorizontal: 40,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Skip</Text>
      </TouchableOpacity>

    </View>
  );
}
