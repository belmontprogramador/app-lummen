// src/components/ComponentsInicio/FullUserView.tsx

import { View, ScrollView, Dimensions } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import SwipeUserCard from "./SwipeUserCard";
import LikeDislikeButtons from "./LikeDislikeButtons";

import FeedFreeComponent from "./FeedFreeComponent";
import FeedPremiumComponent from "./FeedPremiumComponent";
import UserPreferencesView from "./UserPreferencesView"; // <-- IMPORTANTE

export default function FullUserView({
  user,
  onLike,
  onDislike,
  onSuperLike,
  onSkip,
}: any) {
  const screenWidth = Dimensions.get("window").width;
  const { user: authUser } = useContext(AuthContext);

  // Pegamos as rotas liberadas
  const allowed = authUser?.plan?.allowedRoutes || [];

  // Níveis
  const isPremium = allowed.includes("feed_list_premium");
  const isSuperPremium = allowed.includes("feed_list_super_premium");

  return (
    <ScrollView
      style={{ width: screenWidth, padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Foto + Carousel */}
      <SwipeUserCard user={user} onSkip={onSkip} />

      <LikeDislikeButtons
        onLike={onLike}
        onDislike={onDislike}
        onSuperLike={onSuperLike}
      />

      {/* ========= FREE ========= */}
      {!isPremium && !isSuperPremium && (
        <FeedFreeComponent user={user} />
      )}

      {/* ========= PREMIUM ========= */}
      {(isPremium || isSuperPremium) && (
        <FeedPremiumComponent user={user} />
      )}

      {/* ========= SUPER PREMIUM ========= */}
      {isSuperPremium && (
        <UserPreferencesView preference={user.preference} />
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
