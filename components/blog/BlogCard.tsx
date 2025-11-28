import { View, Text, Image, TouchableOpacity } from "react-native";

const BASE_URL = "https://botgrupo.lummen-app.com";

export default function BlogCard({ post, onPress }: any) {
  const cover = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${BASE_URL}${post.coverImage}`
    : null;

  const authorName =
    typeof post.author === "string"
      ? post.author
      : post.author?.name || "Autor desconhecido";

  const published =
    post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString()
      : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      {cover && (
        <Image
          source={{ uri: cover }}
          style={{ width: "100%", height: 160 }}
          resizeMode="cover"
        />
      )}

      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          {post.title}
        </Text>

        {post.subtitle && (
          <Text style={{ marginTop: 4, color: "#666" }}>
            {post.subtitle}
          </Text>
        )}

        <Text style={{ marginTop: 8, fontSize: 12, color: "#999" }}>
          {authorName} • {published}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
