import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { LikesAPI } from "@/service/likes";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function MatchList() {
  const { t } = useTranslation(); // ✅ i18n
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setErrorKey(null);

      const res = await LikesAPI.matches();
      setMatches(res || []);
    } catch (e) {
      console.log(t("matches.errors.load"), e);
      setErrorKey("matches.errors.load");
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
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>
          {t("matches.loading")}
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

  // ✅ Estado vazio internacionalizado
  if (matches.length === 0) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#777" }}>
          {t("matches.empty")}
        </Text>
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
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {m.name}
            </Text>
            <Text style={{ color: "#888", marginTop: 2 }}>
              {t("matches.tapToChat")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
