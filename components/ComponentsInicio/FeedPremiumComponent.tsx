// src/components/ComponentsInicio/FeedPremiumComponent.tsx

import { View, Text } from "react-native";

export default function FeedPremiumComponent({ user }: any) {
  const profile = user.profile || {};
  const preference = user.preference || {};

  const hiddenPrefKeys = ["userId", "updatedAt"];

  const profileKeys = Object.keys(profile);
  const preferenceKeys = Object.keys(preference).filter(
    (k) => !hiddenPrefKeys.includes(k)
  );

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
    if (!value) return "—";

    // idade
    if (key === "birthday") {
      return `${getAge(value)} anos`;
    }

    // arrays
    if (Array.isArray(value)) {
      return value
        .map((v) => (typeof v === "object" && v.label ? v.label : v))
        .join(", ");
    }

    // objeto { label }
    if (typeof value === "object" && value.label) {
      return value.label;
    }

    return value.toString();
  };

  return (
    <View style={{ marginTop: 25 }}>
      {/* PROFILE */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Sobre
      </Text>

      {profileKeys.map((key) => (
        <Text key={key} style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "bold" }}>{key}: </Text>
          {normalizeValue(key, profile[key])}
        </Text>
      ))}

      {/* PREFERENCES */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 10 }}>
        Preferências
      </Text>

      {preferenceKeys.map((key) => (
        <Text key={key} style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "bold" }}>{key}: </Text>
          {normalizeValue(key, preference[key])}
        </Text>
      ))}
    </View>
  );
}
