import { useEffect, useState } from "react";
import { ScrollView, View, Dimensions, ActivityIndicator } from "react-native";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { FeedAPI } from "@/service/feed"; //  👈 TROCA AQUI !!!

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
      const res = await FeedAPI.list(1, 20); //  👈 TROCA AQUI !!!
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

  function handleLike() {
    skipUser();
  }

  function handleDislike() {
    skipUser();
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
          <SwipeUserCard user={u} onSkip={skipUser} />

          <LikeDislikeButtons
            onLike={handleLike}
            onDislike={handleDislike}
          />

          <ProfileDetails
            profile={{
              ...u.profileBasic,
              ...u.profileLocation,
              ...u.profileLifestyle,
              ...u.profileWork,
              ...u.profileRelation,
              ...u.profileInterests,
              ...u.profileExtra,
            }}
          />

          <PreferencesDetails preference={u.preference} />

          <View style={{ height: 100 }} />
        </ScrollView>
      ))}
    </ScrollView>
  );
}
