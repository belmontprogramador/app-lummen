// src/components/FeedFreeComponent.tsx

import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function FeedFreeComponent({ user }: any) {
  const { t } = useTranslation();
  const profile = user.profile || {};

  const freeKeys = [
    "bio",
    "birthday",
    "gender",
    "orientation",
    "city",
    "state",
    "country",
    "pronoun",
    "intention",
    "relationshipType",
    "languages",
  ];

  const labels: any = {
    bio: t("feedFree.bio"),
    birthday: t("feedFree.birthday"),
    gender: t("feedFree.gender"),
    orientation: t("feedFree.orientation"),
    city: t("feedFree.city"),
    state: t("feedFree.state"),
    country: t("feedFree.country"),
    pronoun: t("feedFree.pronoun"),
    intention: t("feedFree.intention"),
    relationshipType: t("feedFree.relationshipType"),
    languages: t("feedFree.languages"),
  };

  const getAge = (date: string) => {
    if (!date) return null;
    const d = new Date(date);
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();

    if (
      now.getMonth() < d.getMonth() ||
      (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())
    ) {
      age--;
    }

    return age;
  };

  const normalizeValue = (key: string, value: any) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return "—";
    }

    if (key === "birthday") {
      return `${getAge(value)} ${t("feedFree.years")}`;
    }

    if (Array.isArray(value)) return value.join(", ");

    return value.toString();
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {t("feedFree.about")}
      </Text>

      {freeKeys.map((key) => (
        <Text key={key} style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "bold" }}>
            {labels[key] || key}:{" "}
          </Text>
          {normalizeValue(key, profile[key])}
        </Text>
      ))}
    </View>
  );
}
