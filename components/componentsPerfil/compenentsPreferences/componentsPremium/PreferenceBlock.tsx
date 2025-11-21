// src/components/premiumPreferences/PreferenceBlock.tsx
import { View, Text } from "react-native";

export default function PreferenceBlock({ title, children }: any) {
  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {title}
      </Text>
      {children}
    </View>
  );
}
