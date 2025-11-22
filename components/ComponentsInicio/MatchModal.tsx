import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { router } from "expo-router";

export default function MatchModal({ visible, user1, user2, onClose }: any) {

  // 🔥 LOGS PARA DEBUGAR
  console.log("🟣 MODAL RENDER → visible:", visible);
  console.log("👤 user1:", user1);
  console.log("📷 user1.photo:", user1?.photo);
  console.log("🖼 user1.photos array:", user1?.photos);

  console.log("👤 user2:", user2);
  console.log("📷 user2.photo:", user2?.photo);
  console.log("🖼 user2.photos array:", user2?.photos);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.75)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        {/* 🔥 CÍRCULOS NEON */}
        <View
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: "rgba(255,0,255,0.25)",
            top: "12%",
            left: "10%",
            shadowColor: "#ff00ff",
            shadowOpacity: 0.9,
            shadowRadius: 60,
            elevation: 20,
          }}
        />

        <View
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: 175,
            backgroundColor: "rgba(0,255,255,0.25)",
            bottom: "10%",
            right: "10%",
            shadowColor: "#00eaff",
            shadowOpacity: 0.9,
            shadowRadius: 60,
            elevation: 20,
          }}
        />

        {/* CARD */}
        <View
          style={{
            width: "100%",
            maxWidth: 380,
            backgroundColor: "rgba(30,30,30,0.7)",
            padding: 25,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.15)",
            shadowColor: "#00eaff",
            shadowOpacity: 0.4,
            shadowRadius: 25,
            elevation: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 34,
              fontWeight: "bold",
              marginBottom: 20,
              textShadowColor: "#00eaff",
              textShadowRadius: 10,
            }}
          >
            It’s a Match!
          </Text>

          {/* FOTOS */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginBottom: 25,
            }}
          >
            <Image
              source={{ uri: `https://botgrupo.lummen-app.com${user1?.photo}` }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 60,
                borderWidth: 3,
                borderColor: "#ff00ff",
              }}
            />

            <Image
              source={{ uri: `https://botgrupo.lummen-app.com${user2?.photo}` }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 60,
                borderWidth: 3,
                borderColor: "#00eaff",
              }}
            />
          </View>

          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {user1?.name} ❤️ {user2?.name}
          </Text>

          <TouchableOpacity
            onPress={() => {
              onClose();
              router.push("/(tabs)/chat");
            }}
            style={{
              backgroundColor: "#ff3c78",
              paddingVertical: 14,
              paddingHorizontal: 50,
              borderRadius: 30,
              shadowColor: "#ff3c78",
              shadowOpacity: 0.6,
              shadowRadius: 15,
              elevation: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              Go to Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={{ marginTop: 18 }}>
            <Text style={{ color: "#ddd", fontSize: 16 }}>
              Continue browsing
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
