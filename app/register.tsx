import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UsersAPI } from "@/service/users";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();

  const [name, setName] = useState("");      // 🟢 NOME AQUI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as any,
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
    if (!name || !email || !password || !photo) {
      setError(t("register.errorMissingFields"));
      return;
    }

    setError("");
    setLoading(true);

    try {
      await UsersAPI.create({
        name,      // 🟢 ENVIANDO NOME
        email,
        password,
        photo,
      });

      alert(t("register.success"));
      router.replace("/");
    } catch (err) {
      setError(t("register.errorCreate"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {t("register.title")}
      </Text>

      {/* 🟢 INPUT DO NOME */}
      <TextInput
        placeholder={t("register.name")}
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder={t("register.email")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder={t("register.password")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {t("register.pickPhoto")}
        </Text>
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
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {t("register.submit")}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
