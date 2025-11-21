// src/components/premiumPreferences/PreferenceChip.tsx
import { TouchableOpacity, Text } from "react-native";

export default function PreferenceChip({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        margin: 5,
        backgroundColor: active ? "#7b2cff" : "#dadada",
      }}
    >
      <Text style={{ color: active ? "white" : "black" }}>{label}</Text>
    </TouchableOpacity>
  );
}
