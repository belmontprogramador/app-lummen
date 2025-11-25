import { View, Text, Image } from "react-native";

export default function MessageBubble({ msg, userId }: any) {
  const isMe = msg.fromId !== userId;

  const baseURL = "https://botgrupo.lummen-app.com";

  // Se a URL vier relativa (ex: "/uploads/chat/..."), prefixa com o domínio
  const finalUrl =
    msg.imageUrl && msg.imageUrl.startsWith("/uploads")
      ? baseURL + msg.imageUrl
      : msg.imageUrl;

  return (
    <View
      style={{
        marginVertical: 6,
        alignSelf: isMe ? "flex-end" : "flex-start",
        maxWidth: "80%",
        backgroundColor: isMe ? "#7b2cff" : "#e5e5e5",
        padding: 10,
        borderRadius: 12,
      }}
    >
      {msg.text ? (
        <Text style={{ color: isMe ? "#fff" : "#000", fontSize: 16 }}>
          {msg.text}
        </Text>
      ) : null}

      {msg.imageUrl ? (
        <Image
          source={{ uri: finalUrl }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            marginTop: msg.text ? 5 : 0,
          }}
        />
      ) : null}
    </View>
  );
}
