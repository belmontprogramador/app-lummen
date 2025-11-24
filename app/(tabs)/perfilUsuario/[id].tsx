import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { 
  View, 
  Text,      // 👈 IMPORTADO AQUI
  ActivityIndicator, 
  ScrollView, 
  Dimensions 
} from "react-native";

import { FeedAPI } from "@/service/feed";
import FullUserView from "@/components/ComponentsInicio/FullUserView";
import { AuthContext } from "@/context/AuthContext";

export default function PerfilUsuario() {
  const { id } = useLocalSearchParams();
  const { user: authUser } = useContext(AuthContext);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  async function loadUser() {
    try {
      const isPremiumRoute =
        authUser?.plan?.allowedRoutes?.includes("feed_view_premium");

      const res = await FeedAPI.getOne(id as string, isPremiumRoute);
      setUser(res.data);
    } catch (err) {
      console.log("Erro ao carregar usuário:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Usuário não encontrado</Text>
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
      <FullUserView
        user={user}
        onLike={() => {}}
        onDislike={() => {}}
        onSkip={() => {}}
        onSuperLike={() => {}}
        readOnly
      />
    </ScrollView>
  );
}
