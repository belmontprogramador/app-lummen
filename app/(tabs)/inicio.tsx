// src/app/(tabs)/inicio.tsx

import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { FeedAPI } from "@/service/feed";

import SwipeUserCard from "@/components/ComponentsInicio/SwipeUserCard";
import ProfileDetails from "@/components/ComponentsInicio/ProfileDetails";
import PreferencesDetails from "@/components/ComponentsInicio/PreferencesDetails";
import LikeDislikeButtons from "@/components/ComponentsInicio/LikeDislikeButtons";

export default function Inicio() {
  useAuthGuard();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await FeedAPI.list(1, 20);

      // 🔥 AGORA USAMOS u.profile traduzido
      setUsers(res.data.items || []);
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      setLoading(false);
    }
  }

  function skipUser() {
    setUsers((prev) => prev.slice(1));
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {users.map((u) => (
        <ScrollView
          key={u.id}
          style={{
            width: screenWidth,
            padding: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* FOTO + SWIPE */}
          <SwipeUserCard user={u} onSkip={skipUser} />

          {/* BOTÕES DE LIKE */}
          <LikeDislikeButtons
            onLike={skipUser}
            onDislike={skipUser}
          />

          {/* 🔥 PERFIL TRADUZIDO */}
          <ProfileDetails profile={u.profile} />

          {/* 🔥 PREFERÊNCIAS (se tiver enum, traduzir depois no backend) */}
          <PreferencesDetails preference={u.preference} />

          <View style={{ height: 100 }} />
        </ScrollView>
      ))}
    </ScrollView>
  );
}
