import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://botgrupo.lummen-app.com";

export default function MessageInput({ onSend }: any) {
  const [text, setText] = useState("");

  async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (result.canceled) return;

  const asset = result.assets[0];

  const token = await AsyncStorage.getItem("@token");

  // 🔥 1) Baixar o arquivo como blob
  const response = await fetch(asset.uri);
  const blob = await response.blob();

  // 🔥 2) Criar formdata REAL
  const form = new FormData();
  form.append("file", blob, `chat_${Date.now()}.jpg`);

  try {
    const upload = await axios.post(
      "https://botgrupo.lummen-app.com/messages/upload",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": "Ofuturoeosucessoenosso",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("📸 Upload OK:", upload.data);

    // envia a mensagem com a URL da imagem
    onSend("", upload.data.url);

  } catch (err: any) {
    console.log("❌ Erro ao enviar imagem:", err.response?.data || err);
  }
}

  function send() {
    if (!text.trim()) return;
    onSend(text, null);
    setText("");
  }

  return (
    <View style={{
      flexDirection: "row",
      padding: 10,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "#ddd",
      alignItems: "center",
    }}>
      <TouchableOpacity onPress={pickImage} style={{ marginRight: 10 }}>
        <Text style={{ fontSize: 24 }}>📷</Text>
      </TouchableOpacity>

      <TextInput
        style={{
          flex: 1,
          backgroundColor: "#f2f2f2",
          padding: 12,
          borderRadius: 10,
          fontSize: 16,
        }}
        placeholder="Digite uma mensagem…"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity onPress={send} style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 18, color: "#7b2cff", fontWeight: "bold" }}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
