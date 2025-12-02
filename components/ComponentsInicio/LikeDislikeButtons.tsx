// src/components/ComponentsInicio/LikeDislikeButtons.tsx

import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LikesAPI } from "@/service/likes";
import { useTranslation } from "react-i18next";

export default function LikeDislikeButtons({
  user,
  onLike,
  onDislike,
  onSuperLike,
  onMatch
}: any) {
  const { t } = useTranslation(); // ✅ i18n

  const handleLike = async () => {
    try {
      const res = await LikesAPI.create(user.id);

      if (res?.matched) {
        console.log(t("likeButtons.logs.matchDetected"));

        const matchedData =
          res?.otherUser ||
          res?.targetUser ||
          res?.matchedUser ||
          res?.user ||
          user;

        if (onMatch) onMatch(matchedData);

        return; // ⛔ MUITO IMPORTANTE → NÃO PULA O USER !!!
      }

      // Só pula SE NÃO tiver match
      if (onLike) onLike();

    } catch (err) {
      console.log(t("likeButtons.logs.likeError"), err);
    }
  };

  const handleSuperLike = async () => {
    try {
      console.log(
        t("likeButtons.logs.superLikeClick"),
        user?.id
      );

      if (!user?.id) {
        console.log(t("likeButtons.logs.superLikeInvalidUser"));
        return;
      }

      console.log(t("likeButtons.logs.superLikeSending"));
      const res = await LikesAPI.create(user.id, true);

      console.log(
        t("likeButtons.logs.superLikeResponse"),
        res
      );

      if (res?.matched) {
        console.log(
          t("likeButtons.logs.superLikeMatched"),
          user.id
        );
        if (onMatch) onMatch(user);
      } else {
        console.log(t("likeButtons.logs.superLikeNoMatch"));
      }

      if (onSuperLike) onSuperLike();

    } catch (err) {
      console.log(t("likeButtons.logs.superLikeError"), err);
    }
  };

  const handleDislike = async () => {
  try {
    console.log(t("likeButtons.logs.dislikeClick"), user?.id);

    if (!user?.id) {
      console.log("❌ Usuário inválido no dislike");
      return;
    }

    // 🔥 AQUI ESTAVA FALTANDO!!!
    const res = await LikesAPI.dislike(user.id);

    console.log("💔 Dislike enviado →", res);

    if (onDislike) onDislike();

  } catch (err) {
    console.log(t("likeButtons.logs.dislikeError"), err);
  }
};


  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 25,
        paddingVertical: 10,
      }}
      accessibilityLabel={t("likeButtons.container")}
    >
      {/* ✅ DISLIKE */}
      <TouchableOpacity
        onPress={handleDislike}
        accessibilityLabel={t("likeButtons.dislike")}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Ionicons name="close" size={36} color="#ff4444" />
      </TouchableOpacity>

      {/* ✅ SUPER LIKE */}
      <TouchableOpacity
        onPress={handleSuperLike}
        accessibilityLabel={t("likeButtons.superLike")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#e6f4ff",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Ionicons name="star" size={28} color="#0099ff" />
      </TouchableOpacity>

      {/* ✅ LIKE */}
      <TouchableOpacity
        onPress={handleLike}
        accessibilityLabel={t("likeButtons.like")}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Ionicons name="heart" size={36} color="#00cc66" />
      </TouchableOpacity>
    </View>
  );
}
