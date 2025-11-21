// src/components/userProfile/BlockLocation.tsx
import { View, Text } from "react-native";

export default function BlockLocation({ form = {}, onChange = () => {} }: any) {
  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Location
      </Text>

      <Text>Latitude: {form.latitude || "Not set"}</Text>
      <Text>Longitude: {form.longitude || "Not set"}</Text>
    </View>
  );
}
