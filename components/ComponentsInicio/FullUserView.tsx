// src/components/ComponentsInicio/FullUserView.tsx

import { View, ScrollView, Dimensions } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import SwipeUserCard from "./SwipeUserCard";
import LikeDislikeButtons from "./LikeDislikeButtons";

import FeedFreeComponent from "./FeedFreeComponent";
import FeedPremiumComponent from "./FeedPremiumComponent";

export default function FullUserView({
  user,
  onLike,
  onDislike,
  onSuperLike,
  onSkip,
}: any) {
  const screenWidth = Dimensions.get("window").width;
  const { user: authUser } = useContext(AuthContext);

  // PREMIUM = pagou OU tem rota premium liberada
  const isPremium =
    authUser?.isPaid === true ||
    authUser?.plan?.allowedRoutes?.includes("feed_list_premium");

  return (
    <ScrollView
      style={{ width: screenWidth, padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <SwipeUserCard user={user} onSkip={onSkip} />

      <LikeDislikeButtons
        onLike={onLike}
        onDislike={onDislike}
        onSuperLike={onSuperLike}
      />

      {/* 🔥 FREE vê apenas o básico */}
      {!isPremium && <FeedFreeComponent user={user} />}

      {/* 🔥 PREMIUM vê tudo, sem repetir FREE */}
      {isPremium && <FeedPremiumComponent user={user} />}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
