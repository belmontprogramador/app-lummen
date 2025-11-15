import { View, Text, Image } from "react-native";

export function AereaShowHeader() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../../assets/images/logo2.png")}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />
      <Text style={{ marginTop: 4, fontSize: 16, fontWeight: "600" }}>
        Comunidade
      </Text>
    </View>
  );
}
