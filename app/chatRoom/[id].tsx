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

  console.log("🔵 ChatRoom render — id da rota:", id);

  // 1️⃣ Carrega histórico da conversa
  async function loadHistory() {
    console.log("📚 [loadHistory] Iniciando carregamento para id:", id);

    try {
      const res = await MessagesAPI.getHistory(id as string);

      console.log(
        "📚 [loadHistory] Resposta da API /messages/:id ->",
        JSON.stringify(res, null, 2)
      );

      setMessages(res.messages || []);
      setMatchUser(res.user || null);

      console.log(
        "📚 [loadHistory] messages.length:",
        res.messages?.length || 0,
        " | matchUser:",
        res.user
      );
    } catch (e) {
      console.log("❌ [loadHistory] Erro ao carregar histórico:", e);
    } finally {
      setLoading(false);
      console.log("📚 [loadHistory] Finalizado, loading = false");
    }
  }

  // 2️⃣ Conecta WebSocket + listeners
  useEffect(() => {
    console.log("🟡 useEffect MOUNT/ID change — id:", id);

    let active = true;
    let ws: any = null;

    setLoading(true);
    loadHistory();

    createSocket()
      .then((s) => {
        if (!active) {
          console.log(
            "⚠️ [WS] Socket criado após unmount, desconectando imediatamente."
          );
          s.disconnect();
          return;
        }

        ws = s;
        setSocket(s);

        console.log(
          "🟢 [WS] Socket criado. connected?:",
          s.connected,
          " | id:",
          s.id
        );

        s.on("connect", () => {
          console.log("🟢 [WS] EVENT connect — id:", s.id);
        });

        s.on("disconnect", (reason: any) => {
          console.log("🔴 [WS] EVENT disconnect — reason:", reason);
        });

        // 🔥 Receber mensagem em tempo real
        s.on("message:new", (payload: any) => {
          console.log(
            "📩 [WS] EVENT message:new — payload bruto:",
            JSON.stringify(payload, null, 2)
          );

          // backend envia: { conversationId, message }
          const msg = payload?.message || payload;

          if (!msg) {
            console.log("⚠️ [WS] payload.message vazio, ignorando.");
            return;
          }

          console.log(
            "📩 [WS] Mensagem extraída:",
            JSON.stringify(msg, null, 2)
          );

          // só adiciona se envolver o usuário da rota
          if (msg.fromId === id || msg.toId === id) {
            console.log(
              "✅ [WS] Mensagem pertence a esta conversa, adicionando ao state."
            );
            setMessages((prev) => [...prev, msg]);

            setTimeout(() => {
              scrollRef.current?.scrollToEnd({ animated: true });
            }, 100);
          } else {
            console.log(
              "⏭ [WS] Mensagem NÃO é dessa conversa. fromId:",
              msg.fromId,
              "toId:",
              msg.toId,
              "id da rota:",
              id
            );
          }
        });
      })
      .catch((err) => {
        console.log("❌ [WS] Erro ao criar socket:", err);
      });

    return () => {
      console.log("🧹 [useEffect cleanup] ChatRoom unmount/ID change — id:", id);
      active = false;

      if (ws) {
        console.log("🔌 [WS] Desconectando socket no cleanup.");
        ws.disconnect();
      } else {
        console.log("⚠️ [WS] ws ainda null no cleanup, nada para desconectar.");
      }
    };
  }, [id]);

  // 3️⃣ Enviar mensagens
 function handleSend(text: string, imageUrl: string | null) {
  console.log("✉️ [handleSend] Chamado com:", { text, imageUrl, id });

  if (!socket) {
    console.log("⚠️ [handleSend] socket ainda null, não é possível enviar.");
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
      console.log("📨 [handleSend] ACK recebido do servidor:", ack);

      if (!ack?.ok) {
        console.log("❌ [handleSend] Erro no ACK:", ack?.error);
      }

      // ❗ NÃO adiciona mensagem aqui
      // O WebSocket enviará message:new automaticamente
    }
  );
}


  // 4️⃣ Scroll automático quando o array de mensagens muda
  useEffect(() => {
    console.log(
      "🔁 [useEffect messages] messages.length:",
      messages.length
    );

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 300);
  }, [messages]);

  if (loading) {
    console.log("⏳ [render] Tela em estado de loading...");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!matchUser) {
    console.log(
      "🚫 [render] matchUser null — sem permissão para conversar ou erro no backend."
    );
    return (
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          Você não tem permissão para conversar com esse usuário.
        </Text>
      </View>
    );
  }

  console.log(
    "🧩 [render] Renderizando mensagens. messages.length:",
    messages.length,
    "| matchUser.id:",
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
