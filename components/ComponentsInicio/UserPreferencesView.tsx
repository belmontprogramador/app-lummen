// src/components/ComponentsInicio/UserPreferencesView.tsx

import { View, Text } from "react-native";

export default function UserPreferencesView({ preference }: any) {
  const pref = preference || {};

  // campos que não devem aparecer
  const hiddenPrefKeys = ["userId", "createdAt", "updatedAt"];

  const preferenceKeys = Object.keys(pref).filter(
    (key) => !hiddenPrefKeys.includes(key)
  );

  const normalizeValue = (value: any) => {
    if (!value) return "—";

    // arrays
    if (Array.isArray(value)) {
      if (value.length === 0) return "—";
      return value
        .map((v) => (typeof v === "object" && v.label ? v.label : v))
        .join(", ");
    }

    // enums { label }
    if (typeof value === "object" && value?.label) {
      return value.label;
    }

    return value.toString();
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Preferências
      </Text>

      {preferenceKeys.map((key) => (
        <Text key={key} style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "bold" }}>{key}: </Text>
          {normalizeValue(pref[key])}
        </Text>
      ))}
    </View>
  );
}
