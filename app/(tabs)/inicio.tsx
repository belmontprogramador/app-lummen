// src/app/(tabs)/inicio.tsx

import { useEffect, useState, useCallback, useContext } from "react";
import { ScrollView, ActivityIndicator, Dimensions, Text, View } from "react-native";
import { LikesAPI } from "@/service/likes";

import { router, useFocusEffect } from "expo-router";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { FeedAPI } from "@/service/feed";
import { AuthContext } from "@/context/AuthContext";

import BottomSheetPlans from "@/components/modals/BottomSheetPlans";
import FullUserView from "@/components/ComponentsInicio/FullUserView";

import { checkAccess } from "@/utils/checkAccess";
import { useTranslation } from "react-i18next";

export default function Inicio() {
  useAuthGuard();

  const { t } = useTranslation();
  const { user, refreshUser } = useContext(AuthContext);

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const screenWidth = Dimensions.get("window").width;

  useFocusEffect(
    useCallback(() => {
      refreshUser();
    }, [])
  );

  useEffect(() => {
    if (!user) return;

    const blockScreen = checkAccess(user, "feed_list_free");

    if (blockScreen) {
      setLoading(false);
      return;
    }

    loadUsers();
  }, [user]);

  async function loadUsers() {
    try {
      setLoading(true);
      setErrorKey(null);

      const isPremiumRoute =
        user?.plan?.allowedRoutes?.includes("feed_list_premium");

      console.log("🔄 Carregando feed… tipo premium:", isPremiumRoute);

      const res = await FeedAPI.list(1, 20, isPremiumRoute);

      console.log("📥 Feed carregado:", res?.data?.items?.length);

      setUsers(res?.data?.items || []);
    } catch (e) {
      console.log("❌ Erro ao carregar feed:", e);
      setErrorKey("inicio.errors.loadFeed");
    } finally {
      setLoading(false);
    }
  }

  const handleSkip = async (skippedUserId: string) => {
    console.log("➡️ SKIP acionado para usuário:", skippedUserId);

    try {
      console.log("📡 Enviando skip para API…");
      const result = await LikesAPI.skip(skippedUserId);
      console.log("✅ Skip enviado com sucesso:", result);
    } catch (err) {
      console.log("❌ Erro ao registrar skip:", err);
    }

    console.log("🧹 Removendo usuário da lista local…");

    setUsers((prev) => {
      console.log("Lista antes:", prev.map((u) => u.id));
      const novaLista = prev.slice(1);
      console.log("Lista depois:", novaLista.map((u) => u.id));
      return novaLista;
    });
  };

  if (loading) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>
          {t("inicio.loading")}
        </Text>
      </View>
    );
  }

  if (errorKey) {
    return (
      <View style={{ marginTop: 40, padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {t(errorKey)}
        </Text>
      </View>
    );
  }

  const blockScreen = checkAccess(user, "feed_list_free");
  if (blockScreen) {
    return (
      <>
        {blockScreen}
        <BottomSheetPlans
          visible={showPlansModal}
          onClose={() => setShowPlansModal(false)}
        />
      </>
    );
  }

  if (!users.length) {
    console.log("🚫 Feed vazio");
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{t("inicio.emptyFeed")}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
      onScrollBeginDrag={() => console.log("👆 Início do scroll")}
      onMomentumScrollEnd={() => console.log("👉 Finalizou scroll horizontal")}
    >
      {users.map((u) => (
        <FullUserView
          key={u.id}
          user={u}
          onLike={() => {
            console.log("💚 LIKE no usuário:", u.id);
            handleSkip(u.id);
          }}
          onDislike={() => {
            console.log("💔 DISLIKE no usuário:", u.id);
            handleSkip(u.id);
          }}
          onSkip={() => {
            console.log("⏭️ SKIP direto no card:", u.id);
            handleSkip(u.id);
          }}
          onSuperLike={() => console.log("⭐ SUPERLIKE:", u.id)}
        />
      ))}
    </ScrollView>
  );
}
