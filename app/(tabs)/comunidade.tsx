// src/app/(tabs)/blog-categories.tsx

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
import { useTranslation } from "react-i18next";

type BlogCategory = {
  id: string;
  name: string;
};

export default function BlogCategoriesScreen() {
  const { t } = useTranslation(); // ✅ i18n
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setErrorKey(null);

      const res = await BlogAPI.listCategories();
      setCategories(res || []);
    } catch (e) {
      console.log(t("blogCategories.errors.load"), e);
      setErrorKey("blogCategories.errors.load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // ✅ Loading internacionalizado
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>
          {t("blogCategories.loading")}
        </Text>
      </View>
    );
  }

  // ✅ Erro internacionalizado
  if (errorKey) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {t(errorKey)}
        </Text>
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
          {t("blogCategories.tapToView")}
        </Text>
      </TouchableOpacity>
    );
  };

  // ✅ Estado vazio internacionalizado
  if (!categories.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{t("blogCategories.empty")}</Text>
      </View>
    );
  }

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
