import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LikesAPI } from "@/service/likes";

export default function LikeDislikeButtons({
  user,
  onLike,
  onDislike,
  onSuperLike,
  onMatch
}: any) {

 const handleLike = async () => {
  try {
    const res = await LikesAPI.create(user.id);

    if (res?.matched) {
      console.log("🎉 MATCH DETECTADO");

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
    console.log("🔥 [ERRO LIKE] Detalhes:", err);
  }
};

  const handleSuperLike = async () => {
    try {
      console.log("👉 [SUPER LIKE CLICK] Usuário:", user?.id);

      if (!user?.id) {
        console.log("⚠️ [SUPER LIKE] user.id inexistente. Cancelando.");
        return;
      }

      console.log("📡 [SUPER LIKE] Enviando requisição para API...");
      const res = await LikesAPI.create(user.id, true);

      console.log("💎 [SUPER LIKE RESPOSTA] API:", res);

      if (res?.matched) {
        console.log("🎉💎 [MATCH SUPER LIKE] MATCH com:", user.id);
        if (onMatch) onMatch(user);
      } else {
        console.log("❌💎 [NO MATCH SUPER LIKE] Nenhum match.");
      }

      if (onSuperLike) onSuperLike();

    } catch (err) {
      console.log("🔥 [ERRO SUPER LIKE] Detalhes:", err);
    }
  };

  const handleDislike = async () => {
    try {
      console.log("👎 [DISLIKE CLICK] Usuário:", user?.id);

      if (onDislike) onDislike();

    } catch (err) {
      console.log("🔥 [ERRO DISLIKE] Detalhes:", err);
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
    >
      {/* DISLIKE */}
      <TouchableOpacity
        onPress={handleDislike}
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

      {/* SUPER LIKE */}
      <TouchableOpacity
        onPress={handleSuperLike}
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

      {/* LIKE */}
      <TouchableOpacity
        onPress={handleLike}
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
