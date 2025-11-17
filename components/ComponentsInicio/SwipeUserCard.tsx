import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function SwipeUserCard({ user, onSkip }: any) {

  const allPhotos = useMemo(() => {
    const arr = [];
    if (user.photo) arr.push(user.photo);
    if (user.photos?.length > 0) {
      arr.push(...user.photos.map((p: any) => p.url));
    }
    return arr;
  }, [user]);

  const [photoIndex, setPhotoIndex] = useState(0);

  function nextPhoto() {
    setPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  }

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

      {/* FOTO + BARRA SOBREPOSTA */}
      <View style={{ width: 330, height: 330, marginBottom: 15 }}>

        {/* 🔥 Barra sobreposta na parte superior da foto */}
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 12,
            zIndex: 10,
          }}
        >
          {allPhotos.map((_, idx) => (
            <View
              key={idx}
              style={{
                flex: 1,
                height: 4,
                marginHorizontal: 3,
                borderRadius: 4,
                backgroundColor:
                  idx === photoIndex ? "#fff" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </View>

        {/* FOTO */}
        <TouchableOpacity onPress={nextPhoto} style={{ flex: 1 }}>
          <Image
            source={{
              uri: `https://botgrupo.lummen-app.com${allPhotos[photoIndex]}`
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              backgroundColor: "#ccc",
            }}
          />
        </TouchableOpacity>

      </View>

      {/* NOME + IDADE */}
      <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
        {user.name} {age ? `, ${age}` : ""}
      </Text>

      {/* CIDADE */}
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
