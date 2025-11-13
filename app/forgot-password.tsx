import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { UsersAPI } from "@/service/users";
import { router } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim()) {
      setError("Informe um email válido");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await UsersAPI.forgotPassword(email);
      setMessage("Enviamos um link de recuperação para seu email.");
      router.replace("/");
    } catch (err: any) {
      setError("Não foi possível enviar o email. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Recuperar senha
      </Text>

      <TextInput
        placeholder="Digite seu email"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
      />

      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}
      {message ? <Text style={{ color: "green", marginBottom: 10 }}>{message}</Text> : null}

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#000",
          padding: 12,
          borderRadius: 6,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Enviar link de recuperação
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#007BFF", textAlign: "center" }}>
          Voltar ao login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
