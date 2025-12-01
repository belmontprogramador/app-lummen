// src/components/MessageBubble.tsx

import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";

export default function MessageBubble({ msg, userId }: any) {
  const { t } = useTranslation(); // ✅ i18n

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
      accessibilityLabel={isMe ? t("chat.myMessage") : t("chat.otherMessage")}
    >
      {msg.text ? (
        <Text
          style={{ color: isMe ? "#fff" : "#000", fontSize: 16 }}
          accessibilityLabel={t("chat.messageText")}
        >
          {msg.text}
        </Text>
      ) : null}

      {!msg.text && !msg.imageUrl ? (
        <Text
          style={{ color: isMe ? "#fff" : "#000", fontSize: 14, opacity: 0.7 }}
        >
          {t("chat.emptyMessage")}
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
          accessibilityLabel={t("chat.imageMessage")}
        />
      ) : null}
    </View>
  );
}
