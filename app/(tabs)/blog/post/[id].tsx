import { BlogAPI } from "@/service/blogFeed.service";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

type BlogPost = {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  coverImage?: string;
  bannerImage?: string;
  publishedAt?: string;
  author?: {
    id: string;
    name: string;
    photo?: string | null;
  };
};

const BASE_URL = "https://botgrupo.lummen-app.com";

export default function BlogPostDetailScreen() {
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);

  async function load() {
    try {
      const res = await BlogAPI.getPostById(String(id));
      setPost(res);
    } catch (e) {
      console.log("❌ Erro ao carregar post:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Post não encontrado</Text>
      </View>
    );
  }

  const cover =
    post.coverImage?.startsWith("http")
      ? post.coverImage
      : post.coverImage
      ? `${BASE_URL}${post.coverImage}`
      : null;

  const banner =
    post.bannerImage?.startsWith("http")
      ? post.bannerImage
      : post.bannerImage
      ? `${BASE_URL}${post.bannerImage}`
      : null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* ✅ COVER NO TOPO */}
      {cover && (
        <Image
          source={{ uri: cover }}
          style={{ width: "100%", height: 200 }}
          resizeMode="cover"
        />
      )}

      <View style={{ padding: 16 }}>
        {/* ✅ AUTOR COM FOTO REDONDA */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
        >
          {post.author?.photo ? (
            <Image
              source={{
                uri: post.author.photo.startsWith("http")
                  ? post.author.photo
                  : `${BASE_URL}${post.author.photo}`,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
                backgroundColor: "#eee",
              }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
                backgroundColor: "#ccc",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "700", color: "#555", fontSize: 16 }}>
                {post.author?.name?.charAt(0) || "A"}
              </Text>
            </View>
          )}

          <View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#333" }}>
              {post.author?.name || "Autor"}
            </Text>

            <Text style={{ fontSize: 11, color: "#999" }}>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : ""}
            </Text>
          </View>
        </View>

        {/* ✅ TÍTULO */}
        <Text style={{ fontSize: 22, fontWeight: "800" }}>
          {post.title}
        </Text>

        {/* ✅ SUBTÍTULO */}
        {post.subtitle && (
          <Text style={{ marginTop: 6, fontSize: 14, color: "#666" }}>
            {post.subtitle}
          </Text>
        )}

        {/* ✅ CONTEÚDO */}
        <Text
          style={{
            marginTop: 18,
            fontSize: 15,
            lineHeight: 22,
            color: "#333",
          }}
        >
          {post.content}
        </Text>

        {/* ✅ BANNER AGORA NO FINAL */}
        {banner && (
          <Image
            source={{ uri: banner }}
            style={{
              width: "100%",
              height: 260,
              marginTop: 24,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        )}
      </View>
    </ScrollView>
  );
}
