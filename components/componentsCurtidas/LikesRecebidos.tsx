import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { LikesAPI } from "@/service/likes";
import LikeCard from "@/components/componentsCurtidas/LikeCard";
import { router } from "expo-router";

export default function LikesRecebidos() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await LikesAPI.received();
      setLikes(res || []);
    } catch (err) {
      console.log("Erro ao carregar likes recebidos:", err);
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
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Pessoas que curtiram você
      </Text>

      {likes.length === 0 ? (
        <Text style={{ fontSize: 16, color: "#888" }}>
          Ninguém curtiu você ainda.
        </Text>
      ) : (
        likes.map((like: any) => (
          <LikeCard
            key={like.id}
            type="received"
            user={like.liker}
            onPress={() =>
             router.push({
  pathname: "/perfilUsuario/[id]",
  params: { id: like.liker.id },
})
            }
          />
        ))
      )}
    </ScrollView>
  );
}
