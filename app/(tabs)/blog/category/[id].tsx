import { BlogAPI } from "@/service/blogFeed.service";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";

import BlogCard from "@/components/blog/BlogCard";

type BlogPost = {
  id: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  author?: {
    name: string;
  };
  publishedAt?: string;
};

export default function BlogCategoryPostsScreen() {
  const { id } = useLocalSearchParams(); // ✅ AQUI É ID, NÃO SLUG
  const categoryId = String(id);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  async function load() {
    try {
      console.log("📦 Categoria recebida:", categoryId);

      const res = await BlogAPI.listPostsByCategory(
        categoryId,
        1,
        20
      );

      console.log("📰 Posts recebidos:", res);

      setPosts(res || []);
    } catch (e) {
      console.log("❌ Erro ao carregar posts da categoria:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (categoryId && categoryId !== "undefined") {
      load();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BlogCard
            post={item}
            onPress={() =>
              router.push({
                pathname: "/blog/post/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
      />
    </View>
  );
}
