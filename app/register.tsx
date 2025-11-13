import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UsersAPI } from "@/service/users";
import { router } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as any, // funciona no Web
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setPhoto({
        uri: asset.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
    }
  }

  async function handleRegister() {
    if (!email || !password || !photo) {
      setError("Preencha todos os campos e escolha uma foto.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await UsersAPI.create({
        email,
        password,
        photo,
      });

      alert("Conta criada com sucesso!");
      router.replace("/");
    } catch (err) {
      setError("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Criar conta
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: "#007BFF",
          padding: 12,
          borderRadius: 6,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Escolher Foto</Text>
      </TouchableOpacity>

      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            alignSelf: "center",
            marginBottom: 10,
          }}
        />
      )}

      {error ? <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text> : null}

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#000",
          padding: 12,
          borderRadius: 6,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Registrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
