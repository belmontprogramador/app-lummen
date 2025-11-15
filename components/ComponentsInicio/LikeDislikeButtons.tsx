import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LikeDislikeButtons({ onLike, onDislike, onSuperLike }: any) {
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
        onPress={onDislike}
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
        onPress={onSuperLike}
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
        onPress={onLike}
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
