import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { UsersAPI } from "@/service/users";

export default function Inicio() {
  useAuthGuard();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await UsersAPI.list(1, 20);
      setUsers(res.data.items || []);
    } catch (e) {
      console.log("Erro ao carregar usuários:", e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhum usuário encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {users.map((u) => (
        <View
          key={u.id}
          style={{
            width: screenWidth,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
         <Image
  source={{ uri: `https://botgrupo.lummen-app.com${u.photo}` }}
  style={{
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#eee",
  }}
  resizeMode="cover"
  onError={(e) => {
    console.log("ERRO NA IMAGEM:", e.nativeEvent);
  }}
/>


          <Text style={{ fontSize: 20, fontWeight: "600" }}>{u.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
