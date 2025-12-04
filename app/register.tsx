import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UsersAPI } from "@/service/users";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import RegisterLocationPicker from "@/components/register/RegisterLocationPicker";

export default function Register() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLocationChange(field: string, value: any) {
    setLocation((prev) => ({ ...prev, [field]: value }));
  }

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

  function normalizeBirthday(date: string) {
    if (!date) return undefined;

    // Valida formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(date)) {
      setError("Formato de data inválido. Use YYYY-MM-DD.");
      return null;
    }

    try {
      return new Date(date + "T00:00:00.000Z").toISOString();
    } catch {
      setError("Data inválida.");
      return null;
    }
  }

  async function handleRegister() {
    console.log("📌 LOCATION:", location);
    console.log("📌 BIRTHDAY:", birthday);

    if (!name || !email || !password || !photo) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!location.city || !location.state || !location.country) {
      setError("Selecione sua cidade antes de continuar.");
      return;
    }

    // 🔥 Converte birthday antes de enviar
    const isoBirthday = normalizeBirthday(birthday);
    if (isoBirthday === null) return; // erro exibido acima

    setError("");
    setLoading(true);

    try {
      await UsersAPI.create({
        name,
        email,
        password,
        photo,
        birthday: isoBirthday, // agora sempre ISO ou undefined
        city: location.city,
        state: location.state,
        country: location.country,
      });

      alert(t("register.success"));
      router.replace("/");
    } catch (err: any) {
      console.log("❌ ERRO AO REGISTRAR:", err?.response?.data || err);
      setError("Erro ao criar conta. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {t("register.title")}
      </Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      {/* LOCALIZAÇÃO */}
      <RegisterLocationPicker form={location} onChange={handleLocationChange} />

      {/* DATA DE NASCIMENTO */}
      <TextInput
        placeholder="Data de nascimento (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      {/* FOTO */}
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
          Selecionar Foto
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

      {/* ERRO */}
      {error ? (
        <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
      ) : null}

      {/* BOTÃO */}
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
            Criar Conta
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
