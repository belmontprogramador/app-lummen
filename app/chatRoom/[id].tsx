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

export default function ChatRoom() {
  const { id } = useLocalSearchParams();
  const scrollRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [matchUser, setMatchUser] = useState<any>(null);

  async function loadHistory() {
    try {
      const res = await MessagesAPI.getHistory(id as string);

      setMessages(res.messages || []);
      setMatchUser(res.user || null);

    } catch (e) {
      console.log("Erro ao carregar histórico:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();

    createSocket().then((s) => {
      setSocket(s);

      s.on("message:new", (msg: any) => {
        if (msg.fromId === id || msg.toId === id) {
          setMessages((p) => [...p, msg]);
          scrollRef.current?.scrollToEnd({ animated: true });
        }
      });
    });

    return () => {
      socket?.disconnect();
    };
  }, [id]);

  function handleSend(text: string, imageUrl: string | null) {
    if (!socket) return;

    socket.emit(
      "message:send",
      {
        toUserId: id,
        text,
        imageUrl,
      },
      (ack: any) => {
        if (ack.ok) {
          console.log("Mensagem enviada");
        } else {
          console.log("Erro:", ack.error);
        }
      }
    );
  }

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 300);
  }, [messages]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!matchUser) {
    return (
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          Você não tem permissão para conversar com esse usuário.
        </Text>
      </View>
    );
  }

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
