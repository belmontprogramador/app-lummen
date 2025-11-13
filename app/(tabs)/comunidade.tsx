import { View, Text, StyleSheet } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Comunidade() {
  useAuthGuard(); // protege a rota

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidade</Text>
      <Text style={styles.subtitle}>
        Aqui virá o feed da comunidade, posts e interações.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
