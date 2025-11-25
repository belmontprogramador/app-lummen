import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SOCKET_URL = "https://botgrupo.lummen-app.com";  

export async function createMessagesSocket(): Promise<Socket> {
  const token = await AsyncStorage.getItem("@token");

  const socket = io(SOCKET_URL, {
    transports: ["websocket"], // 🔥 evita fallback para polling
    auth: {
      token: token,
      apiKey: "Ofuturoeosucessoenosso",
    },
  });

  return socket;
}
