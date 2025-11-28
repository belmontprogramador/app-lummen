import { BlogAPI } from "@/service/blogFeed.service";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type BlogCategory = {
  id: string;
  name: string;
};

export default function BlogCategoriesScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<BlogCategory[]>([]);

  async function load() {
    try {
      const res = await BlogAPI.listCategories();
      setCategories(res || []);
    } catch (e) {
      console.log("Erro ao carregar categorias:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem: ListRenderItem<BlogCategory> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/blog/category/[id]",
            params: { id: item.id },
          })
        }
        style={{
          backgroundColor: "#fff",
          borderRadius: 14,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          {item.name}
        </Text>

        <Text style={{ marginTop: 6, fontSize: 13, color: "#888" }}>
          Toque para ver os posts
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
