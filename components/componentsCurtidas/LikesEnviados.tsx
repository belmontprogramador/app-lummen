import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { LikesAPI } from "@/service/likes";
import LikeCard from "@/components/componentsCurtidas/LikeCard";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function LikesEnviados() {
  const { t } = useTranslation(); // ✅ i18n
  const [likes, setLikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setErrorKey(null);

      const res = await LikesAPI.getSent();
      setLikes(res || []);
    } catch (err) {
      console.log(t("likesSent.logs.loadError"), err);
      setErrorKey("likesSent.errors.load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // ✅ Loading internacionalizado
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>
          {t("likesSent.loading")}
        </Text>
      </View>
    );
  }

  // ✅ Erro internacionalizado
  if (errorKey) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {t(errorKey)}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* ✅ Título internacionalizado */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {t("likesSent.title")}
      </Text>

      {/* ✅ Estado vazio internacionalizado */}
      {likes.length === 0 ? (
        <Text style={{ fontSize: 16, color: "#888" }}>
          {t("likesSent.empty")}
        </Text>
      ) : (
        likes.map((like: any) => (
          <LikeCard
            key={like.id}
            type="sent"
            user={like.liked}
            onPress={() =>
              router.push({
                pathname: "/perfilUsuario/[id]",
                params: { id: like.liked.id }
              })
            }
          />
        ))
      )}
    </ScrollView>
  );
}
