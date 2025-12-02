import { View, ScrollView, Dimensions } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

import SwipeUserCard from "./SwipeUserCard";
import LikeDislikeButtons from "./LikeDislikeButtons";

import FeedFreeComponent from "./FeedFreeComponent";
import FeedPremiumComponent from "./FeedPremiumComponent";
import UserPreferencesView from "./UserPreferencesView";

import MatchModal from "./MatchModal"; // <-- IMPORTANTE
import { UsersAPI } from "@/service/users";

export default function FullUserView({
  user,
  onLike,
  onDislike,
  onSuperLike,
  onSkip,
}: any) {

  const screenWidth = Dimensions.get("window").width;
  const { user: authUser } = useContext(AuthContext);

  // -----------------------------
  //   MATCH MODAL STATE
  // -----------------------------
  const [matchVisible, setMatchVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState<any>(null);

  async function handleMatch(targetUser: any) {


  if (!targetUser?.id) {
    console.log("⚠️ MATCH sem user válido. Cancelado.");
    return;
  }

  // Buscar o user COMPLETO antes de abrir modal
  try {
    const res = await UsersAPI.getOne(targetUser.id);
   
    setMatchedUser(res.data);
    setMatchVisible(true);
  } catch (err) {

  }
}

  // -----------------------------
  // PREMIUM LEVELS
  // -----------------------------
  const allowed = authUser?.plan?.allowedRoutes || [];
  const isPremium = allowed.includes("feed_list_premium");
  const isSuperPremium = allowed.includes("feed_list_super_premium");

  return (
    <ScrollView
      style={{ width: screenWidth, padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Foto + Carousel */}
      <SwipeUserCard 
  user={user} 
  onSkip={() => {
    console.log("⏭️ FullUserView: onSkip RECEBIDO do SwipeUserCard para user:", user.id);
    onSkip?.(user.id);
  }} 
/>


      {/* LIKE / DISLIKE / SUPER LIKE BOTÕES */}
      <LikeDislikeButtons
        user={user}
        onLike={onLike}
        onDislike={onDislike}
        onSuperLike={onSuperLike}
        onMatch={handleMatch}     // <-- ADICIONADO AQUI
      />

      {/* ========= FREE ========= */}
      {!isPremium && !isSuperPremium && <FeedFreeComponent user={user} />}

      {/* ========= PREMIUM ========= */}
      {(isPremium || isSuperPremium) && <FeedPremiumComponent user={user} />}

      {/* ========= SUPER PREMIUM ========= */}
      {isSuperPremium && (
        <UserPreferencesView preference={user.preference} />
      )}

      <View style={{ height: 100 }} />

      {/* ==============================
          MATCH MODAL
      =============================== */}
      <MatchModal
        visible={matchVisible}
        user1={authUser}
        user2={matchedUser}
        onClose={() => setMatchVisible(false)}
      />
    </ScrollView>
  );
}
