import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { router } from "expo-router";

export default function Login() {
  const { signIn, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setError("");
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30 }}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
      />

      {/* Textos extras */}
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={{ color: "#007BFF", marginBottom: 8 }}>
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={{ color: "#007BFF" }}>
            Registrar
          </Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

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
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
