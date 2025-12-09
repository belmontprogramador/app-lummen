// src/app/(tabs)/inicio.tsx

import { useEffect, useState, useCallback, useContext } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

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

  const screenWidth = Dimensions.get("window").width;

  // ESTADOS DO FEED
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [showPlansModal, setShowPlansModal] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  // Atualiza o usuário quando a tela volta ao foco
  useFocusEffect(
    useCallback(() => {
      refreshUser();
    }, [])
  );

  // 🔥 CARREGAR PRIMEIRA PÁGINA AO ENTRAR
  useEffect(() => {
    if (!user) return;

    const blockScreen = checkAccess(user, "feed_list_free");
    if (blockScreen) {
      setLoading(false);
      return;
    }

    loadInitialUsers();
  }, [user]);

  // ======================================================
  // 🔥 FUNÇÃO PARA CARREGAR PRIMEIRA PÁGINA DO FEED
  // ======================================================
  async function loadInitialUsers() {
    try {
      setLoading(true);
      setErrorKey(null);
      setPage(1);
      setHasMore(true);

      const isPremiumRoute = user?.plan?.allowedRoutes?.includes("feed_list_premium");

      const res = await FeedAPI.list(1, 20, isPremiumRoute);

      setUsers(res?.data?.items || []);
      setHasMore(res?.data?.items?.length === 20);
    } catch (e) {
      console.log("❌ Erro ao carregar feed:", e);
      setErrorKey("inicio.errors.loadFeed");
    } finally {
      setLoading(false);
    }
  }

  // ======================================================
  // 🔥 FUNÇÃO PARA CARREGAR MAIS PÁGINAS (2, 3, 4…)
  // ======================================================
  async function loadMoreUsers() {
    if (loadingMore || !hasMore) return;

    console.log("🔄 Carregando mais usuários… (page:", page + 1, ")");

    try {
      setLoadingMore(true);

      const isPremiumRoute = user?.plan?.allowedRoutes?.includes("feed_list_premium");
      const nextPage = page + 1;

      const res = await FeedAPI.list(nextPage, 20, isPremiumRoute);
      const newUsers = res?.data?.items || [];

      if (newUsers.length === 0) {
        setHasMore(false);
        return;
      }

     setUsers((prev: any[]) => {
  const ids = new Set(prev.map((u: any) => u.id));

  const filtered = newUsers.filter((u: any) => !ids.has(u.id));

  return [...prev, ...filtered];
});


      setPage(nextPage);

      if (newUsers.length < 20) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("❌ Erro ao carregar mais usuários:", err);
    } finally {
      setLoadingMore(false);
    }
  }

  // ======================================================
  // 🔥 PRELOAD: CARREGAR PRÓXIMA PÁGINA AO ATINGIR 70% DO SCROLL
  // ======================================================
  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const current = contentOffset.x + layoutMeasurement.width;
    const progress = current / contentSize.width;

    if (progress >= 0.7) {
      console.log("⚡ Pré-carregando próxima página (70% atingido)");
      loadMoreUsers();
    }
  }

  // ======================================================
  // 🔥 SKIP / LIKE / DISLIKE
  // ======================================================
  const handleSkip = async (skippedUserId: string) => {
    console.log("➡️ SKIP acionado para usuário:", skippedUserId);

    try {
      await LikesAPI.skip(skippedUserId);
    } catch (err) {
      console.log("❌ Erro ao registrar skip:", err);
    }

    setUsers((prev) => prev.slice(1));
  };

  // ======================================================
  // 🔥 ESTADOS DE LOADING / ERRO / BLOQUEIO
  // ======================================================
  if (loading) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>{t("inicio.loading")}</Text>
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
        <BottomSheetPlans visible={showPlansModal} onClose={() => setShowPlansModal(false)} />
      </>
    );
  }

  if (!users.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{t("inicio.emptyFeed")}</Text>
      </View>
    );
  }

  // ======================================================
  // 🔥 RENDERIZAÇÃO DO FEED
  // ======================================================
  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {users.map((u) => (
        <FullUserView
  key={u.id}
  user={u}

  // LIKE → NÃO envia SKIP
  onLike={() => setUsers((prev) => prev.slice(1))}

  // DISLIKE → NÃO envia SKIP
  onDislike={() => setUsers((prev) => prev.slice(1))}

  // SKIP verdadeiro → envia skip para backend
  onSkip={() => handleSkip(u.id)}

  onSuperLike={() => console.log("⭐ SUPERLIKE:", u.id)}
/>

        ))}
      </ScrollView>

      {/* Spinner carregando mais */}
      {loadingMore && (
        <View style={{ position: "absolute", bottom: 20, left: 0, right: 0, alignItems: "center" }}>
          <ActivityIndicator size="small" />
        </View>
      )}
    </>
  );
}
