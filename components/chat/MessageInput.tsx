import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function MessageInput({ onSend }: any) {
  const [text, setText] = useState("");

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
      allowsEditing: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      onSend("", img.uri);
    }
  }

  function send() {
    if (text.trim().length === 0) return;
    onSend(text, null);
    setText("");
  }

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
      }}
    >
      {/* Botão imagem */}
      <TouchableOpacity onPress={pickImage} style={{ marginRight: 10 }}>
        <Text style={{ fontSize: 24 }}>📷</Text>
      </TouchableOpacity>

      {/* Input */}
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

      {/* Enviar */}
      <TouchableOpacity onPress={send} style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 18, color: "#7b2cff", fontWeight: "bold" }}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
