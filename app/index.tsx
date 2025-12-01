// app/(auth)/login.tsx
import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const { signIn, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setErrorKey(null);
      await signIn(email, password);
    } catch (err: any) {
      // Se vier um código de erro do backend, você mapeia:
      // ex: err.code = "INVALID_CREDENTIALS"
      if (err.code === "INVALID_CREDENTIALS") {
        setErrorKey("login.errorInvalid");
      } else {
        setErrorKey("common.unexpectedError");
      }
    }
  }

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30 }}>
        {t("login.title")}
      </Text>

      <TextInput
        placeholder={t("login.email")}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder={t("login.password")}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={{ color: "#007BFF", marginBottom: 8 }}>
            {t("login.forgotPassword")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={{ color: "#007BFF" }}>
            {t("login.register")}
          </Text>
        </TouchableOpacity>
      </View>

      {errorKey && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {t(errorKey)}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "black",
          padding: 12,
          borderRadius: 6,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {loading ? t("login.loading") : t("login.submit")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
