import { View, Text } from "react-native";

export default function PreferencesDetails({ preference }: any) {
  if (!preference) return null;

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Preferências
      </Text>

      {Object.keys(preference).map((key) => {
        if (
          key === "userId" ||
          key === "updatedAt" ||
          preference[key] === null ||
          preference[key] === ""
        ) return null;

        return (
          <Text key={key} style={{ marginBottom: 6 }}>
            <Text style={{ fontWeight: "bold" }}>{key}: </Text>
            {preference[key]}
          </Text>
        );
      })}
    </View>
  );
}
