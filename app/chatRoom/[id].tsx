// src/app/(chat)/chatRoom.tsx

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MessagesAPI } from "@/service/messages";
import { createMessagesSocket as createSocket } from "@/service/message";
import MessageBubble from "@/components/chat/MessageBubble";
import MessageInput from "@/components/chat/MessageInput";
import { useTranslation } from "react-i18next";

export default function ChatRoom() {
  const { t } = useTranslation(); // ✅ i18n
  const { id } = useLocalSearchParams();
  const scrollRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [matchUser, setMatchUser] = useState<any>(null);

  console.log(t("chatRoom.logs.render"), id);

  // 1️⃣ Carrega histórico da conversa
  async function loadHistory() {
    console.log(t("chatRoom.logs.loadStart"), id);

    try {
      const res = await MessagesAPI.getHistory(id as string);

      console.log(
        t("chatRoom.logs.apiResponse"),
        JSON.stringify(res, null, 2)
      );

      setMessages(res.messages || []);
      setMatchUser(res.user || null);

      console.log(
        t("chatRoom.logs.stateInfo"),
        res.messages?.length || 0,
        res.user
      );
    } catch (e) {
      console.log(t("chatRoom.logs.loadError"), e);
    } finally {
      setLoading(false);
      console.log(t("chatRoom.logs.loadFinish"));
    }
  }

  // 2️⃣ Conecta WebSocket + listeners
  useEffect(() => {
    console.log(t("chatRoom.logs.useEffectMount"), id);

    let active = true;
    let ws: any = null;

    setLoading(true);
    loadHistory();

    createSocket()
      .then((s) => {
        if (!active) {
          console.log(t("chatRoom.logs.socketLate"));
          s.disconnect();
          return;
        }

        ws = s;
        setSocket(s);

        console.log(
          t("chatRoom.logs.socketCreated"),
          s.connected,
          s.id
        );

        s.on("connect", () => {
          console.log(t("chatRoom.logs.socketConnect"), s.id);
        });

        s.on("disconnect", (reason: any) => {
          console.log(t("chatRoom.logs.socketDisconnect"), reason);
        });

        // 🔥 Receber mensagem em tempo real
        s.on("message:new", (payload: any) => {
          console.log(
            t("chatRoom.logs.messageRaw"),
            JSON.stringify(payload, null, 2)
          );

          const msg = payload?.message || payload;

          if (!msg) {
            console.log(t("chatRoom.logs.emptyPayload"));
            return;
          }

          console.log(
            t("chatRoom.logs.messageExtracted"),
            JSON.stringify(msg, null, 2)
          );

          if (msg.fromId === id || msg.toId === id) {
            console.log(t("chatRoom.logs.messageAccepted"));
            setMessages((prev) => [...prev, msg]);

            setTimeout(() => {
              scrollRef.current?.scrollToEnd({ animated: true });
            }, 100);
          } else {
            console.log(
              t("chatRoom.logs.messageIgnored"),
              msg.fromId,
              msg.toId,
              id
            );
          }
        });
      })
      .catch((err) => {
        console.log(t("chatRoom.logs.socketError"), err);
      });

    return () => {
      console.log(t("chatRoom.logs.cleanup"), id);
      active = false;

      if (ws) {
        console.log(t("chatRoom.logs.socketCleanup"));
        ws.disconnect();
      } else {
        console.log(t("chatRoom.logs.socketNullCleanup"));
      }
    };
  }, [id]);

  // 3️⃣ Enviar mensagens
  function handleSend(text: string, imageUrl: string | null) {
    console.log(t("chatRoom.logs.sendCalled"), { text, imageUrl, id });

    if (!socket) {
      console.log(t("chatRoom.logs.socketNullSend"));
      return;
    }

    socket.emit(
      "message:send",
      {
        toUserId: id,
        text,
        imageUrl,
      },
      (ack: any) => {
        console.log(t("chatRoom.logs.ackReceived"), ack);

        if (!ack?.ok) {
          console.log(t("chatRoom.logs.ackError"), ack?.error);
        }
      }
    );
  }

  // 4️⃣ Scroll automático quando mensagens mudam
  useEffect(() => {
    console.log(
      t("chatRoom.logs.messagesUpdated"),
      messages.length
    );

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 300);
  }, [messages]);

  // ✅ Loading internacionalizado
  if (loading) {
    console.log(t("chatRoom.logs.loadingRender"));

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>{t("chatRoom.loading")}</Text>
      </View>
    );
  }

  // ✅ Falta de permissão internacionalizada
  if (!matchUser) {
    console.log(t("chatRoom.logs.noPermission"));

    return (
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          {t("chatRoom.noPermission")}
        </Text>
      </View>
    );
  }

  console.log(
    t("chatRoom.logs.renderMessages"),
    messages.length,
    matchUser.id
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} userId={matchUser.id} />
        ))}
      </ScrollView>

      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
