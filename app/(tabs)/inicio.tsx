// src/app/(tabs)/inicio.tsx

import { useEffect, useState, useCallback, useContext } from "react";
import { ScrollView, ActivityIndicator, Dimensions } from "react-native";

import { router, useFocusEffect } from "expo-router";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { FeedAPI } from "@/service/feed";
import { AuthContext } from "@/context/AuthContext";

import BottomSheetPlans from "@/components/modals/BottomSheetPlans";
import FullUserView from "@/components/ComponentsInicio/FullUserView";

import { checkAccess } from "@/utils/checkAccess";

export default function Inicio() {
  useAuthGuard();
  const { user, refreshUser } = useContext(AuthContext);

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlansModal, setShowPlansModal] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  // Atualiza o state do user quando entra na tela
  useFocusEffect(
    useCallback(() => {
      refreshUser();
    }, [])
  );

  useEffect(() => {
    if (!user) return;

    // Checagem de rota dinâmica (feed_list agora é free/premium)
    const blockScreen = checkAccess(user, "feed_list_free");

    if (blockScreen) {
      setLoading(false);
      return;
    }

    loadUsers();
  }, [user]);

  // ⚡ Carrega feed conforme o tipo do usuário: FREE x PREMIUM
  async function loadUsers() {
    try {
      setLoading(true);

      const isPaid = user?.isPaid === true;

      const res = await FeedAPI.list(1, 20, isPaid);
      setUsers(res?.data?.items || []);
    } catch (e) {
      console.log("Erro ao carregar feed:", e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  // 🔥 Caso usuário não tenha acesso à rota free/premium
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

  const skipUser = () => {
    setUsers((prev) => prev.slice(1));
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {users.map((u) => (
        <FullUserView
          key={u.id}
          user={u}
          onLike={skipUser}
          onDislike={skipUser}
          onSkip={skipUser}
          onSuperLike={() => console.log("superlike")}
        />
      ))}
    </ScrollView>
  );
}
