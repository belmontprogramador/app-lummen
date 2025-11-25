import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { LikesAPI } from "@/service/likes";
import { router } from "expo-router";

export default function MatchList() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);

  async function load() {
  try {
    const res = await LikesAPI.matches();

    setMatches(res || []);
  } catch (e) {
    console.log("erro ao buscar matches", e);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#777" }}>Nenhum match ainda.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      {matches.map((m) => (
        <TouchableOpacity
          key={m.id}
          onPress={() =>
            router.push({
              pathname: "/chatRoom/[id]",
              params: { id: m.id },
            })
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Image
            source={{ uri: `https://botgrupo.lummen-app.com${m.photo}` }}
            style={{
              width: 55,
              height: 55,
              borderRadius: 8,
              marginRight: 12,
            }}
          />

          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{m.name}</Text>
            <Text style={{ color: "#888", marginTop: 2 }}>Toque para conversar</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
