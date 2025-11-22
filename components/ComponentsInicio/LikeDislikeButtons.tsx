import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LikesAPI } from "@/service/likes";

export default function LikeDislikeButtons({ user, onLike, onDislike, onSuperLike }: any) {
  const handleLike = async () => {
    try {
      if (!user?.id) {
        console.log("⚠️ Nenhum usuário selecionado para LIKE");
        return;
      }

      console.log("❤️ Enviando LIKE para:", user.id);
      const res = await LikesAPI.create(user.id);
      console.log("✅ Resposta LIKE:", res);
      if (onLike) onLike();
    } catch (err) {
      console.log("❌ Erro ao curtir:", err);
    }
  };

  const handleSuperLike = async () => {
    try {
      if (!user?.id) {
        console.log("⚠️ Nenhum usuário selecionado para SUPER LIKE");
        return;
      }

      console.log("💎 Enviando SUPER LIKE para:", user.id);
      const res = await LikesAPI.create(user.id, true);
      console.log("✅ Resposta SUPER LIKE:", res);
      if (onSuperLike) onSuperLike();
    } catch (err) {
      console.log("❌ Erro no Super Like:", err);
    }
  };

  const handleDislike = async () => {
    try {
      console.log("👎 Dislike clicado para:", user?.id);
      if (onDislike) onDislike();
    } catch (err) {
      console.log("❌ Erro no Dislike:", err);
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
