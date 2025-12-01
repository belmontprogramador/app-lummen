// src/components/BlogCard.tsx

import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://botgrupo.lummen-app.com";

export default function BlogCard({ post, onPress }: any) {
  const { t } = useTranslation(); // ✅ i18n

  const cover = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${BASE_URL}${post.coverImage}`
    : null;

  const authorName =
    typeof post.author === "string"
      ? post.author
      : post.author?.name || t("blogCard.unknownAuthor"); // ✅ fallback traduzido

  const published =
    post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString()
      : t("blogCard.noDate"); // ✅ fallback traduzido

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 16,
      }}
      accessibilityLabel={t("blogCard.openPost")}
    >
      {cover && (
        <Image
          source={{ uri: cover }}
          style={{ width: "100%", height: 160 }}
          resizeMode="cover"
          accessibilityLabel={t("blogCard.coverImage")}
        />
      )}

      <View style={{ padding: 12 }}>
        <Text
          style={{ fontSize: 18, fontWeight: "700" }}
          accessibilityLabel={t("blogCard.title")}
        >
          {post.title}
        </Text>

        {post.subtitle && (
          <Text
            style={{ marginTop: 4, color: "#666" }}
            accessibilityLabel={t("blogCard.subtitle")}
          >
            {post.subtitle}
          </Text>
        )}

        <Text
          style={{ marginTop: 8, fontSize: 12, color: "#999" }}
          accessibilityLabel={t("blogCard.authorAndDate")}
        >
          {authorName} • {published}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
