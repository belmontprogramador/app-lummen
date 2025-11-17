import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { passwordResetService } from "@/service/passwordResetService";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim()) {
      setError(t("forgot.emailInvalid"));
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await passwordResetService.forgotPassword(email);
      setMessage(t("forgot.emailSent"));

      // 🔥 Dá um pequeno delay para o usuário ver o feedback
      setTimeout(() => {
        router.replace("/");
      }, 1200);

    } catch (err: any) {
      setError(t("forgot.emailError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {t("forgot.title")}
      </Text>

      <TextInput
        placeholder={t("forgot.emailPlaceholder")}
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
            {t("forgot.submit")}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#007BFF", textAlign: "center" }}>
          {t("forgot.backToLogin")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
